// Zero-dependency static file server for Railway.
// Serves the Neurotech tracker. Binds to 0.0.0.0:$PORT.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

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

const server = http.createServer((req, res) => {
  // Strip query string, normalize, prevent path traversal.
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const safePath = path.normalize(path.join(ROOT, urlPath));
  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(safePath, (err, data) => {
    if (err) {
      // SPA-style fallback to index.html for unknown routes.
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
    // The service worker must never be served stale, or updates won't land.
    if (path.basename(safePath) === "sw.js")
      headers["Cache-Control"] = "no-cache";
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Neurotech tracker running on http://0.0.0.0:${PORT}`);
});
