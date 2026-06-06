# Project 1 - Neuroadaptive Assistive Workstation

**Status:** Week 1 skeleton
**Start date:** June 1, 2026
**Hardware/input lock:** June 5, 2026
**Kill-switch:** June 19, 2026

## What This Project Is

The Neuroadaptive Assistive Workstation is a closed-loop computer-control prototype. It starts with simulated low-bandwidth input so the team can build the logger, decoder interface, UI actions, prediction policy, metrics and replay tools immediately. After the loop is instrumented, the same interface can be driven by open surface EMG if hardware clears the June 19 signal-quality gate.

The project is BCI-inspired assistive control. It is not an implanted BCI and it does not read brain activity.

## Locked Input Path

| Stage | Input | Purpose |
|---|---|---|
| Week 1-2 primary | Simulated low-bandwidth command channels | Build the end-to-end workstation, event logs, labels and metrics before hardware risk can block the project |
| Real-EMG target | MyoWare 2.0 surface EMG; OpenBCI if multi-channel quality/setup is worth it | Add real muscle-signal noise, electrode-placement sensitivity and fatigue constraints |
| Fallback | Continue simulated-first if EMG cannot be logged and repeated by June 19 | Preserve the core closed-loop and baseline experiment |
| Not a dependency | Meta Neural Band or unverified armband SDKs | Only usable if real programmatic access appears |

## What It Proves

- A low-bandwidth control loop can be measured from input event to UI action.
- Prediction-assisted control can be compared against gesture-only control on the same workflow.
- Calibration, correction rate, latency and completion time can be logged instead of described vaguely.
- Real EMG, if added, can be evaluated against the same simulated harness and baselines.

## Honest Limits

- Surface EMG measures muscle activation, not cortical activity.
- Simulated low-bandwidth input is synthetic and must be labeled as simulated in every result.
- The prototype is not Neuralink hardware, not an implanted device and not a medical device.
- Single-user results are not population-level evidence.
- A prediction policy can reduce clicks or corrections without proving that it understands intent.

## Planned Directory Structure

```text
project-1-emg-workstation/
├── README.md
├── configs/
│   ├── command_vocab.yaml
│   ├── simulated_input.yaml
│   └── metrics.yaml
├── data/
│   ├── raw/                  # gitignored raw EMG or simulated session exports
│   ├── processed/            # windowed features and labels
│   └── examples/             # tiny synthetic examples safe to commit
├── docs/
│   ├── protocol.md
│   ├── hardware_signal_check.md
│   └── limitations.md
├── experiments/
│   ├── preregistration/
│   ├── session_logs/
│   └── results/
├── src/
│   ├── input/
│   │   ├── simulated.py
│   │   └── emg_reader.py
│   ├── decoding/
│   │   ├── features.py
│   │   ├── train_baseline.py
│   │   └── evaluate.py
│   ├── loop/
│   │   ├── controller.py
│   │   ├── predictor.py
│   │   └── logger.py
│   └── ui/
│       └── workstation_demo.py
├── tests/
│   ├── test_event_schema.py
│   └── test_metrics.py
└── requirements.txt
```

## Primary Metrics and Baselines

| Metric | Definition | Baseline |
|---|---|---|
| Command accuracy | Percent of input windows assigned to the correct command class | Chance over the command vocabulary |
| End-to-end latency | p50 and p95 time from input event/window close to UI action | Direct keyboard/mouse trigger latency |
| Task completion time | Seconds to finish a fixed workstation task | Gesture-only/no-prediction control |
| Correction rate | User corrections per task trial | Gesture-only/no-prediction control |
| Calibration time | Minutes/samples needed before the decoder reaches usable accuracy | No-calibration decoder |
| Burden rating | Post-session effort/fatigue rating | Same workflow without prediction assistance |

No metric is reported as a success unless the data source is labeled `simulated` or `real_emg` and the baseline appears in the same table.

## Key Dates

| Date | Milestone |
|---|---|
| June 5, 2026 | Input path locked: simulated-first, open surface EMG after verification |
| June 12, 2026 | Protocol, logging schema and first baseline architecture |
| June 19, 2026 | Hardware/signal kill-switch |
| June 26, 2026 | Refined protocol and serious baseline benchmark |
| July 24, 2026 | Closed-loop workstation v1 |
| August 7, 2026 | Feature freeze |
| August 21, 2026 | Public package freeze |

## Week 1 Definition of Done

This skeleton is complete when it states the project, claims, limits, directory plan, metrics, baselines and decision dates. Code begins only after the Week 1 decision documents are locked.
