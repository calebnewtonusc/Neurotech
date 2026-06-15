# Project 1 — Pilot Session Instructions

**Version:** 1.0  
**Date:** 2026-06-15  
**Author:** Mark Lin  
**Status:** Final — cleared for pilot collection starting June 16.  
**Linked documents:** `week-02/protocol_v1.md`, `week-03/input-class-definitions.md`, `week-03/session-notes-template.md`

---

## Purpose

These instructions govern Project 1 pilot sessions for Week 3. Pilot sessions are distinct from the formal baseline sessions defined in Protocol v1: their purpose is to stress-test the input pipeline, identify unreliable input classes, and determine whether the chosen input modality can support a credible measured experiment. Pilot data is exploratory — it informs decisions, not conclusions.

**Honest limit:** Pilot sessions are not the controlled experiment. Results from pilot sessions must not be reported as formal baseline metrics. They may be cited as "pilot observations" with clear labeling.

---

## 1. What pilot sessions test

- Whether the input pipeline captures events cleanly (complete logs, correct timestamps, no missing fields)
- Whether each defined input class (see `week-03/input-class-definitions.md`) produces a reliably distinct signal
- How many pilot blocks are needed before the operator can reliably distinguish input classes from the signal alone
- Whether fatigue, confusion, or timing problems emerge under realistic session conditions
- Whether the logging schema v1 (`week-02/logging_schema_v1.md`) captures all relevant events without modification

---

## 2. Pre-session checklist (operator runs before participant enters)

Complete every item before starting the session. If any item fails, do not start. Log the failure in the session notes template.

| Item | Check |
|------|-------|
| Input device connected and signal present | ☐ |
| Preprocessing pipeline running (or simulation active) | ☐ |
| Event logger initialized — session ID generated | ☐ |
| Calibration workflow completed (if applicable to this input modality) | ☐ |
| Session notes template open and operator name filled in | ☐ |
| Participant code assigned and entered in session header | ☐ |
| Input modality confirmed and logged (SIMULATED / MYOWARE\_EMG / MINDROVE\_EMG) | ☐ |
| Trial order seed generated and logged | ☐ |
| Quiet environment confirmed (no external audio distractions during recording) | ☐ |

---

## 3. Pilot session structure

A pilot session consists of **calibration → warm-up → pilot blocks → debrief**.

### 3a. Calibration (if using real EMG input)
- Run the calibration workflow as implemented by Caleb.
- Log calibration start time, number of calibration trials completed, and any calibration failures.
- For SIMULATED input: skip calibration; log `calibration_skipped: true` in session notes.

### 3b. Warm-up block
- 5 trials (not logged as experimental data; labeled WARMUP).
- Cover at least one trial from each input class defined in `week-03/input-class-definitions.md`.
- Operator observes signal quality and confirms event detection is working before proceeding.
- If any input class fails to register during warm-up: stop, log WARMUP_FAILURE with details, do not proceed to pilot blocks.

### 3c. Pilot blocks
- **Block size:** 20 trials per block (larger than baseline sessions to maximize input-class coverage per block).
- **Number of blocks:** 2–4 per session depending on participant fatigue.
- **Trial composition:** Input classes drawn pseudorandomly from the full class list, with equal expected frequency per class.
- **Timing:** No enforced per-trial timeout during pilots. Operator notes any trial taking >60 seconds in the session notes.
- **Logging:** All events logged to a session file per Protocol v1 / logging schema v1. Pilot session files are labeled `session_type: PILOT_SESSION` (distinct from `DEV_SESSION` and `PARTICIPANT_SESSION`).

### 3d. Debrief (operator + participant, 5 minutes)
- After the last block, the operator asks:
  1. "Were there any input gestures that felt unclear, ambiguous, or hard to produce consistently?"
  2. "Did any part of the interface seem to misread your intent?"
  3. "Did you notice fatigue in your hand, wrist, or arm? If so, after how many trials?"
- Record responses verbatim in the session notes template.

---

## 4. Per-trial procedure during pilot blocks

1. Operator displays the trial prompt (input class cue).
2. Participant produces the intended input gesture.
3. System logs: TRIAL_START → (input event) → TRIAL_END with outcome and latency.
4. Operator marks any trial with anomalous signal behavior in the running notes (not in the log — the log captures raw events; notes capture operator observations).
5. If the system fails to register the input within 30 seconds: log TIMEOUT, note the class and attempt number, continue.
6. If the input device loses signal: stop block, log DEVICE_FAULT, wait for reconnection. Resume only after signal is confirmed stable.

---

## 5. Stopping conditions for pilot sessions

| Condition | Action |
|-----------|--------|
| Participant reports hand/wrist discomfort | Stop immediately. Log DISCOMFORT_STOP. Do not resume. |
| 3+ consecutive TIMEOUT events on the same input class | Stop the block. Note the class. This class is a candidate for redesign or removal. |
| Device signal drops and cannot be restored within 5 minutes | End the session. Log DEVICE_FAULT_TERMINAL. |
| Operator observes systematic logging failure (missing fields, wrong timestamps) | Stop immediately. Do not continue on corrupt logs. Fix the pipeline first. |
| Participant requests stop | Stop immediately. No override. |

---

## 6. Participant instructions (read aloud before warm-up)

> "In this pilot session, you'll use [INPUT MODALITY] to produce a series of input gestures. Each trial, a label will appear telling you which gesture to make. Your job is to make the gesture as naturally and consistently as you can — we're testing the system, not your performance. There are no right or wrong scores today. If any gesture feels uncomfortable or unnatural, tell me immediately. After the session, I'll ask you a few quick questions. Any questions before we start?"

**Note:** Replace `[INPUT MODALITY]` with the actual modality (e.g., "wrist EMG gestures" or "simulated input commands") before reading.

---

## 7. What NOT to do during pilots

- Do not give participants feedback on accuracy during trials (prevents behavioral adaptation that would confound signal quality assessment).
- Do not adjust calibration parameters mid-session without stopping and logging the change.
- Do not run more than 4 blocks in a single pilot session — fatigue effects dominate after ~80 trials.
- Do not mix SIMULATED and real EMG input within a single session.
- Do not use pilot data as evidence that a specific input class "works" without at least 3 sessions showing consistent above-chance class discrimination.
