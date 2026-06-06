# Evidence Map - Claims, Proof and Limits

**Date locked:** June 5, 2026
**Author:** Mark Lin
**Purpose:** Map each summer artifact to the exact claim it can support, the baseline it must beat and the limit that must stay attached.

## Audience Map

| Audience | What they care about | Summer evidence |
|---|---|---|
| Zoral | Continual learning, memory, interpretability, evaluation discipline | Forgetting curves, online-memory adapter, consolidation ablation, interpretability probe |
| Neuralink stretch | Neural decoding, population dynamics, closed-loop control, experimental design | LINK movement decoding, NSD fMRI design, speech decoder analysis, Project 1 closed-loop workstation |
| General ML/research reviewers | Baselines, reproducibility, ablations, limitations | Public repos, frozen configs, reports, figures, failure analysis |

## Project 1 - Neuroadaptive Assistive Workstation

| Claim | Proof required | Baseline | Honest limit |
|---|---|---|---|
| A closed-loop workstation can be controlled with low-bandwidth input | Runnable demo with event logs, latency table and replayable sessions | Gesture-only/no-prediction control | Simulated input or EMG is not brain activity |
| Prediction assistance reduces user burden | Lower completion time and correction rate across repeated tasks | Same command vocabulary without prediction | Burden is workflow- and user-specific |
| Real EMG can drive the same loop if hardware clears the kill-switch | Raw EMG logs, preprocessing notes, held-out classifier results and latency | Chance classifier and simulated harness | EMG measures muscle activation only |
| Calibration matters | Calibrated vs uncalibrated comparison in same session | No-calibration condition | Single session does not establish generalization |

## Project 2 Primary - LINK NHP Finger-Movement Decoding

| Claim | Proof required | Baseline | Honest limit |
|---|---|---|---|
| Motor-cortex population activity predicts 2-DOF finger kinematics in held-out data | Leakage-safe held-out R2/RMSE table | Mean/last-value predictor and ridge/Kalman-style decoder | NHP motor data does not generalize automatically to humans |
| Decoding degrades across sessions because neural recordings drift | Source-session decoder applied to later sessions with degradation curve | Session-1 no-recalibration decoder | Drift is inferred from performance/representation changes, not directly "seen" as a single mechanism |
| Limited recalibration restores some performance | Recalibration-gain plot under fixed sample budgets | No-recalibration and full-retrain reference | Recalibration result is dataset/protocol-specific |
| Learned representations help only if they beat simple baselines | LFADS-lite/autoencoder or GRU comparison across held-out sessions | Ridge/Kalman-style and GRU baselines | A small gain is not a general SOTA claim |

## Project 2 Supporting - NSD fMRI

| Claim | Proof required | Baseline | Honest limit |
|---|---|---|---|
| NSD experimental structure can be reconstructed | Protocol note covering stimuli, timing, task, train/test split and ROIs | Published NSD documentation | This is reconstruction, not scanner operation |
| Visual BOLD responses support encoding/decoding analysis | ROI encoding R2 or category decoding above null | Shuffled-label/ROI null model | BOLD is indirect and slow; not spiking |

## Project 2 Supporting - Human Intracortical Speech

| Claim | Proof required | Baseline | Honest limit |
|---|---|---|---|
| Intracortical attempted-speech data can support phoneme/text decoding analysis | Decoder-only error metrics on held-out data | Chance/simple decoder | Public data from a specific participant/protocol |
| Language-model correction improves final text output | Decoder-only vs post-LM metrics in the same table | Decoder-only output | The LM may guess plausible language unsupported by neural evidence |
| Failure analysis is honest | Confusion examples and hallucination/error taxonomy | N/A | Error examples do not establish full causal interpretation |

## Zoral-Facing Continual Learning Track

| Artifact | Claim | Proof required | Honest limit |
|---|---|---|---|
| Continual-learning benchmark harness | Forgetting differs across methods | Sequential-task metrics for naive fine-tune, replay, LoRA/adapters and memory | Small models; no frontier claim |
| Brain-inspired memory adapter | Online memory can improve retention under correction | Retention/forgetting curves vs naive and replay baselines | Computational analogy, not biological proof |
| Consolidation ablation | Offline replay/pruning/consolidation may improve retention | Ablation across online-only, replay, pruning and consolidation | Results scoped to tested tasks |
| Interpretability probe | New information may become detectable in specific layers/adapters | Linear probes, activation similarity, ablation/patching | Probes are partial evidence, not complete mechanistic proof |
| Safe desktop learner | A narrow agent can learn from demonstrations under approval gates | Action logs, correction logs, safety-gate counts | Not consequential autonomy |

## Neuralink Qualification Matrix

| Requirement area | Evidence artifact | Limit that must be stated |
|---|---|---|
| Movement decoding | LINK NHP finger decoder and drift/recalibration analysis | Public NHP data analyzed, not collected; not human motor cortex |
| Speech decoding | Willett speech analysis with decoder-only and LM-assisted metrics | Public human intracortical data; LM output is not raw decoder performance |
| Human fMRI | NSD protocol reconstruction and encoding/decoding analysis | BOLD is indirect; no scanner operation |
| Neural population dynamics/manifolds | LINK latent trajectories and cross-session alignment | Manifold analysis is a model of structure, not proof of mechanism by itself |
| Closed-loop systems | Project 1 workstation with latency/correction/burden metrics | EMG/simulation is not implanted BCI |
| Experimental design | Pre-registered hypotheses, baselines, ablations and Friday reports | Unmeasured targets stay future work |
| Python/reproducibility | Loaders, configs, saved metrics, rerunnable notebooks | Code quality must be demonstrated by running it |
| Exceptional ability | Two coherent public repos plus final report and external review request | Cannot manufacture 2+ years of experience in one summer |

## Current Evidence Gaps After Week 1

| Gap | Status | Resolution path |
|---|---|---|
| No Project 1 signal has been recorded | Open | Week 2 simulated harness plus real-EMG access test |
| LINK not loaded locally yet | Open | Week 2 data access and shape/metadata output |
| No decoding baseline run yet | Open | Week 2/3 ridge or Kalman-style baseline |
| No speech data analysis yet | Open | After LINK loader and baseline are stable |
| No fMRI analysis yet | Open | Keep NSD to design/encoding lane until primary motor track stands |
| No continual-learning code yet | Open | Scaffold harness after Week 1 locks |

## Evidence Rule

A project is application evidence only when it has all four parts: a measured result, a baseline, a limitation and a reproducible path. Anything missing one of those parts is still work in progress.
