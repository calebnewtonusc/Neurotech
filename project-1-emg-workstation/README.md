# Project 1 — Neuroadaptive Assistive Workstation

> EMG-based closed-loop assistive control system. Measured rigorously. Honest about what it is.

**Status:** Skeleton (Week 1) — structure only, no code yet
**Start date:** June 1, 2026
**Hardware lock:** June 5, 2026 (MindRove EMG armband, primary; simulated fallback)

---

## What this project is

A closed-loop assistive-control system that uses a MindRove forearm EMG armband (8-channel surface electromyography) plus a predictive context model to let a user operate a computer with minimal physical movement.

The system is tested in repeated sessions against a gesture-only control baseline. Every experiment is pre-registered before running.

**This is NOT a brain-computer interface. EMG measures muscle activity, not brain activity.**

---

## What it proves

- Real-time closed-loop system design with sub-100ms latency
- Low-bandwidth (8-ch, ~200 Hz) EMG is sufficient for intent decoding in an assistive context
- Prediction-assisted control reduces user movement burden vs. gesture-only
- Calibration improves decoding vs. no-calibration (same participant, same session)
- Performance is stable across 5+ repeated sessions (no degradation)

## Honest limits

- EMG measures muscle activity, NOT brain activity
- NOT an implanted device; NOT Neuralink hardware
- Simulated input (fallback) is labeled as such in all figures
- Single-participant validation; generalization requires further study
- Prediction model is context-aware but not “intelligent” — it pattern-matches task context

---

## Planned directory structure

```
project-1-emg-workstation/
├── README.md                    # This file
├── hardware/
│   ├── mindrove_setup.md        # MindRove connection + signal verification
│   └── signal_check.py          # Quick SNR and dropout-rate check
├── data/
│   ├── raw/                     # Raw EMG session files (gitignored)
│   └── processed/               # Windowed + labeled segments
├── experiments/
│   ├── preregistration/         # Hypotheses locked before running
│   └── results/                 # Figures, tables, outcome files
├── decoder/
│   ├── train.py                 # Gesture classifier training
│   ├── evaluate.py              # Cross-session evaluation
│   └── models/                  # Saved model checkpoints
├── system/
│   ├── loop.py                  # Real-time closed-loop controller
│   ├── predictor.py             # Context prediction model
│   └── interface.py             # OS-level input injection
└── requirements.txt
```

---

## Primary metrics

| Metric | Description | Baseline condition |
|---|---|---|
| Gesture accuracy | % correct gesture class | Chance (1/N gestures) |
| Completion time | Seconds to complete target task | Gesture-only control |
| Correction count | Number of input corrections per trial | Gesture-only control |
| Cross-session accuracy | Accuracy on session N without retraining | Session 1 calibration only |

---

## Dependencies (planned)

- `mindrove-sdk` (Python, MindRove official SDK)
- `numpy`, `scipy` (signal processing)
- `scikit-learn` or `pytorch` (gesture classifier)
- `pyautogui` or `pynput` (OS-level input)
- `matplotlib` (figures)

---

## Key dates

| Date | Milestone |
|---|---|
| Jun 5, 2026 | Hardware locked (MindRove primary) |
| Jun 19, 2026 | Hardware kill-switch: must show repeatable signal or pivot to simulated |
| Week 2 | MindRove unboxing, signal SNR check, first raw recording |
| Week 3 | First gesture classifier, run vs. chance baseline |
| Week 4 | First closed-loop session, latency measurement |
