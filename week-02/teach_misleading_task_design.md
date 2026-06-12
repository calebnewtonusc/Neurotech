# How Task Design Can Accidentally Produce Misleading Performance

**Type:** Teaching artifact  
**Date:** 2026-06-12  
**Author:** Mark Lin  
**Audience:** Caleb and Mark — use this as a reference when designing experiments, interpreting results, and writing up findings for Project 1 and Project 2.  
**Companion documents:** `week-02/metric_definitions.md`, `week-02/protocol_v1.md`, `week-02/trial_table.md`

---

## Why this matters for this project

Every result we report has to survive a skeptical reviewer. A skeptical reviewer does not ask "is the number large?" They ask "could the number be large for the wrong reason?" This document is a catalogue of the wrong reasons — design choices that inflate apparent performance without any real improvement in the thing we care about.

The goal is not to be paralyzed by these risks. The goal is to be able to say, for every result we report: "We considered this confound and here is what we did about it."

---

## Part 1 — The hierarchy of misleading design

Not all misleading results are equally bad. This hierarchy goes from the most severe (corrupts the conclusion entirely) to least severe (reduces confidence but doesn't reverse the conclusion).

```
Level 1 — DATA CONTAMINATION
  └─ Test data leaked into training; labels derived from the prediction target.
     Result: Completely invalid. No interpretation possible.

Level 2 — BASELINE MISMATCH
  └─ The thing you're comparing against is not actually the appropriate reference.
     Result: You beat the wrong baseline. Improvement claim is meaningless.

Level 3 — POPULATION MISMATCH
  └─ The participants / sessions / conditions you evaluated on are systematically
     different from the ones you care about.
     Result: The number is real but doesn't generalize to the claim.

Level 4 — MEASUREMENT CONFOUND
  └─ A design feature co-varies with the performance metric, so high scores
     reflect the feature, not the model.
     Result: The number is real but means something other than what you think.

Level 5 — REPORTING SELECTION BIAS
  └─ You ran many conditions or analyses and only reported the best one.
     Result: The number is real in that condition, but expected by chance.
```

**Rule:** Level 1–2 errors must be corrected before any result is reported. Level 3–4 errors must be disclosed as limitations even when corrected for. Level 5 errors must be pre-empted by pre-registration (which is what `weekly_hypothesis.md` is for).

---

## Part 2 — Task design errors with concrete examples from this project

### 2.1 The baseline is easier than the treatment, not equal

**What happens:** You design a baseline condition that is systematically harder to use than the treatment condition — for reasons unrelated to what you're testing. The treatment looks better simply because the baseline was worse by construction.

**Project 1 example:**  
Suppose the baseline (gesture-only) interface shows 5 commands on screen in a fixed, hard-to-read layout, but the prediction-assisted interface shows 3 commands (because the model filters out unlikely ones) in a cleaner layout. The prediction-assisted condition will show lower latency and higher accuracy — but you cannot tell whether that's because prediction is useful or because 3 options are faster to scan than 5 options.

**How to prevent it:**  
- Hold constant: number of options displayed, font size, screen layout, scan rate.
- Only vary: whether prediction narrows the option set.
- If the interface must show fewer options in the prediction condition, run a separate "reduced options, no prediction" control to isolate the option-count effect.

**Correct framing:** "The prediction-assisted condition improved CSA by 12pp. The baseline and prediction conditions had the same number of options and scan rate; the only difference was prediction."

**Incorrect framing:** "The prediction-assisted condition improved CSA by 12pp." (Without noting that the interface also changed in other ways.)

---

### 2.2 Practice effects are attributed to the intervention

**What happens:** Participants improve over time simply because they are learning. If the baseline is always run first and the treatment is always run second, any improvement could be practice, not treatment.

**Project 1 example:**  
If every session runs Domain A baseline first and prediction-assisted second, Block 3 and Block 4 will always have lower latency than Block 1 and Block 2. This is partly because participants learned the command vocabulary (H2 in `weekly_hypothesis.md` predicts this). If we then compare Block 1 (baseline) to Block 4 (prediction-assisted), we will overestimate the treatment effect.

**How to prevent it:**  
- Counterbalance condition order across sessions: half of sessions run baseline first, half run prediction-assisted first.
- Alternatively, use within-session block-level comparisons where baseline and treatment blocks are interleaved.
- For this project's Week 2 DEV\_SESSIONs (baseline only), always report latency by block index, not pooled.

**Correct framing:** "Across counterbalanced sessions, the prediction-assisted condition reduced median latency by 620ms (IQR: 490–750ms) compared to baseline, with no evidence of order effects (prediction-first vs. baseline-first sessions showed similar differences)."

**Incorrect framing:** "Participants were faster in the prediction condition." (Without establishing that order effects are not driving this.)

---

### 2.3 Evaluation items are too similar to training items

**What happens:** The test set contains items that are semantically or structurally similar to items in the training set. The model memorizes patterns that happen to apply to test items, not because it learned the underlying task.

**Project 2 — NSD example:**  
NSD has a specific official train/test image split. If we accidentally include test images in our training set (e.g., by using a random split instead of the official one), our encoding model will "see" the test images during training and encode their statistics. Held-out accuracy will be inflated.

**Project 2 — T17 speech example:**  
If we train a phoneme decoder on all sessions and test on a random 20% of trials drawn from the same sessions, the decoder may learn session-specific normalization artifacts (e.g., time-of-day electrode drift patterns) that help it on held-out trials from the same session but would not transfer to a new session.

**How to prevent it:**  
- Use the NSD official train/test split without modification.
- For T17 and M2: always evaluate cross-session (train on sessions 1–N, test on session N+1 or later). Within-session held-out results can be reported as a secondary analysis, labeled explicitly.
- Before training any model: print the shape of train and test sets and verify no `session_id` or `stim_id` appears in both.

**Correct framing:** "Cross-session WER was 0.32 (trained on sessions 1–8, tested on sessions 9–12). Within-session WER (random 80/20 split) was 0.19 — the gap reflects the cross-session generalization challenge, not model quality on familiar data."

**Incorrect framing:** "Our model achieved WER of 0.19." (Without specifying whether this is within-session or cross-session.)

---

### 2.4 The metric is optimized by a degenerate solution

**What happens:** The metric you chose can be maximized by a trivially simple predictor that doesn't do what you actually want.

**Project 2 — M2 R² example:**  
R² is 0 for a mean predictor and can be negative for a bad model. But for a kinematic signal with strong temporal autocorrelation (finger velocity is smooth — velocity at time t+1 is similar to velocity at time t), a predictor that simply returns the previous time step's velocity ("persistence predictor") may achieve R² of 0.6 or more without using any neural information at all.

**Project 1 — CSA example:**  
If one command (e.g., SAVE\_DOC) is presented much more frequently than others, a model that always predicts SAVE\_DOC will achieve high CSA on that command. Overall CSA looks good but the model has learned nothing useful.

**How to prevent it:**  
- For M2: always compute and report the persistence-predictor R² alongside the mean-predictor R² and our model's R². If our model does not beat the persistence predictor, it is not a useful decoder.
- For Project 1: report per-command accuracy, not just overall CSA. A confusion matrix shows whether high overall accuracy hides a degenerate solution.
- For T17: report per-phoneme accuracy. A decoder that always predicts the most common phoneme will have high accuracy on that phoneme and low overall WER only if it's "lucky" about which phonemes appear in the test set.

**Correct framing:** "The ridge decoder achieved R² = 0.61. The persistence predictor (previous-timestep velocity) achieved R² = 0.58. Our decoder's marginal improvement over the persistence baseline is small; the GRU decoder (R² = 0.71) provides a larger and more meaningful gain."

**Incorrect framing:** "Our decoder achieved R² = 0.61, a strong result." (Without noting the persistence predictor achieves 0.58 with zero neural information.)

---

### 2.5 The stopping rules inflate accuracy

**What happens:** If a participant or system can "give up" on hard trials (time out or skip), reported accuracy only reflects the easy trials the system successfully completed — hard trials are censored from the metric.

**Project 1 example:**  
Protocol v1 has a 60-second timeout for Domain A trials. If the prediction-assisted condition reduces the timeout rate (because the model suggests the right command early) while the baseline has more timeouts, and we exclude timed-out trials from both conditions' CSA calculation, the baseline CSA is computed over a harder subset of trials than the prediction-assisted CSA. The comparison is unfair.

**How to prevent it:**  
- Always report the timeout rate alongside accuracy. If timeout rates differ between conditions, the accuracy comparison requires a correction.
- Report a "completion-rate-adjusted accuracy" = CSA × completion rate (where completion rate = non-timed-out trials / total trials). This metric penalizes a condition that only looks accurate because it abandoned hard trials.

**Correct framing:** "Baseline CSA was 84% on completed trials (completion rate: 91%). Prediction-assisted CSA was 89% on completed trials (completion rate: 97%). Completion-rate-adjusted accuracy: baseline 76%, prediction-assisted 86%."

**Incorrect framing:** "CSA improved from 84% to 89%." (When the improvement is partly driven by fewer timeouts, not better accuracy.)

---

### 2.6 The evaluation population doesn't match the use case

**What happens:** You run experiments on people who are already familiar with the interface (developers), or on a convenient population (students), and report performance as if it applies to the intended users (people with motor impairments).

**Project 1 example:**  
All Week 2–4 sessions are DEV\_SESSION runs. Mark and Caleb know the command vocabulary, the interface layout, and what the system is "supposed" to do. They will have lower latency, higher accuracy, and lower effort ratings than naive participants. Any result from DEV\_SESSION runs must be clearly labeled as developer testing, not user evaluation.

**How to prevent it:**  
- Label every data point with `session_type` (DEV\_SESSION vs. PARTICIPANT\_SESSION).
- Never report DEV\_SESSION results as if they are user results.
- When the project is written up, DEV\_SESSION results can appear in a "system validation" section; participant results go in the main results section.

**Correct framing:** "Internal developer sessions (n=2) showed CSA of 94% and median latency of 1,240ms. These are system-validation results, not user-evaluation results; developer familiarity with the interface means these numbers overestimate naive-user performance."

**Incorrect framing:** "Participants achieved CSA of 94%." (When the "participants" are the people who built the system.)

---

### 2.7 The LLM corrects the neural decoder's errors — and you report only the corrected result

**What happens:** A language model post-processes the neural decoder's output and fixes many errors using language priors. If you only report the LLM-corrected WER, you are reporting the LLM's ability to autocorrect plausible English sentences, not the neural decoder's ability to decode neural signals.

**Project 2 — T17 speech example:**  
The neural decoder outputs a phoneme sequence that is a plausible but incorrect string: "th_ p_rs_n sp_k_". The LLM, seeing this pattern, outputs "the person spoke" — which happens to be the correct target. The WER is 0. But the neural decoder was wrong; the LLM saved it.

This matters because:
1. At faster or more novel sentences, the LLM's autocorrect ability degrades.
2. The LLM can hallucinate plausible but incorrect corrections.
3. Reporting only LLM-corrected WER implies the neural decoder is better than it is.

**How to prevent it:**  
- Always report decoder-only WER and LLM-corrected WER as two separate rows in any results table.
- Compute and report the LLM pass rate (fraction of outputs the LLM changed).
- Run a "LLM-only" control: feed random phoneme noise to the LLM and measure WER. If LLM-only WER is not much worse than LLM+decoder WER, the decoder is contributing little.

**Correct framing:** "Decoder-only WER: 0.41. LLM-corrected WER: 0.28. LLM pass rate: 61% (of outputs modified). LLM-only control WER: 0.45. The LLM correction provides a meaningful 13pp improvement; the decoder-only result is the primary measure of neural decoding quality."

**Incorrect framing:** "Our speech decoder achieved WER of 0.28." (Without disclosing this is LLM-corrected.)

---

## Part 3 — Reference table: Design choices and their consequences

| Design choice | Misleading if... | What to do instead |
|---------------|-----------------|-------------------|
| Fixed condition order (baseline always first) | Practice effects exist | Counterbalance across sessions |
| Pooled accuracy (no per-class breakdown) | One class dominates | Always report per-class / per-command accuracy |
| Within-session train/test split | Session-specific patterns are learnable | Use cross-session splits as primary evaluation |
| Exclude timeouts from accuracy | Timeout rate differs across conditions | Report completion-rate-adjusted accuracy |
| Report LLM-corrected WER only | LLM compensates for decoder failures | Report decoder-only and LLM-corrected as separate rows |
| DEV\_SESSION data without label | Audience assumes external participants | Label session\_type on every reported result |
| Random train/test split on NSD | Test images seen during training | Use official NSD train/test split only |
| Mean predictor as the only baseline | Persistence predictor achieves high R² trivially | Report mean predictor AND persistence predictor baselines |
| One metric optimized | Degenerate solution maximizes it | Report a metric suite; include confusion matrices |
| No pre-registered hypothesis | Outcome cherry-picking | Lock hypotheses before data collection (see weekly_hypothesis.md) |

---

## Part 4 — Correct vs. incorrect result framing for this project

These are the patterns of language that are and are not acceptable in this project. Apply them to every figure caption, report section, slide, and application bullet.

### Command-selection accuracy

❌ **Incorrect:** "Our system achieved 91% accuracy."  
✅ **Correct:** "In DEV\_SESSION baseline-mode runs (n=2 developers, simulated input), command-selection accuracy was 91% (completed trials only; timeout rate 4%). This is a system-validation result; developer familiarity with the interface means these numbers overestimate naive-user performance."

### Neural decoder WER

❌ **Incorrect:** "Our speech decoder achieved WER of 0.24."  
✅ **Correct:** "The phoneme decoder achieved WER of 0.38 (decoder only) and 0.24 after LLM-assisted correction, evaluated cross-session on the public T17 FALCON intracortical speech dataset (analyzed, not recorded by us). The 14pp improvement reflects LLM language-model correction; the 0.38 baseline is the neural decoder's standalone performance."

### Encoding model accuracy (NSD)

❌ **Incorrect:** "Our encoding model achieves r = 0.72 in early visual cortex."  
✅ **Correct:** "Using the official NSD train/test split, the encoding model achieves mean noise-ceiling-normalized r = 0.72 in V1–V3 (averaged across 8 subjects), compared to r = 0.65 for a linear baseline. This analysis is of public 7T fMRI BOLD data; it is not real scanner experience and should not be described as such."

### Cross-session R²

❌ **Incorrect:** "The GRU decoder achieves R² = 0.71."  
✅ **Correct:** "In cross-session evaluation (trained sessions 1–8, held-out sessions 9–12) on FALCON M2 NHP intracortical data, the GRU decoder achieved R² = 0.71 per DOF (mean across 2 DOFs), compared to ridge regression R² = 0.61 and persistence predictor R² = 0.58. This is analysis of public NHP data; it is not hands-on primate recording experience."

---

## Part 5 — The single question to ask before reporting any result

> "If I removed the fancy part — the model, the prediction, the LLM — and replaced it with the simplest possible alternative, what would the number be?"

If the answer is "almost the same," the fancy part is not doing useful work. If the answer is "much worse," you have a real result — and you should be able to say both numbers in the same sentence.

This is the core of the honest-results standard that applies to everything in this project.
