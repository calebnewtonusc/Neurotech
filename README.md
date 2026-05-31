# Neurotech

A clean, Apple-styled execution tracker for the **Summer 2026 Neuralink Portfolio** built by **Caleb Newton** and **Mark Lin**.

It turns the 13-week, Monday-to-Friday plan into something you can actually run day to day: live "current week" detection, per-day tasks with checkable progress, hard decision dates, kill-switch flags, deliverables, and the non-negotiable honesty rules — all in one page.

## What is in here

- **Dashboard** — overall progress ring, current focus week, next hard decision, the one-sentence thesis, and both project scopes (what each proves vs what it must never claim).
- **13-week calendar** — every week expands into Monday-Friday tasks tagged by owner (Caleb / Mark / Together) and type (Learn / Build / Write / Decide / Ship / Teach), each day with its "proof by end of day."
- **Decision dates** — the non-negotiable gates, with kill-switches called out.
- **Deliverables** — the final checklist across Project 1, Project 2, and the portfolio.
- **Honesty rules** — the modality and claim discipline that keeps the work defensible.

Progress is saved locally in your browser (`localStorage`), so each person tracks their own copy on their own device. Use the filter to view only your tasks.

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
