# Project 1 Protocol v1 - No-Prediction Baseline

**Date locked:** June 8, 2026  
**Author:** Mark Lin  
**Task type:** Write  
**Project:** Project 1, Neuroadaptive Assistive Workstation  
**Status:** Protocol v1 for Week 2 baseline implementation

## Purpose

This protocol defines the first runnable baseline for the Neuroadaptive Assistive Workstation. The goal is not to prove that the system is adaptive yet. The goal is to create a controlled no-prediction baseline with clear tasks, repeatable prompts, trustworthy logs, explicit stopping conditions and bias controls. Later prediction-assisted and real-EMG runs must compare against this exact baseline.

The Week 2 input source is **simulated low-bandwidth input**. It is synthetic command input, not EMG and not neural data. Surface EMG may replace the simulator only after the June 19 hardware/signal kill-switch verifies raw access, timestamping, repeatability and baseline-above-chance classification.

## Locked Experimental Question

Can a participant complete two ordinary workstation task domains using a fixed low-bandwidth command vocabulary in no-prediction mode while the system records enough information to evaluate latency, completion time, correction rate and user burden?

**Claim allowed after Week 2:** The baseline protocol can run and save complete logs for simulated low-bandwidth control.  
**Honest limit:** Week 2 does not establish real EMG performance, prediction benefit, clinical utility, brain-computer-interface capability or generalization to other users.

## Baseline Condition

The first condition is **no-prediction low-bandwidth control**.

- The command set is fixed for the whole session.
- The system does not reorder choices based on context.
- The system does not auto-complete or suggest likely targets.
- The participant must navigate the same visible options on every trial.
- The logger records every command, UI state transition, correction, undo and completion event.

This baseline exists so later context prediction has a fair comparison. A future prediction-assisted system only counts as an improvement if it reduces completion time, correction count or effort without increasing error rate.

## Input Vocabulary

| Command | Meaning in UI | Source in Week 2 | Honest limit |
|---|---|---|---|
| `next` | Move focus to the next visible option | Simulated key/event channel | Synthetic command, not a biological signal |
| `previous` | Move focus to the previous visible option | Simulated key/event channel | Synthetic command, not a biological signal |
| `select` | Activate the focused option | Simulated key/event channel | Does not prove intent decoding |
| `back` | Return one menu level or undo a pending choice | Simulated key/event channel | Correction behavior depends on UI design |
| `confirm` | Commit the final answer/action | Simulated key/event channel | Confirmation is not separate evidence of comprehension |
| `idle` | No command emitted during the window | Simulated key/event channel | Idle windows can be user hesitation or simulator timing |

If real EMG is added later, the biological interpretation changes only to "surface EMG measured forearm muscle activation." It still does not become brain activity.

## Mandatory Domains

### Domain A - Document Editing Command Grid

The participant edits a short structured note using a command grid. Each trial presents a document state and a target edit. The participant uses the fixed command vocabulary to choose actions such as `insert_label`, `delete_label`, `move_line_up`, `move_line_down`, `mark_done`, `undo` and `confirm`.

**Why this domain matters:** It resembles real computer work without requiring free-form typing. It tests whether low-bandwidth control can select and correct discrete actions in a cognitively meaningful workflow.

**What it does not prove:** It does not prove that the system can replace full keyboard entry or understand the document. It measures command selection inside a constrained task.

### Domain B - File Triage Command Grid

The participant sorts small visible work items into fixed categories: `protocol`, `data`, `figure`, `report`, `defer` or `discard`. Each trial presents a list item with a short description and a target category. The participant navigates the command grid and confirms the category.

**Why this domain matters:** It represents repetitive workstation triage where prediction assistance might later reduce movement burden.

**What it does not prove:** It does not prove autonomous file management or safe operation on real user files. Week 2 uses sandboxed simulated items only.

## Participant Instructions

Read these instructions verbatim before the session:

1. You will complete short computer-control trials using a limited command set.
2. The current input is simulated low-bandwidth input. It is not EMG and not neural data.
3. Work accurately first. Do not race the timer.
4. If you make a wrong selection, use `back` or `undo` when available rather than restarting silently.
5. After each trial, answer the effort question before moving on.
6. Stop immediately if you feel strain, frustration that would change your normal behavior, or if the interface is ambiguous.

## Session Structure

| Phase | Duration target | Content | Logged? |
|---|---:|---|---|
| Consent/check-in | 2 minutes | Explain simulated input, task domains and stop rule | Yes |
| Practice | 4 trials | Two document-editing and two file-triage trials not used in metrics | Yes, flagged as practice |
| Baseline block 1 | 8 trials | Four document-editing and four file-triage trials | Yes |
| Break | 2 minutes | Rest and note fatigue | Yes |
| Baseline block 2 | 8 trials | Four document-editing and four file-triage trials | Yes |
| Debrief | 3 minutes | Effort, ambiguity and failure notes | Yes |

The first full baseline session is 16 scored trials plus 4 practice trials. A shorter engineering smoke test may run 2 practice and 4 scored trials, but it must be labeled `smoke_test` and cannot be reported as the baseline result.

## Effort Questions

After every scored trial, ask:

| Question | Scale | Anchor |
|---|---|---|
| Physical effort | 1-7 | 1 = no physical effort, 7 = unsustainable effort |
| Mental effort | 1-7 | 1 = obvious choices, 7 = hard to keep track |
| Frustration | 1-7 | 1 = none, 7 = would stop using it |
| Prompt clarity | 1-7 | 1 = unclear, 7 = perfectly clear |

After each block, ask:

- Which command caused the most hesitation?
- Did any prompt have more than one reasonable interpretation?
- Did you use `back` because of a mistake, an ambiguous UI, or a simulator timing issue?
- Would this task become easier with context prediction? If yes, where?

## Primary Metrics

| Metric | Definition | Baseline comparison | Honest limit |
|---|---|---|---|
| Trial completion time | Seconds from `trial_start` to `trial_complete` | Future prediction-assisted condition | Time includes UI design and participant strategy |
| Command count | Number of non-idle commands per trial | Future prediction-assisted condition | Lower count can reflect shortcuts, not lower fatigue by itself |
| Correction count | Count of `back`, `undo` or wrong-selection recovery events | Future prediction-assisted condition | Corrections can be caused by prompt ambiguity |
| Error rate | Failed or wrong final action divided by scored trials | Must not increase under prediction | Small trial counts give unstable estimates |
| End-to-end latency | p50/p95 from simulated input event to UI state update | Direct keyboard event reference | Local machine and browser timing affect values |
| Effort rating | Physical, mental, frustration and clarity ratings | Future prediction-assisted condition | Subjective self-report, not clinical fatigue measurement |

## Stopping Conditions

Stop the session if any of these occur:

- The participant requests to stop.
- Physical effort or frustration is rated 7 on two consecutive trials.
- The same prompt is misunderstood twice.
- The interface fails to record a required event field.
- More than 10% of trials have missing timestamps.
- A software issue causes the participant to repeat a trial without a logged reason.
- The session exceeds 35 minutes before the debrief.

Stopped sessions are still saved. They are marked `stopped`, and the reason is recorded in the session log.

## Bias Controls

| Risk | Control |
|---|---|
| Learning effect across domains | Alternate document and file-triage trials within each block |
| Cherry-picking easy prompts | Use the locked trial table in `week-02/trial_table.md` |
| Silent prompt edits after results | Log `protocol_version`, `trial_table_version` and prompt IDs |
| Measuring prediction benefit against a weak baseline | Freeze no-prediction mode before prediction-assisted shortcuts are added |
| Confusing simulator timing with user delay | Log input event time, UI receipt time and UI update time separately |
| Inflating success by ignoring corrections | Count `back`, `undo`, wrong target focus and restart events |
| Overclaiming simulated data | Include `input_source=simulated_low_bandwidth` on every session, trial and figure |

## Required Output Files From a Session

Each run must save:

- `session.jsonl`: one event per line using `week-02/logging_schema_v1.md`.
- `trial_summary.csv`: one row per trial with primary metrics.
- `session_notes.md`: participant comments, ambiguity notes, stop reasons and known logger issues.

## Sign-Off

| Person | Status | Meaning |
|---|---|---|
| Mark Lin | Signed | Protocol wording, participant-facing prompts, effort questions and bias controls are ready for Week 2 implementation |
| Caleb Newton | Pending implementation review | Needs to confirm event fields and UI states can be implemented without changing the protocol |

