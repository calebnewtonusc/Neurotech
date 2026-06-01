# Neurotech

A clean, Apple-styled execution tracker for Caleb Newton's **Summer 2026 research**. Two tracks live in one app; switch between them with the segmented control in the header. Progress for each track is saved independently in your browser (`localStorage`), so each track keeps its own state on your device.

## The two tracks

### Neuralink — Neuroengineering (Caleb + Mark)

The 13-week, Monday-to-Friday Neuralink portfolio plan: live "current week" detection, per-day tasks tagged by owner (Caleb / Mark / Together) and type (Learn / Build / Write / Decide / Ship / Teach), each day with its "proof by end of day," hard decision dates with kill-switch flags, the final deliverables checklist, and the non-negotiable honesty rules. Filter the calendar to view only your tasks.

### Zoral — Continual Learning & Neural Memory (Caleb solo)

The 12-week route to contributing to Aryaa Saravanakumar's Zoral vision: continual learning, neural memory architectures, mechanistic interpretability, and safe-agent evaluation. Organized as six two-week blocks (Learn / Build / Read / Output), plus a reference library:

- **The knowledge stack** — seven tiers from math foundations to autonomous-agent perception, each ending in a concrete deliverable.
- **Neural memory architectures** — the ordered reading list (Hopfield, fast weights, Gated DeltaNet, Test-Time Training, Titans, delta-mem, HeLa-Mem, Engram).
- **Biology to ML translation** — turning biological principles into falsifiable mechanisms.
- **The standard to aim for** — the questions that separate admiring the vision from being able to build it.
- **What not to learn first** — the supporting context to deprioritize.

## What is in here

- **Dashboard** — overall progress ring, current focus week/block, a track-specific second card (next decision for Neuralink, the contribution lane for Zoral), the thesis, and every project scope (what it proves vs its honest limits).
- **Calendar** — day-based weeks for Neuralink, group-based blocks for Zoral, all with checkable progress and per-week completion bars.
- **Resources** — the track-specific reference sections described above.

## Design

The interface follows the Apple design language: SF Pro typography, a single Action Blue (`#0066cc`) accent, alternating parchment / white / near-black full-bleed tiles, pill CTAs, and no decorative chrome. The owner color coding stays monochrome-plus-blue (Caleb = Action Blue, Mark = ink, Together = muted gray) so the single-accent rule holds.

## Run locally

```bash
npm start
# then open http://localhost:3000
```

No build step and no dependencies — it is a static page served by a tiny zero-dependency Node server (`server.js`).

## Deploy to Railway

This repo is Railway-ready out of the box.

1. Push to GitHub.
2. In Railway, **New Project → Deploy from GitHub repo** and pick this repo.
3. Railway auto-detects Node via Nixpacks, runs `npm start`, and binds to its injected `PORT`.
4. Open the generated domain. Done.

`railway.json` pins the builder and start command; `server.js` reads `process.env.PORT` and listens on `0.0.0.0`.

## Files

- `index.html` — the full tracker UI.
- `data.js` — the entire plan as structured data (edit here to update tasks, dates, or deliverables).
- `server.js` — zero-dependency static server for Railway.
- `DESIGN.md` — the Apple design reference the UI is built against.

All glory to God! ✝️❤️
