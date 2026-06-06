# Project Charter - Summer 2026 Neurotech Research

**Date locked:** June 5, 2026
**Authors:** Caleb Newton and Mark Lin
**Status:** Locked Week 1 charter
**Calendar gate:** Charter, dataset and hardware lock

## Locked Thesis

The summer is a 13-week build-and-research program running from June 1 to August 28, 2026. The primary near-term target is Zoral-style continual learning, memory and interpretability work. Neuralink is the stretch target served by the same evidence discipline: neural decoding, representation learning, closed-loop systems, Python fluency, careful experimental design and honest communication.

The durable win is not a guaranteed internship or offer. The durable win is defensible public work that Caleb and Mark can both run, explain and critique under skeptical review.

## Operating Principles

1. Every Friday ships a concrete artifact: a memo, report, figure, table, demo or reproducible repo state.
2. Every claim ships with its honest limit beside it.
3. Baselines are mandatory before any result is described as an improvement.
4. Simulated data is labeled as simulated in filenames, captions, tables and abstracts.
5. Public neural datasets are analyzed, not collected by this team.
6. Weekends are protected. If work slips, scope is cut or rolled forward rather than quietly making weekends mandatory.
7. Knowledge cannot stay single-owner. Caleb and Mark must both be able to run and explain the core artifacts.

## Team Roles

| Person | Primary Week 1 ownership | Required crossover |
|---|---|---|
| Caleb Newton | Systems scaffolding, reproducibility, repo structure, experiment configuration | Teach Mark how to run the repos and configs |
| Mark Lin | Signal-modality teaching, claim discipline, dataset interpretation, written decisions | Teach Caleb the modality and overclaiming rules in every memo |
| Together | Hard decisions, success criteria, evidence map, Friday report | Sign off on locks before Week 2 build work |

## Project 1 - Neuroadaptive Assistive Workstation

Project 1 is a closed-loop assistive-control workstation. It uses low-bandwidth input plus predictive context modeling to help a user operate a computer with fewer or smaller movements, then measures that system against a gesture-only baseline.

**Locked input path:** build the full logging, decoding, UI and metrics loop first on simulated low-bandwidth input, then swap in open surface EMG once raw signal access is verified. The real-EMG target is MyoWare 2.0 for the fastest inspectable path, with OpenBCI as the cleaner multi-channel path if setup time and signal quality justify it. Meta Neural Band is not a planned dependency unless real programmatic developer access appears. A previous project card mentions MindRove; that is not treated as the locked dependency unless the device and SDK can be verified by the June 19 hardware kill-switch.

**What Project 1 can prove:**

- A real-time closed-loop workstation can be instrumented end to end.
- Low-bandwidth input can be decoded into a small command vocabulary under controlled conditions.
- Prediction-assisted control can be compared against gesture-only control using completion time, latency, correction rate and user burden.
- Calibration and repeated-session effects can be measured instead of assumed.

**Honest limits:**

- Surface EMG measures muscle activation, not brain activity.
- Simulated low-bandwidth input is not biological data.
- The workstation is BCI-inspired assistive technology, not an implanted BCI, not a medical device and not Neuralink hardware.
- Single-user or small-n results do not establish generalization to other users.

## Project 2 - Neural Decoding & Brain-State Modeling Lab

Project 2 is a public-data neural decoding lab. Its protected primary track is the longitudinal NHP finger-movement dataset because it best matches the summer's decoding, drift and recalibration goals. The fMRI and speech tracks remain mandatory for the full portfolio, but they do not displace the motor/neural-population track before the July 10 protection gate.

**Locked primary dataset:** LINK: Long-Term Intracortical Neural Activity and Kinematics, DANDI 001201, Chestek Lab. It contains chronic intracortical recordings and 2-DOF finger kinematics from one rhesus macaque across 312 sessions spanning 1,242 days. It is the primary dataset for drift, recalibration and learned-representation comparisons.

**Locked primary question:** Do learned neural representations improve held-out 2-DOF finger-kinematics decoding and cross-session robustness over ridge/Kalman-style and GRU baselines under limited recalibration?

**Mandatory supporting tracks:**

- Human fMRI: Natural Scenes Dataset (NSD), 7T BOLD responses from 8 subjects viewing natural images, used for experimental-design reconstruction, encoding models and honest fMRI limitations.
- Human intracortical speech: Willett et al. 2023 speech neuroprosthesis data on Dryad, used for decoder-only versus language-model-assisted reporting. The planning site mentions "FALCON H1 / DANDI" for speech, but official FALCON documentation identifies H1 as human reach-and-grasp motor BCI data, not speech. The honest speech data source is therefore the Willett Dryad release unless a different public speech dataset is explicitly verified.
- FALCON/DANDI benchmark context: FALCON M2 is relevant to NHP finger control, but LINK is the locked longitudinal primary dataset for the summer question.

**What Project 2 can prove:**

- Public intracortical recordings can support baseline-first movement decoding analysis.
- Cross-session neural drift can be measured over long timescales.
- Recalibration and alignment methods can be compared against no-recalibration baselines.
- fMRI, spiking electrophysiology and speech-decoding pipelines can be described without conflating their signals.

**Honest limits:**

- The team did not collect invasive recordings, implant arrays, run a scanner or recruit participants.
- NHP motor results do not automatically generalize to human motor cortex.
- NSD fMRI is BOLD hemodynamics, not single-neuron or spike data.
- Language-model correction can improve text output while hiding decoder errors unless decoder-only metrics are reported separately.

## Zoral-Facing Research Track

The Zoral-aligned research track is the continual-learning and memory spine of the summer. It includes a benchmark harness, a brain-inspired online memory adapter, a consolidation ablation, an interpretability probe and a safety-gated desktop learner.

**What it can prove:** method behavior under sequential tasks, forgetting curves, transfer, memory/update costs and failure cases.
**Honest limits:** small open models are not frontier models; brain-inspired mechanisms are computational analogies, not neuroscience claims; a safe desktop learner is narrow and consent-based, not open-ended autonomy.

## Non-Negotiable Gates

| Date | Gate | Decision standard |
|---|---|---|
| June 5, 2026 | Charter, dataset and hardware lock | This file plus hardware, dataset, honesty and evidence docs committed |
| June 19, 2026 | Hardware/signal kill-switch | Real input must be logged, repeated and measured above baseline, or Project 1 stays simulated-first |
| July 10, 2026 | Project 2 primary-track protection | LINK motor/neural-population track must stand alone before fMRI expansion |
| July 17, 2026 | Mid-summer scope cut | Preserve the strongest final narrative and kill distractors |
| August 7, 2026 | Feature freeze | No major new models, datasets, hardware or UI |
| August 14, 2026 | Results freeze | Freeze core metrics, figures and approved claims |
| August 21, 2026 | Public package freeze | Repos, report, project page and demos complete |
| August 28, 2026 | Application and interview freeze | Bullets, links, mock interview answers and final claim review complete |

## Minimum Viable Summer

The summer succeeds if these artifacts exist and can be defended:

- A longitudinal intracortical NHP finger-movement decoder on LINK with drift and recalibration analysis.
- A human intracortical speech-decoding analysis that separates decoder-only output from language-model-assisted output.
- A human fMRI NSD design reconstruction and analysis that clearly states BOLD limitations.
- A Project 1 closed-loop workstation whose simulated and real-EMG data are never conflated.
- One continual-learning memory artifact with forgetting curves and at least one ablation.
- A final report, demo, qualification matrix and external review request.

## Week 1 Deliverable Set

| Deliverable | File |
|---|---|
| Project charter | `week-01/project_charter.md` |
| Hardware decision memo | `week-01/hardware_decision_memo.md` |
| Dataset decision memo | `week-01/dataset_decision_memo.md` |
| Honesty rules | `week-01/honesty_rules.md` |
| Evidence map | `week-01/evidence_map.md` |
| Project 1 repo skeleton | `project-1-emg-workstation/README.md` |
| Project 2 repo skeleton | `project-2-neural-decoding/README.md` |
| Week 1 report | `week-01/week_1_report.md` |

## Sign-Off

| Person | Sign-off | Meaning |
|---|---|---|
| Caleb Newton | Pending explicit review | Agrees the build scope and repo foundations are accurate |
| Mark Lin | Signed in this Week 1 document set | Agrees the modality, dataset and honesty locks are accurate |
