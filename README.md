# Neurotech

A clean, Apple-styled execution tracker for **Caleb Newton & Mark Lin's Summer 2026 research**: one unified plan spanning neuroengineering and brain-inspired continual learning. The two bodies of work overlap heavily (transformers, neural decoding, mechanistic interpretability, neuroscience), so they live as a single track rather than separate programs. Progress is saved in your browser (`localStorage`).

## The plan

The **13-week, Monday-to-Friday calendar** is the execution spine: live "current week" detection, per-day tasks tagged by owner (Caleb / Mark / Together) and type (Learn / Build / Write / Decide / Ship / Teach), each day with its "proof by end of day," and hard decision dates with kill-switch flags. Filter the calendar to view only your tasks.

The **body of work** is seven projects: two flagship build projects (the Neuroadaptive Control Workstation and the Neural Representation & Decoding Lab) and five research projects (continual-learning benchmark, brain-inspired memory adapter, sleep-consolidation ablation, memory interpretability probe, and a safe continually-learning desktop agent). Every project states what it proves and its honest limits.

The **resources** library carries the reference material both halves draw on:

- **Decision dates** — the non-negotiable gates, kill-switches marked in ink.
- **Deliverables** — the final checklist across Project 1, Project 2, and the portfolio.
- **Honesty rules** — the modality and claim discipline that keeps the work defensible.
- **The knowledge stack** — seven tiers from math foundations to autonomous-agent perception, each ending in a concrete deliverable.
- **Neural memory architectures** — the ordered reading list (Hopfield, fast weights, Gated DeltaNet, Test-Time Training, Titans, delta-mem, HeLa-Mem, Engram).
- **Biology to ML translation** — turning biological principles into falsifiable mechanisms.
- **The standard to aim for** — the questions that separate admiring the vision from being able to build it.
- **What not to learn first** — the supporting context to deprioritize.

## What is in here

- **Dashboard** — overall progress ring, current focus week, next hard decision, and the thesis.
- **Projects** — flagship and research projects, each with what it proves vs its honest limits.
- **Calendar** — the 13 day-based weeks with checkable progress and per-week completion bars.
- **Resources** — the reference sections described above; checkable where it makes sense (deliverables, reading list, the standard).

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
