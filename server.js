// Neurotech server — static hosting + a real sync API, zero dependencies.
//
// Progress is shared across devices/people via "boards". Each board holds a
// progress map and a notes map, plus per-key timestamps so concurrent edits
// merge with last-write-wins (handles checks, unchecks, and note edits).
//
// Persistence: a JSON file on disk. On Railway, mount a Volume and the data
// lives under RAILWAY_VOLUME_MOUNT_PATH so it survives redeploys.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR =
  process.env.DATA_DIR ||
  process.env.RAILWAY_VOLUME_MOUNT_PATH ||
  path.join(ROOT, ".data");
fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_FILE = path.join(DATA_DIR, "boards.json");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

// ---------- store ----------
let boards = {};
try {
  boards = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
} catch {
  boards = {};
}

let writeTimer = null,
  dirty = false;
function persist() {
  dirty = true;
  if (writeTimer) return;
  writeTimer = setTimeout(flush, 400);
}
function flush() {
  writeTimer = null;
  if (!dirty) return;
  dirty = false;
  const tmp = DB_FILE + ".tmp";
  try {
    fs.writeFileSync(tmp, JSON.stringify(boards));
    fs.renameSync(tmp, DB_FILE);
  } catch (e) {
    console.error("persist failed:", e.message);
  }
}
process.on("SIGTERM", () => {
  flush();
  process.exit(0);
});
process.on("SIGINT", () => {
  flush();
  process.exit(0);
});

const VALID_BOARD = /^[A-Za-z0-9_-]{1,64}$/;
const now = () => Date.now();
function getBoard(id) {
  if (!boards[id])
    boards[id] = {
      progress: {},
      notes: {},
      ts: { progress: {}, notes: {} },
      updatedAt: 0,
    };
  const b = boards[id];
  b.ts = b.ts || { progress: {}, notes: {} };
  b.ts.progress = b.ts.progress || {};
  b.ts.notes = b.ts.notes || {};
  return b;
}
// Apply one change with last-write-wins. Returns true if it took effect.
function applyPatch(b, kind, key, value, t) {
  t = Number(t) || now();
  const tsMap = kind === "note" ? b.ts.notes : b.ts.progress;
  if (tsMap[key] != null && tsMap[key] > t) return false; // stale
  tsMap[key] = t;
  if (kind === "note") {
    if (value) b.notes[key] = String(value);
    else delete b.notes[key];
  } else {
    if (value) b.progress[key] = true;
    else delete b.progress[key];
  }
  b.updatedAt = now();
  return true;
}

// ---------- http helpers ----------
function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}
function readBody(req, cb) {
  let data = "",
    tooBig = false;
  req.on("data", (c) => {
    data += c;
    if (data.length > 1_000_000) {
      tooBig = true;
      req.destroy();
    }
  });
  req.on("end", () => {
    if (tooBig) return cb(new Error("body too large"));
    try {
      cb(null, data ? JSON.parse(data) : {});
    } catch (e) {
      cb(e);
    }
  });
}

// ---------- api ----------
function handleApi(req, res, parts) {
  if (req.method === "OPTIONS") return sendJSON(res, 204, {});

  if (parts[1] === "health" && req.method === "GET") {
    return sendJSON(res, 200, {
      ok: true,
      boards: Object.keys(boards).length,
      dataDir: DATA_DIR,
    });
  }

  // /api/board/:id  and  /api/board/:id/import
  if (parts[1] === "board" && parts[2]) {
    const id = parts[2];
    if (!VALID_BOARD.test(id))
      return sendJSON(res, 400, { error: "invalid board id" });

    if (req.method === "GET" && !parts[3]) {
      const b = getBoard(id);
      return sendJSON(res, 200, {
        progress: b.progress,
        notes: b.notes,
        ts: b.ts,
        updatedAt: b.updatedAt,
      });
    }
    if (req.method === "PATCH" && !parts[3]) {
      return readBody(req, (err, body) => {
        if (err) return sendJSON(res, 400, { error: "bad body" });
        const { kind, key, value, t } = body || {};
        if (
          (kind !== "progress" && kind !== "note") ||
          typeof key !== "string" ||
          !key
        ) {
          return sendJSON(res, 400, { error: "kind+key required" });
        }
        const b = getBoard(id);
        const applied = applyPatch(b, kind, key, value, t);
        persist();
        sendJSON(res, 200, { ok: true, applied, updatedAt: b.updatedAt });
      });
    }
    if (req.method === "PUT" && parts[3] === "import") {
      return readBody(req, (err, body) => {
        if (err) return sendJSON(res, 400, { error: "bad body" });
        const b = getBoard(id);
        const t = now();
        Object.keys(body.progress || {}).forEach((k) => {
          if (body.progress[k]) applyPatch(b, "progress", k, true, t);
        });
        Object.keys(body.notes || {}).forEach((k) =>
          applyPatch(b, "note", k, body.notes[k], t),
        );
        persist();
        sendJSON(res, 200, {
          progress: b.progress,
          notes: b.notes,
          ts: b.ts,
          updatedAt: b.updatedAt,
        });
      });
    }
  }
  return sendJSON(res, 404, { error: "not found" });
}

// ---------- static ----------
function serveStatic(req, res, urlPath) {
  if (urlPath === "/") urlPath = "/index.html";
  const safePath = path.normalize(path.join(ROOT, urlPath));
  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(safePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(ROOT, "index.html"), (e2, html) => {
        if (e2) {
          res.writeHead(404);
          return res.end("Not found");
        }
        res.writeHead(200, { "Content-Type": TYPES[".html"] });
        res.end(html);
      });
      return;
    }
    const ext = path.extname(safePath).toLowerCase();
    const headers = {
      "Content-Type": TYPES[ext] || "application/octet-stream",
    };
    if (path.basename(safePath) === "sw.js")
      headers["Cache-Control"] = "no-cache";
    res.writeHead(200, headers);
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/api" || urlPath.startsWith("/api/")) {
    const parts = urlPath.split("/").filter(Boolean); // ["api","board","id",...]
    return handleApi(req, res, parts);
  }
  if (req.method !== "GET") {
    res.writeHead(405);
    return res.end("Method not allowed");
  }
  serveStatic(req, res, urlPath);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Neurotech running on http://0.0.0.0:${PORT}  (data: ${DATA_DIR})`,
  );
});
