# Weekly Hypothesis - Week 2 Project 1 Baseline

**Date locked:** June 8, 2026  
**Author:** Mark Lin  
**Week:** Week 2, Protocol, logging & baseline architecture  
**Related files:** `week-02/protocol_v1.md`, `week-02/trial_table.md`, `week-02/logging_schema_v1.md`

## Locked Hypothesis

If Project 1 implements the no-prediction simulated low-bandwidth baseline from `protocol_v1.md`, then the system should be able to complete a 16-trial scored session with complete logs for at least 90% of required event fields and at least 75% task success on the locked trial table.

This is a logging-and-protocol hypothesis, not a claim about EMG, neural decoding or prediction assistance.

## Why This Hypothesis Matters

The summer plan depends on measured comparisons. Before prediction assistance can be evaluated, the team needs a baseline that is runnable, boring and well logged. A flashy demo without a stable no-prediction baseline would make later improvement claims weak. A complete Week 2 baseline log gives Caleb and Mark a fixed reference point for latency, completion time, correction rate and effort.

## Primary Outcomes

| Outcome | Success threshold for Week 2 | Why it matters | Honest limit |
|---|---:|---|---|
| Required event-field completeness | At least 90% of required fields present across scored trials | Logging must be trustworthy before metrics count | Completeness does not prove the metric is meaningful |
| Trial success rate | At least 75% of scored trials meet success criteria | Protocol should be usable before adding prediction | Single-user/small-n result does not generalize |
| Missing timestamp rate | 0 missing `client_timestamp_ms` in scored trials | Latency and sequence analysis require timestamps | Browser timestamps are not hardware timestamps |
| Correction visibility | 100% of undo/back/restart actions logged | Corrections are central to burden and ambiguity analysis | A logged correction does not reveal intent by itself |
| Post-trial effort capture | At least 90% of scored trials have all four ratings | User burden is one of the Project 1 outcomes | Self-report is subjective and not clinical fatigue measurement |

## Secondary Outcomes

| Outcome | Direction expected | Later comparison |
|---|---|---|
| Completion time | Stable enough to summarize by domain | Future prediction-assisted condition should reduce it without raising errors |
| Command count | Higher than future prediction-assisted condition | Prediction should reduce commands only if accuracy stays acceptable |
| Prompt clarity | Average at least 5 on 1-7 scale | Prompts below 5 must be revised before formal comparison |
| Domain difference | File triage should be faster than document editing | Later analysis must stratify by domain |

## Exclusion Rules

Exclude a trial from primary metrics only if one of these is true:

- the UI fails to save the trial start or completion event;
- the prompt displayed does not match `trial_table.md`;
- the participant stops the session before the trial begins;
- the session is explicitly labeled `smoke_test`.

Do not exclude failed trials because they look bad. Wrong actions, corrections, frustration and ambiguity are part of the evidence.

## Pre-Registered Analysis

1. Count required event fields across scored trials using the schema in `logging_schema_v1.md`.
2. Report success rate overall and separately for document editing and file triage.
3. Report completion time, command count and correction count as median and range, not as a polished performance claim.
4. Report effort ratings by domain.
5. List every failed or stopped trial with the logged reason.
6. Label all Week 2 input as `simulated_low_bandwidth`.

## Claims Allowed If Thresholds Are Met

- "Project 1 has a runnable no-prediction baseline protocol on simulated low-bandwidth input."
- "The baseline logger captured the required event fields for the Week 2 protocol."
- "The locked trial table is usable enough to support a later prediction-assisted comparison."

## Claims Not Allowed

- "The system decodes EMG."
- "The system reads intent from brain activity."
- "The workstation reduces burden versus baseline."
- "Prediction assistance improves control."
- "The protocol generalizes to other users."

Those claims require later real-EMG verification, a prediction-assisted condition, repeated sessions and additional participants or explicit single-user framing.

## Stop/Revise Criteria

Revise the protocol before formal baseline comparison if:

- required field completeness is below 90%;
- prompt clarity averages below 5 in either domain;
- any trial has more than one reasonable interpretation;
- the same command causes two or more participant-reported ambiguities;
- the UI cannot distinguish simulator timing from participant delay.

## Sign-Off

| Person | Status | Meaning |
|---|---|---|
| Mark Lin | Signed | Hypothesis, thresholds, exclusions and allowed claims are locked before baseline results exist |
| Caleb Newton | Pending implementation review | Needs to confirm the runner can compute the primary outcomes from saved logs |

