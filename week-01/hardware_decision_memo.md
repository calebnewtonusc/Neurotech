# Hardware Decision Memo — Project 1 Input Modality

**Date:** June 5, 2026
**Author:** Mark Lin
**Status:** LOCKED (Charter & hardware decision date: Jun 5, 2026)

---

## Decision

**Primary input:** MindRove forearm EMG armband (8-channel, ≈200 Hz, Bluetooth LE)
**Fallback input:** Simulated low-bandwidth EMG via keyboard/mouse event injection with added Gaussian noise to mimic real signal variance

This decision is locked as of June 5, 2026, per the non-negotiable kill-switch schedule.

---

## Signal Modality Comparison

| Modality | What it measures | Bandwidth | Implanted? | Neuralink analog |
|---|---|---|---|---|
| **EMG (surface)** | Muscle electrical activity | Low (~200 Hz, 8 ch) | No | No — peripheral, not neural |
| **EEG** | Scalp-averaged cortical field potentials | Low-med (~256 Hz, 64 ch) | No | Weak analog (not spiking) |
| **ECoG** | Subdural cortical potentials | Medium (~1 kHz, 128 ch) | Yes (surgery) | Moderate analog |
| **Intracortical (Utah array)** | Single-unit / multi-unit spiking | High (~30 kHz, 96+ ch) | Yes (surgery) | Direct Neuralink analog |
| **fMRI (BOLD)** | Hemodynamic response (indirect) | Very low (~0.5 Hz) | No | Not comparable to spiking |

**Why EMG for Project 1:**
- Accessible without surgery or medical approval
- Real hardware available (MindRove); no simulation required for primary track
- Low bandwidth forces the system to demonstrate that *intent decoding is possible under constraint*
- Results are honest: we claim EMG-based assistive control, not BCI

---

## Why Overclaiming Weakens the Application

Overclaiming is the single fastest way to disqualify a research application at a rigorous institution or company:

1. **Reviewers with domain expertise will catch it immediately.** Calling surface EMG a “brain-computer interface” is factually wrong. A Neuralink engineer reviewing this will flag it and dismiss the entire application.

2. **It breaks trust in everything else you wrote.** One overclaim makes reviewers doubt every other claim, including the ones that are accurate.

3. **It signals you don’t understand the field.** Knowing the difference between EMG and intracortical spiking — and stating it honestly — demonstrates you’ve read the literature and understand the measurement hierarchy.

4. **Honest limits are strengths, not weaknesses.** “This system measures muscle activity, not brain activity” followed by solid latency and accuracy numbers is a far stronger submission than vague BCI language with no baseline.

5. **The honest version is still impressive.** A real closed-loop EMG assistive system with pre-registered experiments, repeated sessions, and rigorous comparison to gesture-only control is genuine engineering.

---

## Signal Modality Hierarchy (for context in Week 1 teaching)

```
Neural specificity (low → high):
  Surface EMG → EEG → ECoG → Intracortical spiking (Neuralink)

Invasiveness (low → high):
  Surface EMG = EEG (none) → ECoG (craniotomy) → Utah array (implant)

Temporal resolution (low → high):
  fMRI (~2 s) → EEG (~4 ms) → EMG (~5 ms) → Intracortical (~0.03 ms)
```

**Do not conflate:** BOLD signal (fMRI) ≠ field potentials (EEG/ECoG) ≠ action potentials (spiking).

---

## Fallback Criteria

If MindRove hardware fails to produce repeatable signal (noise floor too high, Bluetooth dropout rate > 5% of samples), the fallback is activated no later than **June 19, 2026** (hardware kill-switch date). Fallback uses keyboard/mouse injection with controlled noise; all simulated data will be labeled as such in every figure, table, and write-up.

---

## Sign-off

- [ ] Caleb Newton agrees to hardware decision
- [x] Mark Lin authored and agrees to hardware decision
