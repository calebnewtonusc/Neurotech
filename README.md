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

- **Dashboard** — overall progress ring, live summer countdown, current focus week, next hard decision (with days-away), per-owner progress split (Caleb / Mark / Together), the thesis, and a clickable **13-week mini-map** colored by completion.
- **Projects** — flagship and research projects, each with what it proves vs its honest limits.
- **Calendar** — the 13 day-based weeks with checkable progress, per-week completion bars, **full-text search**, expand/collapse all, **today highlighting** on the matching weekday, and a free-text **week-notes** field for Friday reports.
- **Start here** — how to run the summer, an honest reality check on the odds, a checkable "minimum viable summer," the time budget, and the two-person rule.
- **Key decisions, resolved** — concrete recommended defaults for the plan's open choices (primary target, EMG hardware, the exact dataset, the stronger model, base model, memory architecture, compute, Mark's ramp), each with a why and a link.
- **Glossary** — plain-English definitions for the jargon and the modality distinctions that keep claims honest.
- **Focus mode** — "This week only" collapses the 13-week firehose to just what's in front of you.
- **Resources** — decision dates, deliverables, honesty rules, the knowledge stack, the neural-memory reading list (with paper links), the biology→ML table, the standard Q&A, what-not-to-learn, and a **References & sources** library.

## Use it on the go

Neurotech is an installable, offline-first PWA:

- **Install** — open the deployed URL on your phone and "Add to Home Screen." It launches full-screen with its own icon.
- **Offline** — a service worker caches the app shell and assets, so it works with no signal.
- **Live dates** — the current week, today highlight, and countdown track the real calendar automatically through the summer.

## Live sync between Caleb & Mark

Live at **https://neurotech-production.up.railway.app**

The app is local-first but backed by a real server so progress syncs across devices and people:

- On the dashboard, enter a shared **board code** (default `caleb-mark`) and hit **Connect**. Both people on the same code share one board.
- Checking a task or editing a week note pushes instantly; the app polls every 15s and on focus to pull the other person's changes.
- Edits merge with **per-item last-write-wins**, so checks, unchecks, and note edits from either person all reconcile correctly, no clobbering.
- It works **offline**: changes queue locally and flush automatically when you reconnect (the status line shows synced / syncing / offline-queued).

`localStorage` is still the local cache, so you can also **Export** / **Import** a `neurotech-progress-*.json` as a manual backup, and **Reset** clears this device.

## Design

The interface follows the Apple design language: SF Pro typography, a single Action Blue (`#0066cc`) accent, alternating parchment / white / near-black full-bleed tiles, pill CTAs, and no decorative chrome. The owner color coding stays monochrome-plus-blue (Caleb = Action Blue, Mark = ink, Together = muted gray) so the single-accent rule holds.

## Run locally

```bash
npm start
# then open http://localhost:3000
```

No build step and no dependencies — `server.js` is a tiny zero-dependency Node server that hosts the static app **and** the sync API.

By default it persists to `./.data/boards.json`; set `DATA_DIR` (or run on Railway with a volume) to point it at durable storage.

## Backend / API

`server.js` exposes a small JSON API alongside the static files:

- `GET /api/health` — status + the active data directory.
- `GET /api/board/:id` — the shared board state (`progress`, `notes`, per-key `ts`).
- `PATCH /api/board/:id` — apply one change `{ kind: "progress" | "note", key, value, t }` with last-write-wins.
- `PUT /api/board/:id/import` — merge a full export into a board.

State persists to a JSON file with atomic writes and a flush on shutdown.

## Deploy to Railway

Lives in the **Learning tech** project as the **Neurotech** service, with a volume mounted at `/data` for durable storage. Deployed with the Railway CLI:

```bash
railway link -p <project> -e production -s Neurotech
railway volume add -m /data          # durable persistence
railway up --ci                      # build (Nixpacks) + deploy
```

`server.js` reads `PORT` and `RAILWAY_VOLUME_MOUNT_PATH` automatically, so the board store survives redeploys. Pushing to GitHub also redeploys if the service is repo-connected.

## Files

- `index.html` — the full tracker UI (local-first + live sync client).
- `data.js` — the entire plan as structured data (edit here to update tasks, dates, or deliverables).
- `server.js` — zero-dependency static host **+** sync API with file persistence.
- `manifest.webmanifest`, `sw.js`, `icon*.png/svg` — the installable, offline PWA.
- `DESIGN.md` — the Apple design reference the UI is built against.

All glory to God! ✝️❤️
