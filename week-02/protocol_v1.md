# Project 1 — Neuroadaptive Assistive Workstation: Experiment Protocol v1

**Version:** 1.0  
**Date locked:** 2026-06-08  
**Authors:** Mark Lin (protocol design), Caleb Newton (implementation review)  
**Status:** Locked for Week 2 baseline runs. Changes require a version bump and a dated rationale note.

---

## 1. What this protocol governs

This document defines the procedures, trial structure, participant instructions, effort measurement, stopping conditions, and bias controls for **Project 1 baseline-mode experiments**.

Project 1 is a closed-loop assistive workstation that uses either a **MindRove forearm EMG armband** (wrist surface electromyography) or **simulated low-bandwidth input** to allow a user to operate a computer with minimal hand movement, measured against a gesture-only baseline. This protocol covers the **no-prediction (gesture-only) baseline condition**, which is the reference all future predictive-assistance conditions must beat.

**Honest limit:** EMG measures muscle activation at the skin surface. It does NOT record brain activity, cortical signals, or sub-cortical activity. This is not an implanted BCI and not Neuralink hardware. All simulated-input runs are labeled as such; simulated data is never reported as neural or muscle data.

---

## 2. The two mandatory experimental domains

Every session must include tasks from both of the following domains. Mixing domains within a session is required so that command-selection load and text-entry load are both represented in the baseline.

### Domain A — Command Selection
The participant issues discrete navigation or action commands from a defined command set. The interface presents a choice menu; the participant selects the intended option using the available input modality.

**Why mandatory:** Command selection captures the core assistive-control loop (intent → selection → feedback). It isolates selection latency and error rate cleanly.

### Domain B — Text / Symbol Entry
The participant enters a short phrase or a structured symbol sequence (e.g., a filename, a short sentence, a numeric code) by sequentially selecting characters or word-level chunks from the interface.

**Why mandatory:** Text entry stresses the system's throughput and fatigue characteristics in a way that command menus do not. It also exposes the user-burden reduction question directly: completing a text task with gesture-only input is effortful and time-consuming.

---

## 3. Trial structure

A **session** consists of a fixed number of **blocks**. Each block contains trials from one domain. Block order alternates (A → B → A → B …) to prevent domain-order confounds.

| Level | Definition |
|-------|-----------|
| Session | One complete run of the protocol. Has a unique session ID. |
| Block | A set of trials from a single domain. Has a block index and domain label. |
| Trial | One task prompt → participant response sequence. The atomic unit of measurement. |

### Session structure (baseline mode)
- **Warm-up:** 3 practice trials (not logged as experimental data, labeled WARMUP in logs).
- **Block 1:** Domain A — 10 command-selection trials.
- **Block 2:** Domain B — 10 text-entry trials.
- **Block 3:** Domain A — 10 command-selection trials.
- **Block 4:** Domain B — 10 text-entry trials.
- **Total experimental trials:** 40 per session.
- **Estimated duration:** 20–35 minutes depending on input modality and participant pace.

---

## 4. Trial prompts

### Domain A — Command Selection prompts

Prompts instruct the participant to select a specific option from the interface. The option set is always presented in full; the participant must choose the correct one.

| Prompt ID | Prompt text | Correct command | Distractor count |
|-----------|------------|-----------------|-----------------|
| A-01 | "Open the notes file." | OPEN_NOTES | 4 |
| A-02 | "Go back to the home screen." | NAV_HOME | 4 |
| A-03 | "Save the current document." | SAVE_DOC | 4 |
| A-04 | "Copy the selected text." | COPY | 4 |
| A-05 | "Close the current window." | CLOSE_WIN | 4 |
| A-06 | "Undo the last action." | UNDO | 4 |
| A-07 | "Increase font size." | FONT_UP | 4 |
| A-08 | "Move to the next field." | NEXT_FIELD | 4 |
| A-09 | "Submit the form." | SUBMIT | 4 |
| A-10 | "Delete the selected item." | DELETE_SEL | 4 |

Each trial: prompt is displayed, participant selects, response and latency are recorded. Participants may request a prompt re-read once per trial without penalty (logged as REREQUEST).

### Domain B — Text Entry prompts

Prompts ask the participant to enter a short phrase or string. The interface presents character or word-chunk options; the participant selects sequentially.

| Prompt ID | Target string | Character count | Domain notes |
|-----------|--------------|-----------------|--------------|
| B-01 | "open report" | 11 | Short phrase, common command |
| B-02 | "save and close" | 14 | Two-word action sequence |
| B-03 | "hello world" | 11 | Classic entry task, minimal ambiguity |
| B-04 | "file: notes.txt" | 15 | Includes punctuation and colon |
| B-05 | "go to line 42" | 13 | Mixed text and number |
| B-06 | "search: neural" | 14 | Includes colon, real domain vocabulary |
| B-07 | "undo last edit" | 13 | Three-word phrase |
| B-08 | "mark as done" | 12 | Common task-management phrase |
| B-09 | "attach: log.csv" | 15 | Filename with extension |
| B-10 | "run baseline" | 12 | Domain-specific short command |

Scoring: character error rate (CER) and time-to-completion per target string.

---

## 5. Participant instructions

Read aloud to every participant (or self-read for internal test sessions) before the warm-up block:

> "In this study, you will use [INPUT MODALITY: gesture / simulated input] to control a computer interface. For each trial, a prompt will appear telling you what to do. Your job is to complete the task as accurately and comfortably as you can. Speed matters, but accuracy matters more — do not rush to the point of making errors you would not normally make. You can ask for a prompt to be re-read once. If anything feels unclear or uncomfortable, say stop and we will pause. There are no wrong questions. At the end of each block, you will answer two short questions about your effort level. The session takes 20–35 minutes."

**Modification for internal (developer) test sessions:** The above text is still read aloud or silently reviewed to ensure consistent procedure. Developer test sessions are labeled DEV_SESSION in logs and are analyzed separately.

---

## 6. Effort questions

After each block (four times per session), the participant answers the following two questions. Responses are recorded in the log immediately following the final trial of the block.

**Q1 — Physical effort:**  
"How physically demanding did you find this block?" (1 = not at all demanding, 7 = extremely demanding)

**Q2 — Mental effort / frustration:**  
"How mentally demanding or frustrating was this block?" (1 = not at all, 7 = extremely)

**Why 7-point, not 5-point:** A 7-point scale allows finer discrimination in the low-demand range, where baseline-mode sessions are expected to cluster. This prevents floor effects from masking real differences when predictive assistance is added later.

**Honest limit:** Effort ratings are self-report and subject to response bias. They are one input to the user-burden analysis, not a sole determinant.

---

## 7. Stopping conditions

A trial or session is stopped under the following conditions:

| Condition | Action | Log entry |
|-----------|--------|-----------|
| Participant says "stop" or "pause" | Immediately pause; do not record the in-progress trial | PARTICIPANT_STOP |
| Three consecutive timeouts on a single trial (timeout = 60 s) | End the block; log incomplete trials as TIMEOUT | BLOCK_TIMEOUT |
| Input device disconnects or loses signal | Pause session; log device state; do not continue until signal confirmed | DEVICE_FAULT |
| Simulated input desyncs from expected event stream | Halt session; log error; do not continue on corrupt input | SYNC_FAULT |
| Participant reports discomfort or pain (physical) | Stop session immediately; record DISCOMFORT; do not resume in the same session | DISCOMFORT_STOP |

A stopped session is not discarded. All complete trials up to the stop point are included in analysis with a session-level flag of INCOMPLETE. Incomplete sessions are analyzed separately from complete sessions and the distinction is always reported.

---

## 8. Bias controls

The following controls are in place for all baseline sessions:

**Prompt randomization:** Within each block, the 10 trial prompts are presented in a pseudorandom order drawn from a fixed seed (seed stored in session log). The same seed is never reused across sessions to prevent order memorization. Seed is logged so the trial order can be reconstructed exactly.

**Distractor balancing (Domain A):** The four distractors for each command-selection trial are drawn from the same command vocabulary without replacement within the trial. The position of the correct option in the menu is randomized per trial.

**Domain order alternation:** Block order is always A–B–A–B. This is not counterbalanced across participants in the baseline phase; the effect of domain order is outside scope for v1 and will be noted as a limit in any report.

**Developer sessions labeled separately:** Any session run by Caleb or Mark for system testing is tagged DEV_SESSION. These sessions are never mixed with future external-participant data in the main analysis tables. If referenced at all, they are reported in a separate "internal validation" section.

**Input modality logged explicitly:** Every session log header states the input modality (SIMULATED, MYOWARE_EMG, MINDROVE_EMG). Simulated input is never described as muscle or neural data in any output.

**No performance feedback during trials:** Participants do not receive accuracy or speed feedback during the trial itself. Feedback is reserved for the post-block effort questions. This prevents response-strategy adaptation within a session that would confound the baseline.

---

## 9. What is NOT in scope for this protocol version

- Predictive-assistance condition (added in Week 5+)
- Calibration vs. no-calibration comparison (Week 3+ after baseline is validated)
- Multi-day repeated-session analysis (Week 9)
- Real external participants (internal/developer sessions only for Weeks 2–4)
- Medical or clinical assessment of any kind

---

## 10. Version history and change log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-06-08 | Mark Lin | Initial protocol locked for Week 2 baseline runs |

Any future change to prompts, trial count, effort scale, or stopping conditions requires a new version number, a dated entry in this table, and a rationale note. Do not silently edit v1 after sessions have been run against it.
