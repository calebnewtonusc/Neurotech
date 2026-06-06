# Evidence Map — What Each Project Proves and to Whom

**Date:** June 5, 2026
**Author:** Mark Lin
**Purpose:** Maps each project and sub-study to the specific claim it supports, the evidence type, and the audience it addresses (Zoral / Neuralink / general ML).

---

## How to read this map

Each row is a **claim** — a falsifiable statement this project is designed to support or refute. The evidence column lists what artifact would constitute proof. The audience column names who finds this claim valuable.

---

## Project 1 — Neuroadaptive Assistive Workstation

| Claim | Evidence required | Evidence type | Audience |
|---|---|---|---|
| Low-bandwidth EMG enables intent decoding sufficient for assistive computer control | Latency, accuracy, correction rate vs. gesture-only baseline across 5+ sessions | Controlled experiment | Neuralink (systems), assistive tech |
| Closed-loop real-time prediction reduces user movement burden | Completion time and correction count lower in prediction-assisted vs. gesture-only | Controlled experiment | Neuralink (systems), HCI |
| Calibration improves decoding vs. no-calibration | Accuracy delta between calibrated and uncalibrated runs, same participant, same day | A/B experiment | Neuralink (systems) |
| System generalizes across repeated sessions | No significant accuracy degradation across 5 sessions, same participant | Repeated measures | Neuralink (systems) |

**What this does NOT prove:**
- That the system reads brain signals (it does not)
- That it is equivalent to or a substitute for Neuralink hardware
- That it generalizes to other users without separate validation

---

## Project 2, Sub-study 1 — NHP Motor Decoding

| Claim | Evidence required | Evidence type | Audience |
|---|---|---|---|
| Neural drift causes measurable decoding degradation over days | Decoding error increases monotonically without recalibration across sessions | Longitudinal analysis | Neuralink (neural engineering) |
| Recalibration recovers decoding accuracy after drift | Error returns to session-1 level after recalibration procedure | Intervention experiment | Neuralink (neural engineering) |
| Manifold alignment captures drift structure | Latent space alignment reduces cross-session error vs. no alignment | Ablation | Neuralink (neural engineering), ML |

**What this does NOT prove:**
- Anything about human motor cortex (NHP only)
- Anything about speech or cognition
- That we recorded this data (public dataset, Perich & Miller 2018)

---

## Project 2, Sub-study 2 — Human Speech Decoding

| Claim | Evidence required | Evidence type | Audience |
|---|---|---|---|
| Neural activity in speech motor cortex encodes phoneme-level speech intentions | Phoneme classification accuracy > chance from intracortical spikes | Decoding experiment | Neuralink (speech BCI) |
| LLM post-processing reduces word error rate | WER(post-LLM) < WER(pre-LLM), reported separately | Pipeline ablation | Neuralink (speech BCI), NLP |
| LLM gain is separable from neural decoder quality | Both WER values reported; delta labeled “LLM correction gain” | Honest reporting | Neuralink, peer review |

**What this does NOT prove:**
- Generalization to healthy participants (single ALS participant)
- That the LLM “understands” speech
- That we collected this data (public dataset, Willett et al. 2023)

---

## Project 2, Sub-study 3 — Human fMRI

| Claim | Evidence required | Evidence type | Audience |
|---|---|---|---|
| Visual cortex BOLD responses encode image identity | Encoding model R² > shuffled-label null | Encoding model | Neuralink (adjacent), vision ML |
| Experimental design can be reconstructed from public fMRI data | Reproduced stimulus-response structure matches published NSD results | Replication | Neuralink (methodology) |

**What this does NOT prove:**
- That fMRI is equivalent to spiking neural data (it is not)
- That we have real scanner access
- Anything about intracortical signals

---

## Research Projects — Continual Learning Track

| Project | Claim | Evidence required | Audience |
|---|---|---|---|
| Benchmark Harness | Catastrophic forgetting is measurable and method-dependent | Forgetting rate across naïve FT, replay, LoRA, adapter | Zoral |
| Memory Adapter | Online memory module reduces forgetting vs. naïve FT | Forgetting rate, retention after correction | Zoral |
| Sleep Ablation | Consolidation step improves retention beyond replay alone | Ablation across 4 configurations | Zoral |
| Interpretability Probe | New memories are localized to specific layers | Probe accuracy, activation patching | Zoral, interpretability research |
| Desktop Agent | Continual learning is safe in a real interactive loop | Action log review, safety gate trigger rate | Zoral, AI safety |

---

## Summary: Evidence Gaps (as of Week 1)

| Gap | Status | Resolution path |
|---|---|---|
| No Project 1 hardware test yet | Open | MindRove unboxing and signal test, Week 2 |
| No baseline experiment run | Open | Protocol v0 drafted (Thu task); run Week 3 |
| No NHP data downloaded | Open | CRCNS account + download, Week 2 |
| No speech data downloaded | Open | OSF download, Week 2 |
| No continual learning harness code | Open | Scaffold Week 2, first result Week 3 |
