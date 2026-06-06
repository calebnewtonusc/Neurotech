# Project 2 — Neural Decoding & Brain-State Modeling Lab

> Three public-data sub-studies that hit Neuralink qualifications directly. No hands-on recording. Honest about what we analyzed and what we did not collect.

**Status:** Skeleton (Week 1) — structure only, no analysis yet
**Dataset lock:** June 5, 2026
**Primary-track protection:** July 10, 2026

---

## What this project is

Three mandatory sub-studies using publicly available neural datasets:

1. **NHP Motor Decoding** — Perich & Miller 2018 (CRCNS MC_Maze): intracortical finger-movement decoding under neural drift, with recalibration analysis.
2. **Human Speech Decoding** — Willett et al. 2023 (*Nature*): phoneme → word → sentence decoding from intracortical spiking with LLM-assisted correction.
3. **Human fMRI** — Allen NSD 2022: voxel encoding models and experimental-design reconstruction from 7T BOLD responses.

**We did not collect any of this data. We analyzed publicly available datasets. Every figure must cite the original source.**

---

## What it proves

- Neural drift causes measurable decoding degradation; recalibration recovers it
- Cross-session manifold alignment reduces drift-related error
- Intracortical phoneme-level speech decoding is above chance; LLM correction is separable from decoder quality
- fMRI BOLD encodes image identity in visual cortex; experimental design is reconstructable

## Honest limits

- No hands-on invasive recording — public data only
- Sub-study 1: NHP (macaque) only; does NOT generalize to humans by default
- Sub-study 2: Single participant with ALS; does NOT generalize to healthy population
- Sub-study 3: BOLD ≠ spiking; cannot decode moment-to-moment cognition
- LLM correction gain must be reported separately from raw neural decoder WER
- We do NOT have real scanner access; fMRI sub-study is analysis + protocol reconstruction only

---

## Planned directory structure

```
project-2-neural-decoding/
├── README.md                        # This file
├── sub-study-1-nhp-motor/
│   ├── README.md
│   ├── data/                        # MC_Maze download (gitignored, large)
│   ├── notebooks/
│   │   ├──  01_explore_data.ipynb
│   │   ├── 02_baseline_decoder.ipynb
│   │   ├── 03_drift_analysis.ipynb
│   │   └── 04_recalibration.ipynb
│   └── results/
├── sub-study-2-speech/
│   ├── README.md
│   ├── data/                        # Willett 2023 download (gitignored)
│   ├── notebooks/
│   │   ├── 01_explore_data.ipynb
│   │   ├── 02_phoneme_decoder.ipynb
│   │   ├── 03_word_sentence_decoder.ipynb
│   │   └── 04_llm_correction.ipynb
│   └── results/
├── sub-study-3-fmri/
│   ├── README.md
│   ├── data/                        # NSD subset (gitignored, very large)
│   ├── notebooks/
│   │   ├── 01_explore_nsd.ipynb
│   │   ├── 02_encoding_model.ipynb
│   │   └── 03_design_reconstruction.ipynb
│   └── results/
└── shared/
    ├── utils.py                     # Shared preprocessing utilities
    └── plotting.py                  # Shared figure formatting
```

---

## Primary metrics by sub-study

| Sub-study | Primary metric | Baseline |
|---|---|---|
| NHP motor | Angular decoding error (deg) | No-recalibration decoder from session 1 |
| Speech | Word error rate (WER), phoneme accuracy | Chance decoder |
| fMRI | Voxel encoding model R² | Shuffled-label null |

---

## Datasets

| Sub-study | Dataset | DOI / Access |
|---|---|---|
| NHP motor | Perich & Miller 2018, CRCNS MC_Maze | https://doi.org/10.6080/K0H70CVX |
| Speech | Willett et al. 2023 | https://doi.org/10.5061/dryad.x69p8czpq (OSF) |
| fMRI | Allen NSD 2022 | https://naturalscenesdataset.org / AWS Open Data |

---

## Key dates

| Date | Milestone |
|---|---|
| Jun 5, 2026 | Dataset locked |
| Week 2 | Download NHP + speech data, run shape/metadata check |
| Week 3 | Baseline NHP decoder (no recalibration) |
| Week 4 | Drift analysis figure |
| Jul 10, 2026 | Motor/neural-population track must stand alone before fMRI work expands |
