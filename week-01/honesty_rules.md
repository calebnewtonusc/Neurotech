# Honesty Rules - Neurotech Summer 2026

**Date locked:** June 5, 2026
**Author:** Mark Lin
**Applies to:** Every README, memo, report, figure caption, demo script, resume bullet and interview answer

These rules are part of the research method. A precise limitation is not a weakness; it is what makes the claim believable.

## Rule 1 - Name the Signal Correctly

| Signal | What it measures | Honest phrase | Do not write |
|---|---|---|---|
| Simulated low-bandwidth input | Synthetic control events or noisy generated channels | "simulated low-bandwidth input" | "recorded EMG" or "neural data" |
| Surface EMG / sEMG | Muscle electrical activity at the skin | "forearm muscle activation measured by surface EMG" | "brain signal" |
| EEG | Aggregate scalp-level cortical field potentials | "non-invasive scalp EEG field potentials" | "spikes" |
| fMRI BOLD | Blood-oxygen hemodynamic response correlated with neural activity | "BOLD response" or "indirect fMRI measure" | "single-neuron activity" |
| ECoG | Electrical potentials from electrodes on the cortical surface | "cortical surface recording" | "non-invasive recording" |
| Intracortical array | Threshold crossings, spiking-band power or sorted spikes from implanted electrodes | "public intracortical recordings analyzed from [dataset]" | "our implanted recordings" |

## Rule 2 - Pair Every Claim With Its Limit

Use this format in results sections:

```text
Claim: [What the data supports.]
Honest limit: [What the data does not support yet.]
```

Correct:

```text
Claim: The simulated low-bandwidth harness completed the text-entry workflow faster with prediction assistance than with gesture-only control.
Honest limit: This is a simulated-input result. It does not establish real EMG performance or generalization to other users.
```

Incorrect:

```text
Our BCI understands intent and improves computer control.
```

## Rule 3 - Simulated Data Must Stay Visibly Simulated

If Project 1 uses simulated input:

- filenames include `simulated` or `sim`;
- figures include "(simulated input)" in the caption;
- tables include a `data_source` column;
- methods state the noise model, seed and command vocabulary;
- real and simulated results are never pooled without a visible source split.

## Rule 4 - Public Data Is Analyzed, Not Collected

Project 2 uses public datasets. Every methods section must say some version of:

```text
We analyzed publicly available data from [dataset and citation]. We did not collect these recordings, implant arrays, scan participants or run the original experiment.
```

Correct:

```text
We analyzed LINK intracortical recordings and finger kinematics from DANDI 001201.
```

Incorrect:

```text
We recorded macaque motor-cortex activity.
```

## Rule 5 - Baselines Are Required

| Workstream | Minimum baseline |
|---|---|
| Project 1 simulated harness | gesture-only or no-prediction control |
| Project 1 real EMG | chance classifier plus gesture-only control |
| LINK NHP movement | mean/last-value predictor plus ridge/Kalman-style decoder |
| Cross-session drift | session-1 no-recalibration decoder |
| Speech decoding | decoder-only error before any language model |
| fMRI NSD | shuffled-label or ROI null model |
| Continual learning | naive fine-tuning without replay or memory |

A model that beats chance but not a reasonable baseline is a real result, but it is not an improvement claim.

## Rule 6 - Language Models Cannot Hide Neural Decoder Errors

For speech decoding:

- report decoder-only phoneme/character/word error first;
- report language-model-assisted error second;
- label the difference as language-model correction gain;
- show at least several failures where the language model produced plausible text not supported by the neural decoder;
- never call post-LM text "raw neural decoding performance."

## Rule 7 - Do Not Stretch Experience Claims

Allowed:

- "Analyzed public intracortical datasets."
- "Built a closed-loop EMG or simulated-input assistive-control prototype."
- "Reconstructed an fMRI experimental design from NSD."
- "Compared baselines and learned representations under held-out splits."

Not allowed:

- "Collected invasive neural recordings."
- "Ran human fMRI scans."
- "Built an implanted BCI."
- "Worked with Neuralink hardware."
- "Decoded thoughts."

## Rule 8 - Modality Distinctions for Interviews

| If asked... | Answer |
|---|---|
| "Is Project 1 a brain-computer interface?" | It is BCI-inspired assistive control. The measured input is simulated low-bandwidth input first and surface EMG later; EMG is muscle activity, not brain activity. |
| "Did you record the NHP data?" | No. We analyzed public intracortical recordings and kinematics, with attribution to the dataset creators. |
| "Can fMRI decode thoughts?" | NSD supports visual response modeling and some stimulus/feature decoding from BOLD. It does not support moment-to-moment thought reading or spiking claims. |
| "Does the LLM make the speech decoder better?" | It can improve final text output, but decoder-only and LLM-assisted metrics must be reported separately. |
| "Does a brain-inspired memory module prove biology?" | No. It tests a computational analogy inspired by memory mechanisms; neuroscience claims require separate biological evidence. |

## Rule 9 - Cite Specific Dataset Sources

Use exact dataset names where possible:

- LINK: Long-Term Intracortical Neural Activity and Kinematics, DANDI 001201.
- Natural Scenes Dataset, Allen et al., 7T fMRI natural-scene responses.
- Willett et al. 2023 speech neuroprosthesis data, Dryad DOI 10.5061/dryad.x69p8czpq.
- FALCON datasets only with the correct task labels: H1 reach-and-grasp, H2 handwriting, M1 reach/grasp EMG, M2 monkey finger control, B1 songbird vocalization.

## Pre-Submission Checklist

Before any external artifact is shared:

- The signal name is correct.
- The data source is attributed.
- Simulated and real data are separated.
- The baseline appears next to the claimed improvement.
- The limitation appears next to the claim.
- Decoder-only and language-model-assisted speech metrics are separated.
- Caleb and Mark can both explain the claim without reading from the page.
