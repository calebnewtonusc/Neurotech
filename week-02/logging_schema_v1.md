# Logging Schema v1 - Project 1 No-Prediction Baseline

**Date locked:** June 8, 2026  
**Author:** Mark Lin  
**Project:** Project 1, Neuroadaptive Assistive Workstation  
**Protocol:** `week-02/protocol_v1.md`  
**Trial table:** `week-02/trial_table.md`

## Purpose

This schema defines the minimum log structure for the Week 2 no-prediction baseline. Caleb can implement the interface however he wants, but a run is not valid unless it saves the fields below with the same names and meanings.

All Week 2 logs must say `input_source=simulated_low_bandwidth`. Simulated low-bandwidth input is synthetic control data. It is not EMG, not neural data and not a brain-computer-interface recording.

## File Outputs

| File | Format | One row/event means | Required |
|---|---|---|---|
| `session.jsonl` | JSON Lines | One timestamped event | Yes |
| `trial_summary.csv` | CSV | One trial after completion or stop | Yes |
| `session_notes.md` | Markdown | Human-readable notes, prompt ambiguities, stop reasons and logger issues | Yes |

## Event Types

| Event type | When emitted | Required fields beyond base |
|---|---|---|
| `session_start` | First event in a run | `session_mode`, `protocol_version`, `trial_table_version`, `input_source` |
| `practice_start` | Before practice trials | `block_index` |
| `block_start` | Before each scored block | `block_index` |
| `trial_start` | Prompt becomes visible | `trial_id`, `domain`, `prompt_id`, `target_action` |
| `input_window_open` | System starts listening for one command | `trial_id`, `window_index` |
| `input_event` | Simulated command is emitted | `trial_id`, `command`, `simulated_confidence`, `simulated_noise_level` |
| `ui_state_change` | Focus, menu level or selection changes | `trial_id`, `from_state`, `to_state`, `focused_option` |
| `correction_event` | Participant uses `back`, `undo` or restart | `trial_id`, `correction_type`, `correction_reason` |
| `trial_complete` | Participant confirms final action | `trial_id`, `success`, `final_action`, `completion_time_ms` |
| `trial_stop` | Trial stops without completion | `trial_id`, `stop_reason` |
| `effort_rating` | After each scored trial | `trial_id`, `physical_effort_1_7`, `mental_effort_1_7`, `frustration_1_7`, `prompt_clarity_1_7` |
| `break_start` | Scheduled break begins | `block_index` |
| `break_end` | Scheduled break ends | `block_index` |
| `session_stop` | Session ends early | `stop_reason` |
| `session_complete` | Final event in a completed run | `completed_scored_trials`, `failed_scored_trials`, `missing_required_field_count` |

## Base Event Fields

Every event in `session.jsonl` must include:

| Field | Type | Example | Meaning |
|---|---|---|---|
| `schema_version` | string | `logging_schema_v1` | This file's version |
| `session_id` | string | `p1_2026-06-08_mark_sim_001` | Unique run ID |
| `event_id` | string | `evt_000042` | Monotonic event ID within session |
| `event_type` | string | `input_event` | One of the event types above |
| `client_timestamp_ms` | integer | `1780938123456` | Browser/client timestamp in milliseconds |
| `monotonic_elapsed_ms` | integer | `43122` | Time since `session_start` using a monotonic clock if available |
| `participant_id` | string | `mark_selftest` | Pseudonymous participant/session label |
| `operator_id` | string | `caleb` or `mark` | Person running the session |
| `protocol_version` | string | `protocol_v1` | Protocol file used |
| `trial_table_version` | string | `trial_table_v1` | Trial table file used |
| `input_source` | string | `simulated_low_bandwidth` | Data source label |
| `session_mode` | string | `baseline_no_prediction` or `smoke_test` | Run mode |

## Command Values

| Command | Allowed in Week 2 | Notes |
|---|---|---|
| `next` | Yes | Move focus forward |
| `previous` | Yes | Move focus backward |
| `select` | Yes | Activate focused option |
| `back` | Yes | Return one menu level or undo pending choice |
| `confirm` | Yes | Commit answer/action |
| `idle` | Yes | No command emitted during the input window |

No prediction command is allowed in Week 2 baseline logs. If a shortcut, suggestion or reordered menu is tested, the session must not be labeled `baseline_no_prediction`.

## Trial Summary Fields

Each row in `trial_summary.csv` must include:

| Field | Type | Required | Meaning |
|---|---|---:|---|
| `session_id` | string | Yes | Matches JSONL |
| `trial_id` | string | Yes | Matches `trial_table.md` |
| `domain` | string | Yes | `document_editing` or `file_triage` |
| `block_index` | string | Yes | `practice`, `1` or `2` |
| `input_source` | string | Yes | `simulated_low_bandwidth` for Week 2 |
| `session_mode` | string | Yes | `baseline_no_prediction` or `smoke_test` |
| `success` | boolean | Yes | True only if success criterion was met |
| `error_type` | string | Yes | `none`, `wrong_action`, `wrong_category`, `prompt_ambiguity`, `ui_error`, `missing_log` or `participant_stop` |
| `completion_time_ms` | integer | Yes if completed | Trial start to complete |
| `command_count` | integer | Yes | Non-idle input events |
| `idle_window_count` | integer | Yes | Idle windows during trial |
| `correction_count` | integer | Yes | Back/undo/restart events |
| `first_input_latency_ms` | integer | Yes if input occurred | Trial start to first non-idle command |
| `median_ui_latency_ms` | number | Yes if commands occurred | Input event to UI state update |
| `p95_ui_latency_ms` | number | Yes if commands occurred | Input event to UI state update |
| `physical_effort_1_7` | integer | Yes for scored trials | Participant rating |
| `mental_effort_1_7` | integer | Yes for scored trials | Participant rating |
| `frustration_1_7` | integer | Yes for scored trials | Participant rating |
| `prompt_clarity_1_7` | integer | Yes for scored trials | Participant rating |
| `stop_reason` | string | Yes | `none` unless trial stopped |

## Valid Values

| Field | Allowed values |
|---|---|
| `input_source` | `simulated_low_bandwidth`, `real_emg_myoWare`, `real_emg_openbci`, `unknown_unusable` |
| `session_mode` | `baseline_no_prediction`, `smoke_test`, `prediction_assisted_future`, `hardware_check_future` |
| `domain` | `document_editing`, `file_triage` |
| `correction_type` | `back`, `undo`, `restart_trial`, `operator_note` |
| `correction_reason` | `wrong_focus`, `wrong_action`, `prompt_ambiguity`, `simulator_timing`, `ui_error`, `participant_changed_mind`, `unknown` |
| `stop_reason` | `none`, `participant_request`, `physical_effort`, `frustration`, `prompt_ambiguity`, `missing_timestamp`, `logger_failure`, `time_limit`, `operator_stop` |

Future real-EMG sessions may use `real_emg_myoWare` or `real_emg_openbci`, but only after hardware verification. They must not be mixed with simulated sessions in a summary table without a visible `input_source` split.

## Minimal Example Event

```json
{
  "schema_version": "logging_schema_v1",
  "session_id": "p1_2026-06-08_mark_sim_001",
  "event_id": "evt_000017",
  "event_type": "input_event",
  "client_timestamp_ms": 1780938123456,
  "monotonic_elapsed_ms": 43122,
  "participant_id": "mark_selftest",
  "operator_id": "caleb",
  "protocol_version": "protocol_v1",
  "trial_table_version": "trial_table_v1",
  "input_source": "simulated_low_bandwidth",
  "session_mode": "baseline_no_prediction",
  "trial_id": "A01",
  "command": "select",
  "simulated_confidence": 1.0,
  "simulated_noise_level": 0.0
}
```

## Quality Gates

A session is valid for Week 2 baseline reporting only if:

- `session_start` and `session_complete` or `session_stop` exist.
- Every scored trial has `trial_start` and either `trial_complete` or `trial_stop`.
- Every scored completed trial has an `effort_rating`.
- Missing required field count is below 10% of required fields.
- Every event has `input_source`.
- No event in a `baseline_no_prediction` session includes prediction suggestions or reordered options.

## Sign-Off

| Person | Status | Meaning |
|---|---|---|
| Mark Lin | Signed | Field names, meanings, valid values and quality gates are locked for Week 2 |
| Caleb Newton | Pending implementation review | Needs to confirm the runner writes these files exactly enough for analysis |

