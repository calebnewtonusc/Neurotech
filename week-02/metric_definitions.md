# Project 1 & Project 2 — Metric Definitions, Confounds, and Meaningful Improvement Thresholds

**Date:** 2026-06-11  
**Author:** Mark Lin  
**Task:** Identify possible confounds in each baseline; define what a meaningful improvement looks like.  
**Status:** Complete. This document is the single source of truth for metric definitions across both projects. Any figure caption, report table, or application bullet that cites a metric must use the definition given here.

---

## How to use this document

For each metric:
1. Read the exact definition — use it verbatim when computing and reporting.
2. Read the confounds — check all of them before interpreting any result.
3. Read the "meaningful improvement" threshold — do not call a result an improvement unless it meets this criterion.

A result that does not clear the meaningful-improvement bar is a *null result* or a *marginal result*. Both are valid findings; neither should be inflated.

---

# Part 1 — Project 1: Neuroadaptive Assistive Workstation

Project 1 compares a **no-prediction gesture-only baseline** (Protocol v1, Week 2) against future **prediction-assisted** conditions. All metrics below apply to baseline-mode sessions and will serve as the reference for all future comparisons.

---

## 1.1 Domain A (Command Selection) Metrics

### Command Selection Accuracy (CSA)

**Definition:**  
\[ \text{CSA} = \frac{\text{number of trials with outcome CORRECT}}{\text{total trials with outcome CORRECT or INCORRECT}} \times 100\% \]

Trials with outcome TIMEOUT, PARTICIPANT\_STOP, DEVICE\_FAULT, or SYNC\_FAULT are excluded from the denominator. They are reported separately as an exclusion count.

**Unit:** Percentage (0–100%).  
**Granularity:** Per block, per session, and per prompt ID.  
**Primary comparison:** Baseline CSA vs. prediction-assisted CSA in future weeks.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| Prompt familiarity | CSA may be higher in Block 3 than Block 1 for the same prompts due to within-session learning. | Always report Block 1 and Block 3 separately; do not pool across blocks without noting the practice effect. |
| Menu position of correct option | If the correct command is always in the same menu position across trials, participants may learn positional patterns rather than semantic content. | The trial table specifies randomized correct-option position per trial. Verify this in logs by checking that CORRECT responses do not cluster in one menu position. |
| Prompt ambiguity | A-01 ("Open the notes file") and A-05 ("Close the current window") have documented ambiguity (see `participant_walkthrough_notes.md`). | Report CSA with and without the flagged ambiguous prompts to show whether they disproportionately drive errors. |
| Developer vs. external participant | DEV\_SESSION data is from people who designed the system. Their CSA will overestimate what a naive participant would achieve. | Always label session\_type in any reported table. Never report DEV\_SESSION CSA without that label. |
| Input modality | SIMULATED input removes the motor noise and fatigue of real EMG. Simulated CSA is an upper bound on EMG CSA. | Report input\_modality for every session. Never mix SIMULATED and EMG data in the same accuracy table without a clear label. |

**What is a meaningful improvement?**  
A meaningful improvement from baseline is defined as a **≥ 10 percentage-point increase in CSA** that is consistent across ≥ 3 sessions. A single-session improvement of any magnitude is not sufficient — it could be noise, a favorable random prompt order, or a session with an unusually attentive participant.

Honest limit: With DEV\_SESSION data only (n=2), no statistical test of meaningful improvement is possible. The 10-point threshold is a practical criterion drawn from comparable switch-access and scanning AAC literature, where improvements of 10+ points are considered clinically meaningful. It will be re-evaluated with external participant data.

---

### Selection Latency

**Definition:**  
Time in milliseconds from trial prompt display (TRIAL\_START `trial_start_ts`) to confirmed final selection (TRIAL\_END `trial_end_ts`).

\[ \text{Latency}_{i} = t_{\text{end},i} - t_{\text{start},i} \quad \text{(milliseconds)} \]

**Summary statistic:** Median latency (not mean) because latency distributions are right-skewed. Report the 25th and 75th percentiles alongside the median.  
**Exclusions:** TIMEOUT trials (60 s cutoff) are excluded from latency distributions; report their count separately.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| Practice effects within session | Median latency typically decreases from Block 1 to Block 3 as participants learn the command vocabulary. H2 in `weekly_hypothesis.md` specifically predicts this. | Always report latency by block. Never report a single pooled session latency without noting block-level variation. |
| Menu scan time | In a scanning AAC interface, latency includes the time to scan through options. The number of options (5 per trial in Domain A) and scan rate interact to create a floor on achievable latency that is independent of intent decoding quality. | Document the scan rate and number of options presented per trial. If a future condition changes the option count, latency comparisons across conditions must control for this. |
| Device startup latency | On some hardware setups, the first trial of a session has higher latency due to software initialization. | Check whether Trial 1 of Block 1 is an outlier in every session. If so, flag it and consider excluding it from latency analyses or reporting it separately. |
| Clock precision | Timestamps are ISO 8601 with timezone. Sub-millisecond precision depends on the system clock and how the event is recorded. Any latency difference < 20 ms should be treated as noise. | Report the effective timestamp precision in the session notes. |

**What is a meaningful improvement?**  
A reduction in median selection latency of **≥ 500 ms** that is consistent across ≥ 3 sessions is considered meaningful. This threshold is based on the minimum perceptible response-time improvement for users of AAC devices (~400–600 ms per the AAC communication rate literature). A reduction below 20 ms is within clock precision noise and must not be reported as an improvement.

---

### Re-request Rate

**Definition:**  
\[ \text{Re\text{-}request rate} = \frac{\text{sum of } \mathtt{rerequest\_count} \text{ across all trials}}{\text{total trials}} \]

**Interpretation:** Fraction of trials on which the participant needed the prompt re-read. High re-request rate indicates prompt ambiguity or working memory load in the current trial.  
**Note:** Protocol v1 allows at most 1 re-request per trial; any trial with `rerequest_count = 1` is counted once.

**Confounds:**  
Re-request rate reflects both prompt clarity and participant attentiveness. In DEV\_SESSION runs, re-request rate will likely be near zero because the developers know the prompts. This makes re-request rate nearly uninformative for internal sessions — it becomes useful only with external participants. Report it but note this limit.

**What is a meaningful improvement?**  
Not defined for baseline — re-request is a quality indicator, not a primary optimization target. A value > 0.15 (more than 1 in 7 trials requiring a re-read) in external participant sessions would indicate a prompt clarity problem requiring protocol revision.

---

## 1.2 Domain B (Text Entry) Metrics

### Character Error Rate (CER)

**Definition:**  
\[ \text{CER} = \frac{S + I + D}{N} \]

Where:
- S = number of character substitutions (wrong character selected)
- I = number of insertions (extra character selected)
- D = number of deletions (character skipped)
- N = number of characters in the target string

CER is computed via edit distance (Levenshtein distance) between the participant's entered string and the target string, normalized by target length.  
**Range:** 0 (perfect) to > 1 (possible if many insertions). CER > 1 should be flagged as a data quality issue.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| Special character availability | Trials B-04, B-06, B-09 include colons and periods. If these are harder to access in the interface (require extra navigation steps), CER for these trials reflects UI friction, not intent-decoding error. | Report CER separately for punctuation-including trials (B-04, B-06, B-09) vs. letter-only trials (B-01, B-02, B-03, B-07, B-08, B-10). Do not pool them unless the character-access path has been equalized. |
| Target string length | Longer strings have more opportunities for error regardless of per-character accuracy. CER normalizes by length, but in small samples (n=10 trials), one extra error on a short string inflates CER more than the same error on a long string. | Report target length per trial. Note that B-04 and B-09 (15 chars) are more robust to single-error noise than B-01 and B-03 (11 chars). |
| Working memory load | Entering "file: notes.txt" requires holding a specific string in memory for longer than "hello world." CER may reflect memory capacity rather than motor accuracy. | This is an intended feature of Domain B design (some trials are harder by design). Note which trials involve domain-specific syntax (filenames, colons) vs. common phrases. |
| Simulated vs. EMG input | Simulated input removes motor noise. SIM CER is a lower bound on real EMG CER. | Label every CER value with the input modality. Never compare SIM and EMG CER directly in the same table without clearly marking them as different conditions. |

**What is a meaningful improvement?**  
A reduction in mean CER of **≥ 0.10** (10 percentage points) that is consistent across ≥ 3 sessions is considered meaningful. This corresponds to roughly 1–2 fewer character errors per 10-character entry, which represents a practical gain in communication efficiency.

For context: CER of 0.05–0.10 is common in well-designed scanning AAC baselines; CER > 0.30 in baseline is a signal that the interface has usability problems that must be fixed before any predictive-assistance comparison is meaningful.

---

### Time-to-Completion (TTC)

**Definition:**  
Time in milliseconds from trial prompt display to confirmed entry of the final character:

\[ \text{TTC}_{i} = t_{\text{end},i} - t_{\text{start},i} \]

**Summary statistic:** Median TTC (not mean) due to right-skewed distribution. Report per-trial TTC for B-04/B-06/B-09 separately.  
**Exclusions:** TIMEOUT\_TEXT trials (5-minute block timeout) are excluded from TTC distributions; report their count.

**Confounds:** Same as CER — interface navigation time for special characters inflates TTC for B-04, B-06, B-09 independently of typing accuracy. Always report whether TTC differences between trials correlate with character-set navigation requirements.

**What is a meaningful improvement?**  
A reduction in median TTC of **≥ 20%** relative to baseline that is consistent across ≥ 3 sessions. A 20% threshold is used (rather than an absolute millisecond value) because TTC baseline varies substantially across trial types (B-03 "hello world" is faster than B-09 "attach: log.csv" regardless of interface quality).

---

## 1.3 User Burden Metrics (Effort Ratings)

### Physical Effort (Q1) and Mental Demand / Frustration (Q2)

**Definition:**  
Self-reported ratings on 1–7 Likert scale, recorded once per block immediately after the final trial. Fields: `effort_physical` (Q1) and `effort_mental` (Q2) in the BLOCK\_EFFORT log event.

**Note on Q2 split:** `participant_walkthrough_notes.md` (2026-06-09) recommended splitting Q2 into Q2a (cognitive load) and Q2b (frustration). If the logging schema v1.1 adopts this split, the metric below applies separately to both sub-questions.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| Response scale anchoring | Participants may use different parts of the 1–7 scale depending on their prior experiences. A "4" from one person may equal a "3" or "5" from another. | Do not compare absolute ratings across participants. Compare within-participant across conditions (baseline vs. prediction-assisted). |
| Order effects | Block 2 and Block 4 ratings are influenced by Blocks 1 and 3 experience. Post-session ratings may reflect fatigue as much as the current block. | Always report ratings by block index, not pooled. Use within-participant block-to-block comparisons. |
| Demand characteristics | Participants who know the study goal (measuring effort) may rate effort lower when they feel the system is "supposed" to be easy, inflating apparent improvement. | In DEV\_SESSION runs, demand characteristics are especially high (the developers know the hypothesis). External participant ratings are more reliable. |

**What is a meaningful improvement?**  
A reduction of **≥ 1.5 scale points** in mean effort rating that is consistent across ≥ 3 sessions and across both domain types. This threshold is drawn from the NASA-TLX literature where 1–1.5 scale points on a similar scale represents the minimum difference detectable by participants as subjectively noticeable.

---

# Part 2 — Project 2: Neural Decoding & Brain-State Modeling Lab

Project 2 uses **chance baselines and linear-model baselines** as the reference against which any learned or stronger model must be evaluated. All three mandatory sub-studies share the same baseline-first evaluation logic.

---

## 2.1 NHP Finger-Movement Decoding (FALCON M2)

### Velocity R² (Coefficient of Determination)

**Definition:**  
\[ R^2 = 1 - \frac{\sum_t (y_t - \hat{y}_t)^2}{\sum_t (y_t - \bar{y})^2} \]

Where y_t = true finger velocity at time t, ŷ_t = decoder prediction, ȳ = mean true velocity over the held-out test set.  
**Computed separately for each of the 2 kinematic DOFs.** Report both; do not average DOF-level R² without noting the per-DOF values.  
**Dataset:** FALCON M2 (public NHP intracortical). Test set must be held out and never used in model selection.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| Mean-predictor baseline | R² of a predictor that always outputs ȳ = 0 by definition. Any model with R² ≤ 0 is no better than predicting the mean — it is not a working decoder. | Always report the mean-predictor R² (always 0) explicitly so readers understand the floor. |
| Train/test leakage | If test-set statistics (mean, variance) are used to z-score features before splitting, test performance is inflated. | All normalization parameters must be computed on the training set and applied to the test set. Document this in any notebook. |
| Cross-session vs. within-session evaluation | A decoder trained and tested within the same session will always outperform a decoder tested on a different session. The interesting scientific question is cross-session generalization under neural drift. | Always clearly label whether an R² is within-session or cross-session. Never compare within-session and cross-session R² in the same row of a table without a label. |
| Bin size | R² depends on the temporal resolution of the prediction. Finer bins (10 ms) have lower R² than coarser bins (100 ms) because fine-timescale noise is harder to predict. | Report bin size alongside every R² value. |
| Hand-selected vs. all-channel decoding | If dead channels are excluded from training, decoder R² reflects only the surviving electrodes. This must be noted so a declining R² across sessions can be attributed to electrode loss, not model failure. | Report the number of channels used in each session's decoder. |

**What is a meaningful improvement over the linear baseline?**  
A **≥ 0.05 increase in R²** (5 percentage points) that is consistent across ≥ 3 test sessions is considered a meaningful improvement over a ridge-regression linear baseline. This threshold is drawn from published FALCON benchmark results where R² differences of 0.03–0.05 are cited as meaningful in the NHP motor decoding literature.

**Honest limit:** R² is bounded above by the noise ceiling — even a perfect neural decoder cannot exceed the R² imposed by trial-to-trial variability in the neural signal. We do not have the noise ceiling for M2; treat any R² > 0.7 as requiring verification.

---

## 2.2 Human Intracortical Speech Decoding (FALCON T17)

### Phoneme Error Rate (PER)

**Definition:**  
\[ \text{PER} = \frac{S + I + D}{N_{\text{phonemes}}} \]

Where substitutions, insertions, deletions are computed via edit distance between the predicted phoneme sequence and the ground-truth `cue` phoneme sequence.  
**Always report decoder-only PER alongside LLM-corrected PER.** Never report only the LLM-corrected value — this hides the neural decoder's actual performance. The LLM correction is a post-processing step, not part of the neural decoder.

### Word Error Rate (WER)

**Definition:**  
Same edit-distance formula applied at the word level (words as atomic units rather than phonemes).

\[ \text{WER} = \frac{S_w + I_w + D_w}{N_{\text{words}}} \]

Report WER before and after LLM correction, separately.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| Closed-vocabulary vs. open-vocabulary | PER/WER on a closed vocabulary (10–50 words) is much lower than on open vocabulary. FALCON T17 includes both conditions. | Always specify vocabulary type (closed / open) for every PER/WER value. Never report closed-vocabulary accuracy as representative of real-world speech decoding. |
| LLM over-correction | A strong language model can reconstruct plausible sentences from nearly random inputs by using language priors, completely masking a broken neural decoder. | Report the LLM "pass rate" (fraction of outputs changed by LLM correction) alongside WER. A high pass rate + large WER improvement suggests the LLM is compensating for, not assisting, the neural decoder. |
| Session-to-session drift | Neural signal quality changes over the recording period. PER/WER on early sessions may not be representative of later sessions. | Report PER/WER per session and plot it against session date. |
| Chance baseline for closed vocabulary | For a 10-word vocabulary, random guessing gives WER ≈ (1 - 1/10) = 0.90 on single-word trials. Always include this chance baseline in any results table. | Compute and report chance WER explicitly. |

**What is a meaningful improvement over the linear baseline?**  
A **≥ 15 percentage-point reduction in WER** relative to the linear (logistic regression on binned spike counts) baseline that is consistent across ≥ 3 test sessions. For PER, the threshold is **≥ 10 percentage points** (PER is finer-grained than WER and smaller differences can be real).

**Honest limit:** These thresholds are adapted from published BCI speech decoding benchmarks. They are working criteria for this project, not established standards. Any improvement claim should be accompanied by the raw confusion matrix.

---

## 2.3 Human fMRI — NSD Encoding/Decoding (NSD)

### Noise-Ceiling-Normalized Encoding Accuracy (r²/ncsnr²)

**Definition:**  
For encoding models (predict voxel BOLD response from image features):

\[ r_{\text{normalized}} = \frac{r^2_{\text{model}}}{r^2_{\text{noise\ ceiling}}} \]

Where r²\_model is the squared Pearson correlation between model predictions and held-out BOLD betas, and r²\_noise\_ceiling is the theoretical maximum predictable variance given the test-retest reliability (`ncsnr`) of that voxel.

**Why noise-ceiling normalization matters:** Raw encoding accuracy is an unfair comparison if some voxels are simply noisier than others. Noise-ceiling normalization asks: "Given how reliable this voxel is, how much of its explainable variance does our model capture?" A normalized r of 1.0 = perfect, given noise.

**Confounds:**
| Confound | Description | Control |
|----------|-------------|---------|
| ROI selection bias | Reporting encoding accuracy only for high-ncsnr ROIs inflates apparent model quality. | Always report the fraction of voxels in each ROI with ncsnr above the analysis threshold. |
| Image feature choice | Encoding accuracy depends heavily on the image feature space used (AlexNet, CLIP, pixel). Different feature spaces capture different aspects of perception. | Always specify the feature space. Do not compare encoding accuracies across feature spaces without noting the difference. |
| Train/test leakage in NSD | NSD has a specific train/test image split (shared test images shown 3× to all subjects). Use only the official split. | Document which images are in the test set. Never include test images in the training set for ANY model trained on NSD. |
| Session effects | BOLD signal drifts within and across sessions. Encoding models trained on early sessions may perform worse on late sessions. | Report whether encoding accuracy changes as a function of session number for each subject. |

**What is a meaningful improvement over a linear baseline?**  
A **≥ 0.05 increase in mean noise-ceiling-normalized r** in early visual cortex (V1–V3) that is consistent across ≥ 3 subjects. Early visual cortex is the most reliable ROI and the best-understood region; if a model cannot improve over a linear baseline here, it will not generalize to higher areas.

**Honest limit:** We do not have real scanner access. Our fMRI work is a reconstruction and analysis of public data. "Encoding accuracy" here means "how well a model trained on NSD public betas predicts held-out NSD public betas." It does not constitute scanner experience and must not be described as such.

---

## 3. Cross-project confound: Overfitting to baseline conditions

**Applies to all three sub-studies.** A model optimized on the specific sessions and participants in the baseline sample may not generalize to new sessions or participants. The project plan includes:
- Week 9: multi-session generalization test for Project 1
- FALCON cross-session evaluation for Project 2 M2 and T17
- Cross-subject NSD generalization

**Rule:** Do not report a metric as "the model's performance" without specifying exactly which sessions were in the training set and which were held out. If a session is both in the training set and the test set, the metric is inflated by construction.

---

## 4. Summary table: Meaningful improvement thresholds

| Project | Metric | Baseline type | Meaningful improvement threshold | Minimum sessions required |
|---------|--------|--------------|----------------------------------|--------------------------|
| P1 Domain A | CSA (%) | Gesture-only baseline | ≥ 10 pp increase | 3 |
| P1 Domain A | Selection latency (ms) | Gesture-only baseline | ≥ 500 ms reduction in median | 3 |
| P1 Domain B | CER | Gesture-only baseline | ≥ 0.10 reduction | 3 |
| P1 Domain B | TTC (%) | Gesture-only baseline | ≥ 20% reduction in median | 3 |
| P1 Both | Effort rating (1–7) | Gesture-only baseline | ≥ 1.5 scale points reduction | 3 |
| P2 M2 | Velocity R² | Ridge regression + mean | ≥ 0.05 increase | 3 sessions |
| P2 T17 | WER (%) | Logistic regression | ≥ 15 pp reduction | 3 sessions |
| P2 T17 | PER (%) | Logistic regression | ≥ 10 pp reduction | 3 sessions |
| P2 NSD | Normalized r | Linear encoding model | ≥ 0.05 increase in V1–V3 | 3 subjects |

**pp = percentage points.** All thresholds are working criteria for this project, not established field standards. They should be reviewed at the Week 7 mid-summer review.

---

## 5. What this document does NOT define

- It does not define the statistical tests to use (those depend on the sample size available at the time of analysis, which is not yet known).
- It does not pre-register p-value thresholds (this is a student research project, not a clinical trial; the focus is on effect sizes and consistency).
- It does not define metrics for the continual-learning side (Research 1–5) — those require separate metric definitions when the benchmark harness is built.
