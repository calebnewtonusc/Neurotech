# Week 1 Report — June 1–5, 2026

**Authors:** Caleb Newton & Mark Lin
**Period:** Week 1 of 13 (June 1 – June 5, 2026)
**Status:** End of week

---

## Summary

Week 1 was a charter and foundation week. No experiments were run and no analysis code was written. The goal was to make every key decision in writing before touching any data or hardware, so that Week 2 forward is building on a locked, honest foundation.

All five daily tasks were completed as planned.

---

## What shipped this week

| Artifact | File | Status |
|---|---|---|
| Project charter | `week-01/project_charter.md` | ✅ Committed |
| Hardware decision memo | `week-01/hardware_decision_memo.md` | ✅ Committed |
| Dataset decision memo | `week-01/dataset_decision_memo.md` | ✅ Committed |
| Honesty rules | `week-01/honesty_rules.md` | ✅ Committed |
| Evidence map | `week-01/evidence_map.md` | ✅ Committed |
| Project 1 repo skeleton | `project-1-emg-workstation/README.md` | ✅ Committed |
| Project 2 repo skeleton | `project-2-neural-decoding/README.md` | ✅ Committed |
| Week 1 report | `week-01/week_1_report.md` | ✅ This file |

---

## Decisions made and locked

### Hardware (Project 1)
- **Primary:** MindRove forearm EMG armband (8-channel, ~200 Hz, Bluetooth LE)
- **Fallback:** Simulated low-bandwidth EMG (keyboard/mouse injection + Gaussian noise)
- **Kill-switch date:** June 19, 2026 — must show repeatable real signal by then or pivot to simulated
- **What we are NOT claiming:** This is NOT a BCI. EMG measures muscle activity, not brain activity.

### Datasets (Project 2)
- Sub-study 1 (NHP motor): Perich & Miller 2018, CRCNS MC_Maze
- Sub-study 2 (Speech): Willett et al. 2023 (*Nature*), OSF/Zenodo
- Sub-study 3 (fMRI): Allen NSD 2022, AWS Open Data
- All three locked. No new primary datasets without triggering Jul 10 review.

### Honesty rules
- Eight rules documented in `honesty_rules.md`. Applied to all projects.
- Key rules: always state what signal measures; LLM correction must not hide decoder WER; simulated data always labeled; public data attributed correctly; baselines mandatory.

---

## Mark's Week 1 teaching contribution

Today (Friday, Jun 5) Mark’s assigned task was **Teach: signal-modality differences and why overclaiming weakens the application.**

The teaching was delivered through the written artifacts above, specifically:

1. **`hardware_decision_memo.md`** — contains a full signal modality comparison table (EMG → EEG → ECoG → intracortical), hierarchy by neural specificity / invasiveness / temporal resolution, and a 5-point argument for why overclaiming destroys application credibility.

2. **`honesty_rules.md`** — Rule 1 (always state what the signal measures), Rule 7 (do not conflate modalities), and Rule 2 (honest limits next to every claim) directly address signal-modality clarity and overclaiming.

3. **`evidence_map.md`** — The “What this does NOT prove” sections for every project and sub-study make the modality distinctions concrete.

Key points on why overclaiming weakens the application:
- An expert reviewer (the only reviewer that matters) catches a modality conflation in seconds and stops reading
- One overclaim undermines every accurate claim in the document
- Using the correct, more limited language and then backing it with real numbers is a stronger signal of competence than inflated framing
- The honest version of this work is already genuinely impressive; it does not need inflation

---

## Blockers

| Blocker | Impact | Resolution |
|---|---|---|
| MindRove hardware not yet tested | Project 1 baseline unknown | Week 2 task: unboxing + signal SNR check |
| NHP dataset not yet downloaded | Project 2 sub-study 1 blocked | Week 2 task: CRCNS account + download |
| Speech dataset not yet downloaded | Project 2 sub-study 2 blocked | Week 2 task: OSF download |
| No continual learning harness code | Research track blocked | Week 2 task: scaffold repo |

---

## Week 2 preview

- MindRove unboxing, first raw EMG recording, SNR check
- Download NHP and speech datasets; run shape/metadata verification
- Scaffold continual learning benchmark harness repo
- First gesture classifier attempt (Project 1)
- First baseline NHP decoder run (Project 2, Sub-study 1)

---

## Reflection

Week 1 accomplished its intended purpose: every decision that could derail the summer (hardware choice, dataset choice, honesty rules) is now in writing, locked, and version-controlled. The repo has a clear structure. The honest limits are documented before a single result exists, which is the only defensible way to run this.

The work starts for real in Week 2.
