# Project 2 — QC Notebook Annotations: Variable Biological & Behavioral Meanings

**Date:** 2026-06-10  
**Author:** Mark Lin  
**Task:** Annotate the QC notebook with what each variable represents biologically and behaviorally.  
**Linked project:** Project 2 — Neural Decoding & Brain-State Modeling Lab  
**Status:** Complete. These annotations are intended to sit alongside Caleb's data-loading notebook as inline commentary. Copy the relevant section into the notebook cell immediately below each variable's shape/dtype print.

---

## How to use this document

For each dataset, find the variable name in the table. The columns answer:
- **What it is** (data type, shape)
- **What it measures biologically** (the physical or neural process it captures)
- **What it means behaviorally** (what the participant was doing when this was recorded)
- **Honest limits** (what it does NOT tell you; common misinterpretations)

Never describe a variable as measuring something it does not. These annotations are the ground truth for any figure caption, report section, or application bullet that references this data.

---

## Dataset 1 — FALCON M2: NHP Intracortical Finger-Movement Dataset

**Source:** FALCON benchmark, M2 dataset. Awake-behaving macaque performing a 2-DOF finger-movement task. Intracortical recordings from primary motor cortex (M1) and/or premotor cortex using Utah-style microelectrode arrays.  
**Citation:** Karpowicz et al. (2025), "Few-shot Algorithms for Consistent Neural Decoding", ICLR 2025. [https://snel-repo.github.io/falcon/](https://snel-repo.github.io/falcon/)  
**Data access:** Public via DANDI / FALCON benchmark download.  
**Honest framing:** This is PUBLIC data we are ANALYZING, not recording. Do not describe this as "our NHP recordings" or "data we collected." Say "analyzed public intracortical NHP data from the FALCON benchmark."

### Neural variables

| Variable name | Typical shape | What it measures biologically | What it means behaviorally | Honest limits |
|---------------|--------------|-------------------------------|---------------------------|---------------|
| `spikes` / `threshold_crossings` | (T × N) where T = time bins, N = electrode channels | Voltage threshold crossings on each intracortical electrode channel within a time bin (typically 10–20 ms). Each crossing is a proxy for a neural action potential (spike) from one or more neurons near that electrode. | The monkey is actively attempting a finger flexion/extension movement. High spike counts on a channel mean that neurons near that electrode are firing at elevated rates during the movement period. | Threshold crossings are NOT verified single-unit spikes. They include multi-unit activity (multiple neurons summed) and may include recording artifacts. This is a population-level signal, not a readout of a single identified neuron. The relationship between spike counts and firing rates depends on bin size — always report bin size. |
| `binned_spikes` | (T × N), already binned at a fixed rate | Summed threshold crossings per bin per channel — a discretized firing-rate estimate. | Same behavioral context. Binned form makes the data easier to work with in regression and decoding models. | Binning loses within-bin temporal precision. Smaller bins preserve more timing info but increase noise. 20 ms bins are a common choice for motor cortex decoding; report the bin size used. |
| `channel_id` / electrode index | (N,) integer array | Each index corresponds to one electrode site in the recording array. | Not a behavioral variable — it is a spatial label for the recording site. | Channel numbering is arbitrary. Do not interpret channel ID values as physical distance or functional hierarchy. Channel-to-channel correlations can reflect shared anatomical inputs, not direct neural connections. |
| `trial_id` | (T,) or per-trial index | Labels which experimental trial each time bin belongs to. | Each trial is one instructed finger-movement attempt. Trial boundaries are determined by the task event structure, not continuous neural activity. | Trial segmentation can introduce edge effects. Bins near trial onset/offset may contain movement-preparation or post-movement activity that differs from mid-movement bins. |

### Behavioral / kinematic variables

| Variable name | Typical shape | What it measures biologically | What it means behaviorally | Honest limits |
|---------------|--------------|-------------------------------|---------------------------|---------------|
| `finger_kinematics` / `target_kinematics` | (T × 2) — two kinematic degrees of freedom | Continuous finger joint angles or positions (flexion/extension, possibly abduction) measured by a sensor or motion-capture system on the monkey's hand. | The monkey is moving (or attempting to move) its fingers toward a visual target. Each of the 2 columns corresponds to one finger DOF. This is the variable we are trying to decode from neural activity. | Kinematics measure physical joint motion. They do NOT measure intended motion directly. For an awake, behaving NHP that can physically move, kinematics ≈ intent, but any slippage, sensor noise, or passive movement contaminates the label. Kinematics are NOT a readout of motor cortex output — they are the downstream mechanical result of a complex motor chain. |
| `velocity` (if derived) | (T × 2) | First derivative of position with respect to time — how fast the finger is moving. | High velocity = active, rapid movement phase. Low velocity = hold period or between movements. | Velocity is derived from position; any noise in position amplifies in velocity via differentiation. Always smooth before computing velocity and report the smoothing kernel. |
| `go_cue_time` / `event_timestamps` | (K,) timestamps | Not a neural signal — this is a behavioral event marker written by the task control system at the moment the monkey is cued to move. | The go cue defines the start of the movement period for each trial. All time-locked analyses (e.g., peri-event time histograms) use this as T=0. | Go-cue timestamps are recorded by the task computer, not the neural recording system. There is always a small hardware synchronization offset (typically a few milliseconds). For latency analyses, report the synchronization method. |

### QC-specific variables

| Variable name | Typical shape | What it measures | QC check to run | Common failure modes |
|---------------|--------------|-----------------|----------------|---------------------|
| `trial_type` / `condition` | (K,) categorical | Which target or movement type was cued on each trial. | Check class balance — are all movement types equally represented across sessions? | Class imbalance can inflate decoding accuracy for the majority class. Always report per-class accuracy, not just overall. |
| `session_id` / `date` | Scalar or string per file | Identifies which recording session a data file corresponds to. | Check session count and date range. Are there gaps? Do later sessions show lower spike counts (a sign of electrode degradation)? | Electrode impedance degrades over months/years of chronic implantation. A drop in mean spike amplitude across sessions is expected and must be quantified — it is the neural drift we are studying, not a data error. |
| Missing values / NaN channels | Scan `spikes` for NaN or all-zero columns | A channel that is all-zero or all-NaN is likely a failed electrode. | Count dead channels per session. Report % dead channels over time. | Dead channels should be excluded from decoding but their count should be reported. Increasing dead-channel count over time is evidence of electrode degradation and must be reported as a limit. |

---

## Dataset 2 — FALCON / Dryad: Human Intracortical Speech Dataset (Participant T17)

**Source:** Jude et al. (2026), intracortical speech BCI data from participant T17 (BrainGate2 clinical trial). Available via Dryad: [https://datadryad.org/dataset/doi:10.5061/dryad.vq83bk481](https://datadryad.org/dataset/doi:10.5061/dryad.vq83bk481)  
**Also:** Chang et al. (2023), *Nature*, "A high-performance speech neuroprosthesis" [https://www.nature.com/articles/s41586-023-06377-x](https://www.nature.com/articles/s41586-023-06377-x)  
**Participant context:** T17 is a person with anarthria (cannot produce intelligible speech) and locked-in syndrome, enrolled in the BrainGate2 clinical trial. Intracortical electrodes are implanted in cortical regions associated with speech production (ventral premotor / inferior frontal cortex area).  
**Honest framing:** This is PUBLIC clinical-trial data from a published study. We are analyzing it; we did not record it, we are not the clinical team, and we have no patient relationship. Say "analyzed public intracortical speech data from the BrainGate2 / FALCON benchmark." Never say "our participant" or "we recorded."

### Neural variables

| Variable name | Shape / format | What it measures biologically | What it means behaviorally | Honest limits |
|---------------|----------------|-------------------------------|---------------------------|---------------|
| `binned_neural_threshold_crossings` | (T × 512) — T time bins × 512 electrode features | Number of voltage threshold crossings in each 10 ms bin on each of up to 512 electrode channels. Same biophysical meaning as M2: proxy for multi-unit spiking activity near each electrode. | Recorded while participant T17 is attempting to speak or silently rehearse a phoneme, word, or sentence. Activity patterns across channels encode the intended articulatory gestures, not actual muscle movement (T17 cannot produce articulated speech). | Threshold crossings are NOT single-unit spikes. They are an aggregate signal. 512 channels is a high-density array but coverage is limited to the implanted region — cortical activity outside this region is not captured. The implanted region covers speech motor cortex, NOT auditory cortex or language comprehension areas. |
| `binned_neural_spike_band_power` | (T × 512) | Mean squared voltage in the spike-frequency band (~300–3000 Hz) in each 10 ms bin per channel. An alternative neural feature that captures high-frequency power even when threshold crossings are sparse. | Same behavioral context. Spike band power is often more robust to threshold-setting errors than raw threshold crossings. Both features should be QC'd and compared. | Spike band power conflates true spiking activity with high-frequency local field potentials and recording noise. It is not a pure single-unit measure. Report which feature is used in any given decoder and why. |
| `norm_channel_means` | (512,) | Per-channel mean of the neural features used for z-scoring. Computed from a baseline period to normalize each channel's activity. | Not a behavioral variable — this is a normalization constant. It shifts the neural features so they are centered around zero. | If the baseline used to compute `norm_channel_means` shifts over sessions (due to electrode drift), z-scoring with stale means will introduce systematic errors. Always check that `norm_channel_means` is reasonable (not wildly different from the empirical mean in the analysis window). |
| `norm_channel_stds` | (512,) | Per-channel standard deviation of neural features, used for z-scoring. | Same as above — normalization constant. | Same caveat: stale stds amplify noise from low-variance channels and suppress signal from high-variance channels. |

### Behavioral / task variables

| Variable name | Shape / format | What it measures | What it means behaviorally | Honest limits |
|---------------|----------------|-----------------|---------------------------|---------------|
| `cue` | String per trial | The ground-truth phoneme, word, or sentence the participant was instructed to attempt to speak. | This is the decoding target — what the neural decoder should predict. In evaluation, predicted output is compared against `cue`. | `cue` is what the participant was INSTRUCTED to say, not confirmed internal speech. It is reasonable to assume the participant attempted the cue, but there is no behavioral confirmation (no movement, no EMG). The label is instruction-derived, not physiologically verified. |
| `session_name` | String (date) | Date of the recording session. | Allows tracking of recording quality over time and identification of within-session vs. cross-session comparisons. | Sessions are not evenly spaced. Day-of-week and time-of-day effects may exist. Always plot session date on any cross-session analysis x-axis. |
| `block_number` | Integer | Which experimental block within a session this data corresponds to. | A session contains multiple blocks; within a block, trials are typically the same task type. Block boundaries may reflect rest periods or task switches. | Block-level differences can confound cross-session analyses. Check for block-to-block drift in neural features within a session before aggregating across blocks. |
| `decoder_logit_output` | (T × P) where P = number of phonemes | The output probability distribution over phoneme classes from the participant's online decoder at each time step (every 20 ms). | This is what T17's real-time decoder was predicting during the session — not the ground truth, and not our decoder. | This is the OUTPUT of the clinical team's RNN decoder, not a behavioral measure. Do NOT use this as a label or training target. It is useful for comparing our decoder's predictions against the original clinical system, but it is a model output, not ground truth. |
| `go_cue_redis_time` / `go_cue_nsp_neural_time` | Timestamps (ms / ns) | Two independently recorded timestamps for the same go-cue event: one from the BRAND real-time system and one from the Neural Signal Processor hardware clock. | The go cue tells the participant to start speaking (attempting). Alignment of these two timestamps is how the two recording systems are synchronized. | The offset between `go_cue_redis_time` (ms) and `go_cue_nsp_neural_time` (ns, converted to ms) gives the synchronization error between the behavioral and neural recording systems. This offset should be computed and reported for each session. A large or variable offset means neural and behavioral data are misaligned — do not proceed without correcting it. |

---

## Dataset 3 — NSD: Natural Scenes Dataset (Human fMRI)

**Source:** Allen et al. (2022), "A massive 7T fMRI dataset to bridge cognitive neuroscience and artificial intelligence." *Nature Neuroscience*. [https://naturalscenesdataset.org](https://naturalscenesdataset.org)  
**Scale:** 8 subjects, 7T fMRI, ~73,000 distinct natural images, 30,000 images shown 3× each for test-retest reliability. Each subject completed ~30–40 scan sessions (6-hour each over ~1 year).  
**Honest framing:** This is a large public fMRI dataset. fMRI measures the BOLD signal (blood-oxygen-level-dependent contrast), which is an INDIRECT measure of neural activity via neurovascular coupling. It is not single-neuron recording, not spiking activity, and not intracortical. Say "fMRI BOLD response" not "neural activity." Do not conflate NSD with the NHP or speech intracortical datasets.

### fMRI / neural variables

| Variable name | Typical shape | What it measures biologically | What it means behaviorally | Honest limits |
|---------------|--------------|-------------------------------|---------------------------|---------------|
| `betas` / voxel responses | (V × I) where V = voxels, I = images | Single-trial beta estimates from a GLM fitted to the BOLD time series. Each beta reflects the magnitude of the BOLD response in one voxel to one image presentation. | A participant viewed a natural image for 3 seconds (fixating a central dot, performing an orthogonal memory task). The beta for a given voxel and image captures how strongly that voxel's blood-oxygen signal increased relative to baseline when that specific image was shown. | BOLD is an indirect, slow (2–6 second peak) hemodynamic proxy for neural activity. It reflects integrated synaptic input and local neural population activity, NOT single-neuron firing. Spatial resolution is 1.8 mm isotropic (a voxel contains hundreds of thousands of neurons). BOLD cannot resolve the timing of individual spikes. |
| `roi_masks` | Boolean (V,) per ROI | Defines which voxels belong to a specific region of interest (e.g., V1, V2, V3, V4, V3ab, hV4, EBA, FFA, PPA, OPA, etc.). ROIs are defined from independent retinotopy and functional localizer runs. | ROI identity tells you which cortical visual area a voxel's response comes from. V1/V2/V3 are early visual cortex (encodes basic features like edges and orientation). Higher areas (V4, OPA, FFA, PPA) encode increasingly complex object and scene properties. | ROI boundaries are estimated, not ground truth. pRF-based retinotopic ROIs are well-established, but higher-order ROI assignments depend on the localizer paradigm and may not perfectly match known anatomy. Do not treat ROI membership as a hard categorical fact. |
| `ncsnr` (noise ceiling signal-to-noise ratio) | (V,) scalar per voxel | Estimates the reliability of the BOLD response in each voxel across repeated image presentations. High ncsnr = the voxel responds consistently to the same images each time they are shown. | A voxel with high ncsnr carries reliable image-specific information and is a good candidate for encoding/decoding. A voxel with ncsnr ≈ 0 is dominated by noise. | ncsnr is a reliability estimate, not a ceiling on decoding accuracy. It depends on the number of repeats (only images shown 3× have full test-retest data) and on the specific model used to estimate noise. Do not conflate high ncsnr with "this voxel encodes X" — it means "this voxel responds consistently," not "we know what it encodes." |

### Stimulus / behavioral variables

| Variable name | Typical shape | What it measures | What it means behaviorally | Honest limits |
|---------------|--------------|-----------------|---------------------------|---------------|
| `stim_id` / image index | Integer per trial | Which image from the COCO/NSD image pool was shown on this trial. | Links a trial's BOLD response to the specific visual stimulus. Enables encoding models (predict voxel response from image features) and decoding models (reconstruct image from voxel responses). | `stim_id` does not capture what the participant was thinking about, only what was shown. The participant was doing an orthogonal memory task (detecting a repeated image), not explicitly judging or categorizing the images. Behavioral engagement with image content is minimal by design. |
| `behav` / behavioral responses | Per trial: response (correct/incorrect), RT | Whether the participant correctly identified a repeated image in the memory task. | A 1-back memory task: participants press a button if the current image is the same as one shown 3 images ago. Correct responses indicate the participant was paying attention. | This task is a FIXATION-CONTROL task, not an image comprehension task. The behavioral data confirms attentiveness but does not measure image perception, recognition, or preference. Do not use `behav` accuracy as a proxy for image memorability or perceptual salience. |
| `session_id` | Integer per scan session | Identifies which scanning session a trial belongs to. | Each session covers a subset of images. A participant's full dataset spans 30–40 sessions over ~1 year. | Session-level effects (scanner drift, participant fatigue, time-of-day) can introduce structured noise. Always check for session-level mean BOLD shifts before cross-session analysis. |
| `run_id` | Integer | Identifies the scan run within a session (typically 8–12 runs per session). | A run is a continuous scanning period of ~4–5 minutes. Within a run, image presentations are pseudorandomly ordered. | Run-level noise (motion artifacts, B0 drift within the scanner) is distinct from session-level noise. Always check motion parameters per run. |

---

## Cross-dataset QC checklist

These checks apply to ALL three datasets and should be the first cells run in Caleb's notebook:

| Check | What to look for | Red flag |
|-------|-----------------|----------|
| **Shape consistency** | Print shape of every primary variable. Verify dimensions match expectations (T × N, V × I, etc.). | Any dimension that is 0, unexpectedly large, or doesn't match the documented spec. |
| **NaN / inf scan** | `np.isnan(x).any()`, `np.isinf(x).any()` for all numeric arrays. | Any NaN or inf in neural data, kinematics, or BOLD betas. |
| **Dead channel detection** (M2, T17) | For each channel, compute mean and std over time. Flag channels with mean ≈ 0 and std < threshold. | >5% dead channels in a session suggests electrode or recording quality issues. |
| **Temporal alignment** (T17) | Compute offset between `go_cue_redis_time` and `go_cue_nsp_neural_time` per trial. | Offset > 10 ms or high variance across trials. |
| **Class balance** (M2, T17) | Count trials per condition / per phoneme or movement type. | Any class with <10% of trials — will dominate error rates. |
| **Session-to-session drift** (M2) | Plot mean spike count per channel per session. | Monotonic decline over sessions = electrode degradation (expected; document it). |
| **BOLD distribution** (NSD) | Histogram of beta values across voxels and images. | Bimodal distribution, extreme outliers, or session-level mean shifts > 2 SD. |
| **ncsnr distribution** (NSD) | Histogram of ncsnr per ROI. | Large fractions of voxels with ncsnr ≈ 0 within a visual area suggests preprocessing error. |
| **Stimulus coverage** (NSD) | Confirm which images have 3 repeats vs. 1 repeat. | Any decoding or reliability analysis that accidentally mixes 1-repeat and 3-repeat images. |

---

## What these annotations do NOT imply

- Annotating a variable does not mean we have verified the data is error-free. QC is still required.
- Knowing what a variable measures biologically does not license causal claims. BOLD is correlational; threshold crossings are proxies; kinematics are downstream of many neural and mechanical processes.
- These annotations are scoped to the datasets as described in their published documentation. If we load a version that differs from the published description (different preprocessing, subset of channels, different bin size), these annotations may not apply exactly.
