# Project 1 — Logging Schema v1

**Version:** 1.0  
**Date:** 2026-06-08  
**Authors:** Mark Lin (field definitions), Caleb Newton (implementation)  
**Status:** Locked for Week 2 baseline implementation. Changes require a version bump.  
**Linked documents:** `week-02/protocol-v1.md`, `week-02/trial-table.md`

---

## Overview

Every Project 1 session produces a single structured log file. This document defines every field in that file: its name, data type, allowed values, and the precise moment at which it is written. The goal is a log that is self-describing — a reader with no access to this schema document can still reconstruct what happened in a session by reading the log.

**Honest limit:** This schema is scoped to baseline-mode (no-prediction) sessions. Future protocol versions that add predictive assistance will require new fields (e.g., `prediction_offered`, `prediction_accepted`). Those fields must not be added to v1 log files retroactively.

---

## Log file format

- **Format:** JSON Lines (`.jsonl`) — one JSON object per line.
- **Encoding:** UTF-8.
- **Filename convention:** `session_{SESSION_ID}_{YYYYMMDD_HHMMSS}.jsonl`
- **One file per session.** Do not concatenate sessions.

Each line is one event. There are four event types: `SESSION_HEADER`, `TRIAL_START`, `TRIAL_END`, and `BLOCK_EFFORT`. A complete session log is: exactly one `SESSION_HEADER`, then interleaved `TRIAL_START`/`TRIAL_END` pairs and `BLOCK_EFFORT` events, in chronological order.

---

## Event schemas

### 1. SESSION_HEADER

Written once, as the first line of the file, at the moment the session begins (after the participant instructions are read but before the warm-up block starts).

| Field | Type | Allowed values / format | Description |
|-------|------|------------------------|-------------|
| `event_type` | string | `"SESSION_HEADER"` | Fixed value identifies this line as the session header. |
| `session_id` | string | UUID v4 | Globally unique session identifier. Generated at session start. |
| `session_type` | string | `"DEV_SESSION"`, `"PARTICIPANT_SESSION"` | DEV_SESSION for Caleb/Mark internal runs. Never mix with participant data. |
| `operator` | string | Free text, max 64 chars | Name or initials of the person running the session. |
| `participant_code` | string | Free text, max 32 chars | Anonymous participant code. For DEV_SESSIONs, use "DEV_CALEB" or "DEV_MARK". |
| `input_modality` | string | `"SIMULATED"`, `"MYOWARE_EMG"`, `"MINDROVE_EMG"` | The input hardware or simulation mode used. SIMULATED must never be described as neural or muscle data. |
| `protocol_version` | string | `"1.0"` | The protocol version this session runs against. |
| `trial_order_seed` | integer | Any integer ≥ 0 | Pseudorandom seed used to shuffle trial order within each block. Store this so the exact trial order is reconstructible. |
| `session_start_ts` | string | ISO 8601 with timezone | Timestamp when the session header was written. Example: `"2026-06-08T10:04:23.411-07:00"` |
| `notes` | string | Free text, max 512 chars | Any session-level notes (equipment issues, environment, deviations from protocol). Empty string if none. |

**Example:**
```json
{"event_type": "SESSION_HEADER", "session_id": "a3f2e1d0-1234-4abc-8def-000000000001", "session_type": "DEV_SESSION", "operator": "ML", "participant_code": "DEV_MARK", "input_modality": "SIMULATED", "protocol_version": "1.0", "trial_order_seed": 42, "session_start_ts": "2026-06-08T10:04:23.411-07:00", "notes": ""}
```

---

### 2. TRIAL_START

Written at the exact moment the trial prompt is displayed to the participant.

| Field | Type | Allowed values / format | Description |
|-------|------|------------------------|-------------|
| `event_type` | string | `"TRIAL_START"` | Fixed value. |
| `session_id` | string | UUID v4 | Must match the SESSION_HEADER `session_id`. |
| `block_index` | integer | 1, 2, 3, 4 | Which block this trial belongs to (1-indexed). |
| `block_domain` | string | `"A"`, `"B"` | Domain of the block. |
| `trial_index` | integer | 1–10 | Position of this trial within the block (post-shuffle order). |
| `trial_id` | string | `"A-01"` … `"A-10"`, `"B-01"` … `"B-10"`, `"WARMUP"` | Canonical trial identifier from the trial table. Warm-up trials use `"WARMUP"`. |
| `trial_start_ts` | string | ISO 8601 with timezone | Timestamp when prompt was displayed. This is T=0 for latency measurement. |

**Example:**
```json
{"event_type": "TRIAL_START", "session_id": "a3f2e1d0-1234-4abc-8def-000000000001", "block_index": 1, "block_domain": "A", "trial_index": 3, "trial_id": "A-05", "trial_start_ts": "2026-06-08T10:08:14.002-07:00"}
```

---

### 3. TRIAL_END

Written at the exact moment the participant confirms their final response (or when a stopping/timeout condition is triggered). Always written after a TRIAL_START for the same trial.

| Field | Type | Allowed values / format | Description |
|-------|------|------------------------|-------------|
| `event_type` | string | `"TRIAL_END"` | Fixed value. |
| `session_id` | string | UUID v4 | Must match SESSION_HEADER. |
| `block_index` | integer | 1, 2, 3, 4 | |
| `trial_index` | integer | 1–10 | |
| `trial_id` | string | As above | |
| `trial_end_ts` | string | ISO 8601 with timezone | Timestamp of confirmed response or stop event. |
| `latency_ms` | integer | ≥ 0 | Milliseconds from `trial_start_ts` to `trial_end_ts`. Computed at write time. |
| `outcome` | string | `"CORRECT"`, `"INCORRECT"`, `"TIMEOUT"`, `"PARTICIPANT_STOP"`, `"DEVICE_FAULT"`, `"SYNC_FAULT"`, `"DISCOMFORT_STOP"` | Trial result. Domain A: CORRECT/INCORRECT based on command match. Domain B: always `"COMPLETE"` (see below). |
| `response` | string | Free text | For Domain A: the command the participant selected (e.g., `"CLOSE_WIN"`). For Domain B: the full string entered by the participant. For stop/fault outcomes: empty string. |
| `target` | string | Free text | The correct command (Domain A) or target string (Domain B) from the trial table. Always populated so the log is self-describing. |
| `cer` | float or null | 0.0–1.0 or null | Character error rate. Populated for Domain B trials only. Null for Domain A, WARMUP, and stop/fault outcomes. |
| `rerequest_count` | integer | 0, 1 | Times the participant asked for the prompt to be re-read. Max 1 per trial per protocol. |
| `notes` | string | Free text, max 256 chars | Trial-level notes. Empty string if none. |

**Special case for Domain B outcome field:** Domain B trials that complete (participant enters a final string and confirms) use outcome `"COMPLETE"`. CER is computed and logged in `cer`. A Domain B trial that times out uses `"TIMEOUT"` and `cer` is null.

**Example (Domain A, correct):**
```json
{"event_type": "TRIAL_END", "session_id": "a3f2e1d0-1234-4abc-8def-000000000001", "block_index": 1, "trial_index": 3, "trial_id": "A-05", "trial_end_ts": "2026-06-08T10:08:17.844-07:00", "latency_ms": 3842, "outcome": "CORRECT", "response": "CLOSE_WIN", "target": "CLOSE_WIN", "cer": null, "rerequest_count": 0, "notes": ""}
```

**Example (Domain B, complete):**
```json
{"event_type": "TRIAL_END", "session_id": "a3f2e1d0-1234-4abc-8def-000000000001", "block_index": 2, "trial_index": 5, "trial_id": "B-04", "trial_end_ts": "2026-06-08T10:21:03.201-07:00", "latency_ms": 48201, "outcome": "COMPLETE", "response": "file: notes.txt", "target": "file: notes.txt", "cer": 0.0, "rerequest_count": 0, "notes": ""}
```

---

### 4. BLOCK_EFFORT

Written once per block, immediately after the final TRIAL_END for that block. Records the participant's effort self-report.

| Field | Type | Allowed values / format | Description |
|-------|------|------------------------|-------------|
| `event_type` | string | `"BLOCK_EFFORT"` | Fixed value. |
| `session_id` | string | UUID v4 | Must match SESSION_HEADER. |
| `block_index` | integer | 1, 2, 3, 4 | Which block this effort report follows. |
| `block_domain` | string | `"A"`, `"B"` | Domain of the completed block. |
| `effort_physical` | integer | 1–7 | Q1 response: "How physically demanding did you find this block?" |
| `effort_mental` | integer | 1–7 | Q2 response: "How mentally demanding or frustrating was this block?" |
| `effort_ts` | string | ISO 8601 with timezone | Timestamp when the effort responses were submitted. |

**Example:**
```json
{"event_type": "BLOCK_EFFORT", "session_id": "a3f2e1d0-1234-4abc-8def-000000000001", "block_index": 2, "block_domain": "B", "effort_physical": 2, "effort_mental": 4, "effort_ts": "2026-06-08T10:23:41.100-07:00"}
```

---

## Complete session log — example structure

A well-formed session log file looks like this (one JSON object per line, no commas between lines):

```
{"event_type": "SESSION_HEADER", ...}
{"event_type": "TRIAL_START", "block_index": 1, "trial_id": "WARMUP", ...}
{"event_type": "TRIAL_END",   "block_index": 1, "trial_id": "WARMUP", ...}
{"event_type": "TRIAL_START", "block_index": 1, "trial_id": "WARMUP", ...}
{"event_type": "TRIAL_END",   "block_index": 1, "trial_id": "WARMUP", ...}
{"event_type": "TRIAL_START", "block_index": 1, "trial_id": "WARMUP", ...}
{"event_type": "TRIAL_END",   "block_index": 1, "trial_id": "WARMUP", ...}
{"event_type": "TRIAL_START", "block_index": 1, "trial_id": "A-05",   ...}
{"event_type": "TRIAL_END",   "block_index": 1, "trial_id": "A-05",   ...}
... (9 more Domain A trial pairs)
{"event_type": "BLOCK_EFFORT", "block_index": 1, ...}
{"event_type": "TRIAL_START", "block_index": 2, "trial_id": "B-03",   ...}
{"event_type": "TRIAL_END",   "block_index": 2, "trial_id": "B-03",   ...}
... (9 more Domain B trial pairs)
{"event_type": "BLOCK_EFFORT", "block_index": 2, ...}
... (Blocks 3 and 4 follow the same pattern)
```

Total lines for a complete session: 1 (header) + 6 (warmup) + 80 (40 trials × 2) + 4 (block effort) = **91 lines**.

---

## Validation rules

Before any session data is used in analysis, a log validator must confirm:

1. Exactly one `SESSION_HEADER` exists and it is the first line.
2. Every `TRIAL_START` has a matching `TRIAL_END` with the same `session_id`, `block_index`, and `trial_index`.
3. `latency_ms` equals the difference in milliseconds between `trial_end_ts` and `trial_start_ts` (within ±1 ms for float precision).
4. `cer` is null for all Domain A and WARMUP trials.
5. `cer` is a float in [0, 1] for all Domain B COMPLETE trials.
6. Four `BLOCK_EFFORT` events exist for a complete session (one per block).
7. `effort_physical` and `effort_mental` are integers in [1, 7].
8. `input_modality` is one of the three allowed values.
9. No `PARTICIPANT_SESSION` event is mixed in a file that also contains `DEV_SESSION` events.

**H3 from `week-02/weekly-hypothesis.md` requires 100% compliance with all 9 rules for every DEV_SESSION in Week 2.**

---

## Fields NOT in this schema (v1 scope limits)

The following fields are explicitly reserved for future schema versions and must NOT be added to v1 log files:

- `prediction_offered` — whether the system offered a predictive suggestion
- `prediction_accepted` — whether the participant accepted the prediction
- `prediction_rank` — rank of the accepted prediction in the suggestion list
- `calibration_session` — whether this session was a calibration run
- `emg_signal_quality` — real-time signal quality metric from the EMG hardware
- `participant_demographics` — any demographic data (not in scope for internal sessions)

---

## Version history

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-06-08 | Mark Lin | Initial schema locked for Week 2 baseline implementation |
