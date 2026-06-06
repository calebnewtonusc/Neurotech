# Dataset Decision Memo — Project 2 Primary Track

**Date:** June 5, 2026
**Author:** Mark Lin
**Status:** LOCKED (Charter & dataset lock date: Jun 5, 2026)

---

## Decision

**Primary dataset (Project 2, Sub-study 1):** Neural Signal Archive (NSA) / Perich & Miller 2018 — NHP intracortical finger-movement data (Utah array, Monkey C & Monkey M, longitudinal across days, publicly available via CRCNS or Zenodo).

**Primary dataset (Project 2, Sub-study 2):** MCI (Motor Cortex Intracortical) speech decoding — Willett et al. 2023 *Nature* data release (human intracortical BrainGate2, phonemes → words → sentences, publicly available).

**Primary dataset (Project 2, Sub-study 3 — fMRI):** Natural Scenes Dataset (NSD) — Allen et al. 2022, human 7T fMRI responses to 70,000+ natural images (public via AWS Open Data).

All three datasets are locked. No additional primary datasets will be added without triggering the Jul 10 kill-switch review.

---

## Dataset Table

| Sub-study | Dataset | Modality | Species | Sessions | Access |
|---|---|---|---|---|---|
| NHP motor | Perich & Miller 2018 (CRCNS MC_Maze) | Intracortical spiking (Utah array) | NHP (Macaque) | Multi-day | Public (CRCNS / Zenodo) |
| Speech decoding | Willett et al. 2023 | Intracortical spiking + LFP (BrainGate2) | Human | Multi-session | Public (OSF / Zenodo) |
| fMRI design | Allen NSD 2022 | fMRI BOLD (7T) | Human | 30–40 sessions/subj | Public (AWS Open Data) |

---

## What Each Dataset Records (Honest Descriptions)

### MC_Maze — NHP Intracortical
- **What was recorded:** Single-unit and multi-unit spiking activity from 96-channel Utah arrays implanted in primary motor cortex (M1) and dorsal premotor cortex (PMd) of macaque monkeys.
- **What behavior is labeled:** Finger reaches to targets in a maze task. Each trial is labeled with target direction, reach path, and timing relative to go cue.
- **What a trial means:** One reach from a center hold to a peripheral target. ~500–1000 ms of movement. Repeated across sessions over many weeks.
- **Valid interpretations:** Movement-preparatory and movement-execution activity. Cross-session drift is real and must be modeled. Decoding accuracy must be measured against a no-recalibration baseline.
- **Invalid interpretations:** These spikes do NOT represent intent, planning cognition, or anything beyond motor execution in the recorded cortical regions.

### Willett et al. 2023 — Human Speech
- **What was recorded:** Intracortical spiking (threshold crossings) from 128-channel Utah arrays in left hemisphere speech motor cortex (precentral gyrus) of a person with ALS.
- **What behavior is labeled:** Attempted speech — phonemes, words, and full sentences. Labels are from acoustic ground truth recorded simultaneously.
- **What a trial means:** One attempted utterance. Latency from neural onset to decoded output is the key metric.
- **Valid interpretations:** Neural correlates of attempted speech in a single participant with a specific neurological condition. Decoder performance on phoneme/word/sentence levels with honest error analysis.
- **Invalid interpretations:** Do NOT generalize to healthy populations. Do NOT claim the decoder “understands” speech. LLM correction improves word-level output but does NOT represent the neural decoder’s true error rate — these must be reported separately.

### Allen NSD 2022 — Human fMRI
- **What was recorded:** BOLD fMRI signal (7 Tesla) across the whole brain in response to viewing 70,000+ natural images (COCO dataset).
- **What behavior is labeled:** Image viewed, fixation confirmed, subjective memory response. Images are labeled with COCO annotations.
- **What a trial means:** 3-second image presentation followed by rest. ~10,000 unique images repeated 3x per subject over 30–40 sessions.
- **Valid interpretations:** Voxel-level responses to visual stimuli. Can reconstruct experimental design, fit encoding models, and decode image categories.
- **Invalid interpretations:** BOLD is NOT neural spiking. Temporal resolution (~2 s) means you cannot decode moment-to-moment cognition. Do NOT conflate hemodynamic response with electrophysiology.

---

## Initial Metric Definitions

| Sub-study | Primary metric | Baseline condition |
|---|---|---|
| NHP motor | Angular decoding error (degrees) | No-recalibration decoder from day 1 |
| Speech decoding | Word error rate (WER), phoneme accuracy | Chance decoder (random phoneme assignment) |
| fMRI design | Voxel encoding model R² | Shuffled-label null model |

---

## Sign-off

- [ ] Caleb Newton agrees to dataset decision
- [x] Mark Lin authored and agrees to dataset decision
