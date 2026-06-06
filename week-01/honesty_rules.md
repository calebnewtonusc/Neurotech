# Honesty Rules — Neurotech Summer 2026

**Date:** June 5, 2026
**Author:** Mark Lin
**Applies to:** All projects, all write-ups, all figures, all external communications

> These rules exist because one overclaim destroys the credibility of everything else. A skeptical expert reviewer — the only reviewer that matters — will catch it immediately and stop reading.

---

## Rule 1: Always state what the signal actually measures

| If you used... | You MUST write... | You must NOT write... |
|---|---|---|
| Surface EMG | “EMG measures forearm muscle electrical activity” | “Brain signals”, “neural activity”, “BCI” |
| EEG | “Scalp EEG measures aggregate cortical field potentials” | “Spiking activity”, “neuron firing” |
| fMRI BOLD | “BOLD signal reflects hemodynamic response, not spiking” | “Neural activity” without qualifier |
| Intracortical array | “Threshold crossings from a 96-ch Utah array in M1” | “Full brain activity”, “thoughts decoded” |

---

## Rule 2: State honest limits next to every claim

Every result section must include a **Limitations** subsection. No exceptions.

Format:
```
**Claim:** [What the result shows]
**Honest limit:** [What it does NOT show; what would need to be true for a stronger claim]
```

Example (correct):
> **Claim:** The EMG decoder achieves 91% gesture-classification accuracy across 5 sessions.
> **Honest limit:** This is muscle-activity classification, not intent or neural decoding. Performance was measured on a single participant. Generalization to other users requires separate validation.

Example (incorrect, do not do this):
> “Our BCI achieves 91% accuracy, demonstrating robust neural decoding.”

---

## Rule 3: LLM correction must not hide decoder error

For sub-study 2 (speech decoding), the pipeline is: neural decoder → phoneme sequence → LLM language-model correction → final word output.

**Required reporting:**
- Neural decoder WER (before LLM correction)
- Post-LLM WER (after correction)
- Both numbers must appear in every figure, table, and abstract
- Delta between them must be explicitly labeled as “LLM correction gain”, NOT as “decoder performance”

**Prohibited:**
- Reporting only post-LLM numbers as the decoder’s performance
- Describing LLM-corrected output as “neural decoding accuracy”

---

## Rule 4: Simulated data is always labeled as simulated

If MindRove hardware fails and we fall back to simulated EMG:
- Every figure caption: “(simulated input)”
- Every table header: “Sim” column flag
- Abstract and methods: first paragraph of Data section must state simulation was used
- No figure or table may mix real and simulated data without explicit visual distinction

---

## Rule 5: Public data is not your data

For Project 2 (NHP motor, speech, fMRI), all datasets are third-party public releases.

**Required:**
- Cite the original paper and dataset DOI in every figure that uses the data
- Methods section must state: “We analyzed publicly available data from [citation]. We did not collect this data.”
- Do not use possessive language (“our recordings”, “our participants”)

**Correct:** “We analyzed intracortical recordings from Perich & Miller 2018 (CRCNS MC_Maze).”
**Incorrect:** “We recorded spiking activity from macaque motor cortex.”

---

## Rule 6: Baselines are mandatory

No decoding result is reportable without a baseline. Required baselines by project:

| Project | Baseline |
|---|---|
| Project 1 (EMG) | Gesture-only control (no EMG decoder) |
| Project 2 NHP motor | No-recalibration decoder from session 1 |
| Project 2 Speech | Chance decoder (random phoneme assignment) |
| Project 2 fMRI | Shuffled-label null model |
| All continual learning | Naïve fine-tuning (no continual learning method) |

A result that beats chance but not a reasonable baseline is a null result and must be reported as such.

---

## Rule 7: Do not conflate modalities

These are NOT interchangeable terms:

- **Spike** (single action potential, ~1 ms) ≠ **LFP** (local field potential, ~10–100 ms) ≠ **EEG** (~4 ms temporal resolution, scalp) ≠ **BOLD** (~2 s hemodynamic lag)
- **EMG** (peripheral muscle) ≠ **EEG** (cortical surface) ≠ **intracortical** (implanted)
- **Brain activity** (requires intracranial measurement) ≠ **muscle activity** (EMG)

If you are unsure which term is correct, leave a `TODO: verify terminology` comment and ask before submitting.

---

## Rule 8: Pre-register before you run

For Project 1 experiments: write the hypothesis, expected effect size, primary metric, and stopping rule BEFORE running the experiment. Save it in `experiments/preregistration/`. Once saved, it cannot be edited retroactively.

Post-hoc analysis is permitted but must be clearly labeled “exploratory” and cannot be listed as a primary result.

---

## Enforcement

Before any external submission (paper, application, report):
1. Both Caleb and Mark must read the relevant sections against these rules
2. Any violation blocks submission until corrected
3. “It sounds better” is not justification for an overclaim
4. When in doubt, understate. A measured honest claim is always defensible.
