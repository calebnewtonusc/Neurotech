# Project 2 - Neural Decoding & Brain-State Modeling Lab

**Status:** Week 1 skeleton
**Dataset lock:** June 5, 2026
**Primary-track protection gate:** July 10, 2026

## What This Project Is

Project 2 is a public-data neural decoding lab. Its protected primary track is longitudinal NHP finger-movement decoding using LINK, the Long-Term Intracortical Neural Activity and Kinematics dataset from the Chestek Lab. The project asks whether learned neural representations improve held-out 2-DOF finger-kinematics decoding and cross-session robustness over simple baselines under limited recalibration.

The project also includes two mandatory supporting tracks: NSD fMRI design/encoding and human intracortical speech decoding using the Willett et al. 2023 Dryad release. These tracks support the broader Neuralink-aligned qualification matrix, but the LINK motor/neural-population track is the first dataset that must stand on its own.

## What It Proves

- Public intracortical recordings can be loaded, split and decoded reproducibly.
- Neural drift can be measured through cross-session performance degradation.
- Recalibration and learned representations can be compared against simple baselines.
- Modality-specific reporting can distinguish spiking-band activity, BOLD fMRI and language-model-assisted speech output.

## Honest Limits

- The team analyzes public data; it does not collect neural recordings.
- LINK is NHP motor data from one animal, not human speech or cognition.
- NSD is fMRI BOLD, an indirect hemodynamic measure, not spiking.
- Willett speech results must report decoder-only and language-model-assisted errors separately.
- FALCON H1 should not be described as speech data; official FALCON documentation labels it as human reach-and-grasp motor BCI data.
- Strong results here do not create hands-on invasive, surgical, clinical or scanner-operation experience.

## Locked Datasets

| Track | Dataset | Access | Role |
|---|---|---|---|
| Primary | LINK, DANDI 001201 | https://chesteklab.github.io/LINK_dataset/ | Longitudinal NHP finger decoding, drift and recalibration |
| Supporting fMRI | Natural Scenes Dataset | https://naturalscenesdataset.org/ | Experimental-design reconstruction and BOLD encoding/decoding |
| Supporting speech | Willett et al. 2023 speech neuroprosthesis data | https://doi.org/10.5061/dryad.x69p8czpq | Decoder-only vs language-model-assisted speech analysis |
| Optional benchmark context | FALCON M2 | https://snel-repo.github.io/falcon/datasets.html | Finger-control benchmark comparison if time allows |

## Planned Directory Structure

```text
project-2-neural-decoding/
├── README.md
├── configs/
│   ├── link_primary.yaml
│   ├── splits.yaml
│   └── metrics.yaml
├── docs/
│   ├── data_access.md
│   ├── dataset_provenance.md
│   ├── leakage_and_splits.md
│   └── limitations.md
├── data/
│   ├── raw/                  # gitignored public dataset downloads
│   ├── interim/              # gitignored converted arrays
│   └── metadata/             # small committed shape/provenance outputs
├── notebooks/
│   ├── 01_link_explore.ipynb
│   ├── 02_link_baselines.ipynb
│   ├── 03_link_drift.ipynb
│   ├── 04_link_recalibration.ipynb
│   ├── 05_nsd_design.ipynb
│   └── 06_speech_decoder_audit.ipynb
├── src/
│   ├── data/
│   │   ├── load_link.py
│   │   ├── load_nsd.py
│   │   └── load_speech.py
│   ├── models/
│   │   ├── baselines.py
│   │   ├── gru.py
│   │   └── latent_model.py
│   ├── analysis/
│   │   ├── drift.py
│   │   ├── recalibration.py
│   │   └── manifold.py
│   └── figures/
│       └── plotting.py
├── results/
│   ├── tables/
│   └── figures/
├── tests/
│   ├── test_splits.py
│   └── test_metrics.py
└── requirements.txt
```

## Primary Metrics and Baselines

| Track | Metric | Baseline | Required limit |
|---|---|---|---|
| LINK within-session | Held-out kinematic R2, RMSE/MAE | Mean/last-value predictor and ridge/Kalman-style decoder | NHP motor decoding only |
| LINK cross-session | Degradation from source-session decoder to later sessions | Session-1 no-recalibration decoder | Performance drift does not identify a single biological cause by itself |
| LINK recalibration | Delta after fixed target-session sample budget | No-recalibration and full-retrain reference | Recalibration gain is protocol-specific |
| LINK learned representations | Gain from GRU/LFADS-lite/autoencoder representations | Ridge/Kalman-style and GRU baselines | No SOTA claim unless benchmarked fairly |
| NSD fMRI | ROI encoding R2 or category decoding accuracy | Shuffled-label/ROI null | BOLD is indirect and slow |
| Speech | Decoder-only WER/CER/phoneme error plus post-LM error | Chance/simple decoder and decoder-only output | LM output is not raw neural decoder performance |

## Key Dates

| Date | Milestone |
|---|---|
| June 5, 2026 | LINK primary dataset and single question locked |
| June 12, 2026 | Data access notes, shape/metadata output and baseline metric definitions |
| June 19, 2026 | First plotted/measured Project 2 result |
| July 10, 2026 | LINK motor/neural-population track must stand alone |
| August 7, 2026 | Feature freeze |
| August 14, 2026 | Results freeze |
| August 21, 2026 | Public package freeze |

## Week 1 Definition of Done

This skeleton is complete when it defines the primary dataset, single question, honest limits, planned structure, metrics, baselines and dates. It intentionally does not claim any analysis result before data loading and baseline runs exist.
