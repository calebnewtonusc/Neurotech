# Week 1 Report - June 1-5, 2026

**Authors:** Caleb Newton and Mark Lin
**Period:** Week 1 of 13
**Status:** Friday proof package complete

## What Shipped

| Artifact | File | Purpose |
|---|---|---|
| Project charter | `week-01/project_charter.md` | Locks the summer thesis, project scope, gates and success criteria |
| Hardware decision memo | `week-01/hardware_decision_memo.md` | Locks Project 1 simulated-first input path and real-EMG kill-switch |
| Dataset decision memo | `week-01/dataset_decision_memo.md` | Locks LINK as the Project 2 primary dataset and states the single primary question |
| Honesty rules | `week-01/honesty_rules.md` | Defines modality, simulation, public-data, baseline and speech-LM reporting rules |
| Evidence map | `week-01/evidence_map.md` | Maps each project claim to proof, baseline, audience and honest limit |
| Project 1 skeleton | `project-1-emg-workstation/README.md` | Defines workstation structure, metrics, baselines and key dates |
| Project 2 skeleton | `project-2-neural-decoding/README.md` | Defines decoding-lab structure, datasets, metrics, baselines and key dates |
| Week 1 report | `week-01/week_1_report.md` | Records shipped artifacts, decisions, blockers and Week 2 preview |

No experiments were run in Week 1. No neural data, EMG data or simulated results are being claimed as evidence yet. Week 1 was the lock-and-scope week.

## Decisions Made

### Project 1 Input Path

Project 1 will build on simulated low-bandwidth input first. This lets the team complete logging, UI control, decoder interfaces, metrics and baseline comparisons before hardware risk can block progress.

The real-hardware target is open surface EMG: MyoWare 2.0 first for speed and inspectability, with OpenBCI as the cleaner multi-channel option if setup time is justified. Real EMG replaces the simulator only if it clears the June 19 hardware/signal kill-switch.

**Honest limit:** simulated input is synthetic, and surface EMG is muscle activity. Neither is brain activity, implanted BCI data or Neuralink hardware.

### Project 2 Dataset and Question

Project 2's protected primary dataset is LINK, DANDI 001201, from the Chestek Lab. The locked question is whether learned neural representations improve held-out 2-DOF finger-kinematics decoding and cross-session robustness over ridge/Kalman-style and GRU baselines under limited recalibration.

NSD fMRI and Willett et al. 2023 speech data remain mandatory supporting tracks. The plan now explicitly corrects the shorthand that called speech "FALCON H1"; official FALCON documentation labels H1 as reach-and-grasp motor BCI data, so the speech track is locked to the Willett Dryad release unless a different public speech dataset is verified.

**Honest limit:** all Project 2 data is public data analyzed by the team, not data collected by the team.

### Claim Discipline

The Week 1 documents lock the rule that every future result must show:

- the signal source;
- the dataset or simulation label;
- the baseline;
- the metric;
- the honest limit;
- enough provenance to reproduce or audit the result.

## Mark's Friday Teaching Artifact

Mark's calendar task was: **Teach signal-modality differences and why overclaiming weakens the application.**

That teaching is captured in three places:

1. `week-01/hardware_decision_memo.md` explains why simulated input, surface EMG, EEG, fMRI, ECoG and intracortical recordings are different evidence types.
2. `week-01/honesty_rules.md` gives reusable correct-vs-incorrect wording for reports, demos, application bullets and interviews.
3. `week-01/evidence_map.md` attaches "what this does not prove" to each project claim.

The core teaching point is simple: overclaiming does not make the work sound stronger to an expert. It makes the rest of the work less trustworthy. The honest version is already strong if it is measured carefully.

## Blockers

| Blocker | Impact | Resolution |
|---|---|---|
| Project 1 real EMG not verified | Cannot claim real EMG performance | Build simulated harness immediately; test real EMG against June 19 kill-switch |
| LINK not downloaded or loaded yet | No Project 2 baseline can be reported | Week 2 data-access note and shape/metadata output |
| Storage/compute requirements not measured | Could slow data work | Estimate LINK download footprint and start with small metadata/sample loader |
| Speech dataset shorthand was ambiguous | Risk of citing FALCON H1 incorrectly | Lock speech to Willett Dryad unless another public speech dataset is verified |
| No continual-learning harness yet | Zoral-facing track not runnable | Scaffold after Week 1 locks and Project 2 loader path are underway |

## Week 2 Preview

Week 2 should produce:

- Project 1 simulated input harness with command vocabulary, event schema and replayable session logs.
- Project 1 real-EMG access test plan with SNR, dropout, timestamp and latency criteria.
- LINK data-access instructions and first shape/metadata output.
- Baseline metric definitions for Project 2 before model training.
- A protocol/logging document that makes leakage, simulation labels and public-data attribution hard to miss.

## Closeout

Week 1 succeeded if the team can now start building without debating the basic claims. The locked path is simulated-first for Project 1, LINK-first for Project 2, Zoral-first for the overall narrative and honesty-first for every public statement.
