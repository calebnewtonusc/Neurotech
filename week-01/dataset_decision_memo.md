# Dataset Decision Memo - Project 2 Primary Track

**Date locked:** June 5, 2026
**Author:** Mark Lin
**Status:** Locked Week 1 decision
**Applies to:** Project 2, Neural Decoding & Brain-State Modeling Lab

## Locked Decision

The protected primary Project 2 dataset is **LINK: Long-Term Intracortical Neural Activity and Kinematics**, hosted on DANDI as **Dandiset 001201**. It is the primary dataset because it directly supports the summer's strongest single question: longitudinal neural drift and recalibration for finger-movement decoding.

**Locked primary question:** Do learned neural representations improve held-out 2-DOF finger-kinematics decoding and cross-session robustness over ridge/Kalman-style and GRU baselines under limited recalibration?

The mandatory supporting tracks remain Natural Scenes Dataset (NSD) for fMRI design/encoding and Willett et al. 2023 for human intracortical speech decoding. They are required portfolio tracks, but the LINK motor/neural-population track is protected through the July 10 gate.

## Dataset Provenance

| Track | Dataset | Public access | What was recorded | Role in summer |
|---|---|---|---|---|
| Primary motor/neural-population track | LINK, Chestek Lab, DANDI 001201 | https://chesteklab.github.io/LINK_dataset/ and DANDI | Intracortical threshold crossings/spiking-band power plus 2-DOF finger kinematics from one rhesus macaque across 312 sessions | Primary analysis |
| Benchmark context | FALCON M2, DANDI 000953 | https://snel-repo.github.io/falcon/datasets.html | Monkey finger-control data from a Utah array and finger manipulandum | Secondary comparison if time allows |
| fMRI track | Natural Scenes Dataset | https://naturalscenesdataset.org/ | 7T fMRI BOLD responses from 8 human subjects viewing natural images | Mandatory design and encoding track |
| Speech track | Willett et al. 2023, Dryad DOI 10.5061/dryad.x69p8czpq | https://doi.org/10.5061/dryad.x69p8czpq | Intracortical speech neuroprosthesis data for attempted speech decoding | Mandatory speech/LLM track |

**Correction to planning shorthand:** the website mentions "FALCON H1 / DANDI" in the speech context. Official FALCON documentation describes H1 as human reach-and-grasp motor BCI calibration data, not speech. This memo therefore locks the speech track to the Willett Dryad release unless another public speech dataset is verified in writing.

## Why LINK Is Primary

LINK is the cleanest match for the single Week 1 Project 2 question. It is longitudinal, intracortical, motor-behavior-linked and explicitly suited to non-stationarity analysis. The dataset spans more than three years, which lets the team test drift and recalibration instead of only reporting within-session decoding.

The project can start with simple baselines and grow toward learned representations without changing datasets:

1. Establish shape/metadata loading and leakage-safe splits.
2. Fit zero/last-value, ridge or Kalman-style baselines.
3. Add a GRU sequence baseline.
4. Add one learned-latent model, such as LFADS-lite or a small sequential autoencoder.
5. Compare within-session decoding, cross-session degradation and limited recalibration recovery.

## What the Primary Dataset Measures

| Question | Locked answer |
|---|---|
| Species | One rhesus macaque, not human |
| Behavior | Two-degree-of-freedom individuated finger movement task |
| Neural signal | Intracortical recordings from Utah arrays, represented as threshold crossings and spiking-band power in binned timepoints |
| Behavioral signal | Finger joint angles and derived velocities synchronized to neural features |
| Trial/session meaning | Repeated finger-movement trials grouped into sessions across hundreds of days |
| Valid interpretation | Motor-cortex population activity can be related to finger kinematics, and decoding stability can be tested across time |
| Invalid interpretation | Do not claim human generalization, thought reading, speech decoding or data collection experience |

## Metrics and Baselines

| Metric | Definition | Baseline | Claim allowed if improved |
|---|---|---|---|
| Held-out kinematic R2 | Variance explained for each finger degree of freedom on held-out trials | Mean/last-value predictor and ridge/Kalman-style decoder | Better movement decoding on this dataset split |
| RMSE / MAE | Error between decoded and recorded finger position or velocity | Mean/last-value predictor | Lower numeric reconstruction error |
| Cross-session degradation | Performance drop when applying a source-session decoder to later sessions | No-recalibration session-1 decoder | Drift affects decoder performance |
| Recalibration gain | Recovery after limited target-session calibration samples | No-recalibration and full retrain reference | Limited recalibration helps under tested conditions |
| Learned-representation gain | Delta between LFADS-lite/autoencoder representation and ridge/GRU baselines | Ridge/Kalman-style and GRU baselines | Learned reps help only if gains survive held-out sessions |
| Alignment analysis | Change in latent/manifold distance across sessions | No alignment | Alignment may explain or reduce cross-session error |

No leaderboard, model or application claim is valid unless the relevant baseline is shown in the same figure or table.

## Supporting Track Scope

### NSD fMRI

NSD supports the fMRI qualification lane. It is a 7T fMRI dataset with BOLD responses from human subjects viewing natural scenes. The team can reconstruct stimulus timing, task structure, train/test splits, regions of interest and encoding/decoding models.

**Limit:** BOLD is an indirect hemodynamic signal with slow temporal resolution. NSD does not provide spiking activity, implanted-array data or scanner-operation experience.

### Willett et al. Speech

The speech track supports human intracortical speech-decoding and language-model-assistance claims. The correct reporting split is decoder-only performance first, then language-model-assisted output second.

**Limit:** Language-model correction can make text more fluent while obscuring neural decoder mistakes. Every result must report decoder-only error and post-LM error separately.

### FALCON

FALCON is relevant benchmark context for robust neural decoding. M2 is closest to finger control; H1 is human reach-and-grasp; H2 is handwriting; B1 is songbird vocalization. It should be cited accurately and not used as a vague label for speech.

## Access and First Verification Output

Week 2 must produce:

- A `data_access.md` note with exact download commands or access steps for LINK.
- A shape/metadata printout with session count, channel/features, bin size, kinematic variables and file sizes.
- A leakage-safe split note explaining how train/validation/test sessions are separated.
- A baseline metric definition file before model training begins.

## Sign-Off

| Person | Status | Notes |
|---|---|---|
| Caleb Newton | Pending explicit review | Needs to confirm the loader plan and storage budget |
| Mark Lin | Signed | Locks the primary dataset, single question and public-data limitations |
