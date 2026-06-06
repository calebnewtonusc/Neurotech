# Project Charter — Summer 2026 Neurotech Research

**Date:** June 5, 2026
**Authors:** Caleb Newton & Mark Lin
**Version:** 1.0

---

## 1. Purpose

This charter defines the scope, goals, honest limits, and success criteria for the Summer 2026 Neurotech research program. It serves as the binding reference document for all decisions made during the 13-week plan (June 1 – August 28, 2026).

---

## 2. Team

| Person | Role |
|---|---|
| Caleb Newton | Lead researcher, systems build, neural decoding |
| Mark Lin | Research partner, continual learning, signal modality |

---

## 3. Flagship Projects

### Project 1 — Neuroadaptive Assistive Workstation
A closed-loop assistive-control system using a MindRove forearm EMG armband (or simulated low-bandwidth input) plus predictive context modeling. The system lets a user operate a computer with minimal movement, measured rigorously against gesture-only control.

**What it proves:**
- Real-time closed-loop system design
- Low-bandwidth EMG intent decoding
- Pre-registered hypotheses per experiment
- Repeated sessions across days
- Calibration vs. no-calibration
- Prediction-assisted vs. gesture-only
- Latency, accuracy, correction rate, completion time
- User-burden reduction

**Honest limits:**
- EMG measures muscle activity, NOT brain activity
- Is NOT an implanted BCI or a medical device
- Is NOT Neuralink hardware
- Simulated input is labeled as such, never as neural data

### Project 2 — Neural Decoding & Brain-State Modeling Lab
Three mandatory public-data sub-studies targeting Neuralink qualifications directly: human fMRI experimental design + decoding (NSD), NHP intracortical finger-movement decoding under neural drift, and human intracortical speech decoding with LLM-assisted correction.

**What it proves:**
- Human fMRI: experimental-design reconstruction + decoding
- NHP awake-behaving electrophysiology analysis
- Movement decoding robust to cross-session drift
- Speech decoding: phonemes, words, sentences
- LLM-assisted decoding + hallucination/failure analysis
- Manifold analysis & representation geometry
- Recalibration & manifold alignment across days
- Baseline-first ML with honest interpretation

**Honest limits:**
- No hands-on invasive recording — public data only
- Analyzed (not collected) NHP / human intracortical data
- No real scanner access — fMRI design is a reconstruction + protocol
- Does NOT conflate fMRI (BOLD) with spiking activity
- LLM correction must not hide the neural decoder's real errors

---

## 4. Research Projects

1. **Continual Learning Benchmark Harness** — quantifies forgetting rate, forward/backward transfer, and real costs across methods.
2. **Brain-Inspired Memory Adapter** — frozen transformer + trainable online memory module with query, feedback, selective update, replay, and consolidation.
3. **Sleep Consolidation Ablation Study** — tests whether a 'sleep' consolidation step helps continual learning.
4. **Memory Interpretability Probe** — locates where new memories live inside the model and whether they distort prior knowledge.
5. **Safe Continually Learning Desktop Agent** — narrow desktop agent that learns from demonstration, accepts corrections, operates under strict safety gates.

---

## 5. Non-Negotiable Decision Dates (Kill-switches)

| Date | Gate |
|---|---|
| Jun 5, 2026 | Charter, dataset & hardware lock |
| Jun 19, 2026 | Hardware / signal kill-switch |
| Jul 10, 2026 | Project 2 primary-track protection |
| Jul 17, 2026 | Mid-summer scope cut |
| Aug 7, 2026 | Feature freeze |
| Aug 14, 2026 | Results freeze |
| Aug 21, 2026 | Public package freeze |

---

## 6. Guiding Principles

- **Do not overclaim.** A skeptical reviewer respects measured, honest work far more than a flashy demo with no baseline.
- **Every project states what it proves AND its honest limits.**
- **Every Friday ships ONE artifact** — a figure, table, memo, or demo. That is the unit of progress.
- **Zoral (continual learning + memory + interpretability) is the PRIMARY target.** Neuralink is the stretch goal the same skills serve.
- **Weight effort toward research projects and the neural-decoding bridge first; use the EMG closed-loop as the systems showcase.**

---

## 7. Success Criteria

- Minimum viable summer: NHP finger-movement decoder on longitudinal intracortical data (drift + recalibration analysis) AND human intracortical speech decoder (phonemes → sentences) with LLM-assisted pass and honest hallucination analysis.
- Stretch: Published or submittable write-up for at least one research project; fully working Project 1 closed-loop demo with pre-registered results.
