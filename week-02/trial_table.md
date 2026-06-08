# Project 1 Trial Table v1

**Date locked:** June 8, 2026  
**Author:** Mark Lin  
**Protocol:** `week-02/protocol_v1.md`  
**Input source:** simulated low-bandwidth input for Week 2

## Trial Table Rules

This table is the locked source for Week 2 no-prediction baseline prompts. The interface may change visual layout, but it may not change the target action, success criterion or prompt meaning without creating a new trial-table version.

All scored trials use simulated low-bandwidth commands. They are not EMG, not neural data and not evidence of brain-computer-interface performance.

## Practice Trials

| Trial ID | Domain | Prompt shown to participant | Target action | Success criterion | Primary risk being checked |
|---|---|---|---|---|---|
| P-A1 | Document editing | "The note says `Dataset: unknown`. Change the dataset label to `LINK`." | Select `replace_label`, choose `LINK`, confirm | Final document shows `Dataset: LINK` | Participant understands label replacement |
| P-A2 | Document editing | "Move `Limit: simulated input only` above `Claim: baseline run`." | Select line, move up, confirm | Limit appears before claim | Participant understands ordering |
| P-B1 | File triage | "Item: `session_schema_notes.md`. Put it in the protocol category." | Choose `protocol`, confirm | Item category is `protocol` | Participant understands category grid |
| P-B2 | File triage | "Item: `raw_emg_unverified.csv`. Put it in defer." | Choose `defer`, confirm | Item category is `defer` | Participant does not treat unverified EMG as ready evidence |

Practice trials are logged but excluded from primary metrics.

## Scored Trials

| Trial ID | Block | Domain | Prompt shown to participant | Target action | Success criterion | Error condition | Honest limit |
|---|---:|---|---|---|---|---|---|
| A01 | 1 | Document editing | "Add the label `input_source: simulated_low_bandwidth` to the session note." | Insert label and confirm | Label appears exactly once | Missing label, misspelling or duplicate label | Tests constrained editing only |
| B01 | 1 | File triage | "Item: `protocol_v1.md`. Put it in protocol." | Select `protocol`, confirm | Category is `protocol` | Any other category | Uses toy items, not real file operations |
| A02 | 1 | Document editing | "The claim says `EMG result`. Replace it with `simulated-input result`." | Replace phrase and confirm | Text reads `simulated-input result` | Leaves `EMG result` in place | Checks honesty wording, not biological data |
| B02 | 1 | File triage | "Item: `latency_plot_draft.png`. Put it in figure." | Select `figure`, confirm | Category is `figure` | Any other category | Does not validate figure quality |
| A03 | 1 | Document editing | "Mark `Trial A03` as done without changing the limitation line." | Mark done and confirm | Done marker added; limitation unchanged | Limitation deleted or edited | Measures careful control in constrained UI |
| B03 | 1 | File triage | "Item: `participant_effort_notes.md`. Put it in report." | Select `report`, confirm | Category is `report` | Any other category | Triage category is predefined |
| A04 | 1 | Document editing | "Undo the accidental label `brain_signal: true`." | Select bad label, delete or undo, confirm | Bad label absent | Bad label remains | Reinforces no brain-signal overclaim |
| B04 | 1 | File triage | "Item: `unverified_mindrove_export.csv`. Put it in defer." | Select `defer`, confirm | Category is `defer` | `data` or `figure` selected | Prevents unverified hardware evidence |
| A05 | 2 | Document editing | "Add `baseline: no_prediction` under the metric section." | Insert label and confirm | Label appears under metric section | Label missing or inserted elsewhere | Tests section targeting |
| B05 | 2 | File triage | "Item: `session_001.jsonl`. Put it in data." | Select `data`, confirm | Category is `data` | Any other category | Simulated log category only |
| A06 | 2 | Document editing | "Move `Honest limit` directly below `Claim`." | Move line and confirm | Limit follows claim | Limit remains separated | Tests claim-limit pairing |
| B06 | 2 | File triage | "Item: `weekly_hypothesis.md`. Put it in protocol." | Select `protocol`, confirm | Category is `protocol` | Any other category | Protocol category includes prereg docs |
| A07 | 2 | Document editing | "Replace `BCI demo` with `BCI-inspired demo`." | Replace phrase and confirm | Text reads `BCI-inspired demo` | Text still says `BCI demo` | Tests anti-overclaim wording |
| B07 | 2 | File triage | "Item: `failed_trial_reason.txt`. Put it in report." | Select `report`, confirm | Category is `report` | Any other category | Failure notes are evidence, not trash |
| A08 | 2 | Document editing | "Add `stop_reason: none` to the trial summary." | Insert label and confirm | Label appears exactly once | Missing or duplicate label | Ensures stop field exists even when unused |
| B08 | 2 | File triage | "Item: `openbci_setup_link.md`. Put it in defer." | Select `defer`, confirm | Category is `defer` | `data` selected | Hardware path is not Week 2 evidence yet |

## Trial Ordering

Use this exact order for the first full baseline session:

```text
P-A1, P-B1, P-A2, P-B2,
A01, B01, A02, B02, A03, B03, A04, B04,
break,
A05, B05, A06, B06, A07, B07, A08, B08
```

The alternating order controls for one domain becoming easier only because it is clustered. If a smoke test is needed, run `P-A1`, `P-B1`, `A01`, `B01`, `A02`, `B02` and label the session `smoke_test`.

## Required Trial Summary Columns

| Column | Meaning |
|---|---|
| `trial_id` | One of the IDs in this table |
| `domain` | `document_editing` or `file_triage` |
| `block_index` | `practice`, `1` or `2` |
| `input_source` | `simulated_low_bandwidth` for Week 2 |
| `success` | `true` only if the success criterion is met |
| `error_type` | `none`, `wrong_action`, `wrong_category`, `prompt_ambiguity`, `ui_error`, `missing_log` or `participant_stop` |
| `completion_time_ms` | Time from trial start to complete event |
| `command_count` | Count of non-idle commands |
| `correction_count` | Count of undo/back/restart recovery actions |
| `physical_effort_1_7` | Participant rating after trial |
| `mental_effort_1_7` | Participant rating after trial |
| `frustration_1_7` | Participant rating after trial |
| `prompt_clarity_1_7` | Participant rating after trial |

## Sign-Off

| Person | Status | Meaning |
|---|---|---|
| Mark Lin | Signed | Trial prompts, target actions, success criteria and honesty constraints are locked for Week 2 baseline implementation |
| Caleb Newton | Pending implementation review | Needs to confirm UI can render these prompts and save every required field |

