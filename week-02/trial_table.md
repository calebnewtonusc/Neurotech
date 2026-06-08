# Project 1 — Trial Table v1

**Version:** 1.0  
**Date:** 2026-06-08  
**Linked protocol:** `week-02/protocol-v1.md`  
**Status:** Locked for Week 2 baseline runs. Changes require a protocol version bump.

This table is the canonical reference for all trial types defined in Protocol v1. It specifies every trial's domain, prompt, target response, timing parameters, scoring method, and logging fields. It is intended to be used alongside the logging schema (`week-02/logging-schema-v1.md`) to verify that every trial event is captured correctly.

---

## Domain A — Command Selection Trials

**Scoring:** Binary correct/incorrect per trial. Primary metric is **command-selection accuracy (%)** and **selection latency (ms)** from prompt display to confirmed selection.

**Timeout:** 60 seconds. Three consecutive timeouts on a single prompt = BLOCK_TIMEOUT (see protocol §7).

**Distractor count:** 4 per trial (correct option + 4 distractors = 5 options displayed).

| Trial ID | Prompt text | Correct command | Command category | Timeout (s) | Scoring | Notes |
|----------|------------|-----------------|-----------------|-------------|---------|-------|
| A-01 | "Open the notes file." | OPEN_NOTES | File operations | 60 | Correct/Incorrect + latency (ms) | Baseline frequency: common task |
| A-02 | "Go back to the home screen." | NAV_HOME | Navigation | 60 | Correct/Incorrect + latency (ms) | Tests navigation intent decoding |
| A-03 | "Save the current document." | SAVE_DOC | File operations | 60 | Correct/Incorrect + latency (ms) | High expected accuracy |
| A-04 | "Copy the selected text." | COPY | Editing | 60 | Correct/Incorrect + latency (ms) | Editing domain, common command |
| A-05 | "Close the current window." | CLOSE_WIN | Navigation | 60 | Correct/Incorrect + latency (ms) | Potentially confused with DELETE |
| A-06 | "Undo the last action." | UNDO | Editing | 60 | Correct/Incorrect + latency (ms) | Error-correction intent |
| A-07 | "Increase font size." | FONT_UP | Formatting | 60 | Correct/Incorrect + latency (ms) | Low frequency; formatting domain |
| A-08 | "Move to the next field." | NEXT_FIELD | Navigation | 60 | Correct/Incorrect + latency (ms) | Form-navigation context |
| A-09 | "Submit the form." | SUBMIT | Form actions | 60 | Correct/Incorrect + latency (ms) | Irreversible action — stop condition if accidental |
| A-10 | "Delete the selected item." | DELETE_SEL | Editing | 60 | Correct/Incorrect + latency (ms) | Potentially confused with CLOSE_WIN |

**Command category distribution:**
- File operations: 2 trials (A-01, A-03)
- Navigation: 3 trials (A-02, A-05, A-08)
- Editing: 3 trials (A-04, A-06, A-10)
- Formatting: 1 trial (A-07)
- Form actions: 1 trial (A-09)

**Confusion pairs to watch:** CLOSE_WIN (A-05) and DELETE_SEL (A-10) share semantic proximity. If error rates on these two are elevated together, note as a design confound in session notes.

---

## Domain B — Text Entry Trials

**Scoring:** Character error rate (CER) = (substitutions + insertions + deletions) / (number of characters in target string). Secondary metric: **time-to-completion (ms)** from prompt display to confirmed final character.

**No timeout per character selection** (text entry is self-paced). A block-level timeout of 5 minutes applies to the full trial (TRIAL_TIMEOUT_TEXT).

| Trial ID | Prompt text | Target string | Char count | Includes punctuation | Domain notes | CER baseline expectation |
|----------|------------|--------------|------------|---------------------|--------------|--------------------------|
| B-01 | "Enter: open report" | open report | 11 | No | Common command phrase | Low (<0.10) |
| B-02 | "Enter: save and close" | save and close | 14 | No | Two-word action | Low (<0.10) |
| B-03 | "Enter: hello world" | hello world | 11 | No | Classic entry; minimal ambiguity | Very low (<0.05) |
| B-04 | "Enter: file: notes.txt" | file: notes.txt | 15 | Yes (colon, period) | Filename with punctuation | Moderate (0.10–0.20) |
| B-05 | "Enter: go to line 42" | go to line 42 | 13 | No | Mixed text and number | Moderate (0.10–0.20) |
| B-06 | "Enter: search: neural" | search: neural | 14 | Yes (colon) | Domain vocabulary + punctuation | Moderate (0.10–0.20) |
| B-07 | "Enter: undo last edit" | undo last edit | 13 | No | Three-word phrase | Low (<0.10) |
| B-08 | "Enter: mark as done" | mark as done | 12 | No | Task-management phrasing | Low (<0.10) |
| B-09 | "Enter: attach: log.csv" | attach: log.csv | 15 | Yes (colon, period) | Filename with extension | Moderate (0.10–0.20) |
| B-10 | "Enter: run baseline" | run baseline | 12 | No | Domain-specific command | Low (<0.10) |

**CER baseline expectations are rough priors based on comparable scanning / switch-access literature.** They are NOT pre-registered targets. They are recorded here so that Week 2 internal sessions can be compared qualitatively to known prior work. If actual CER differs substantially, that is a finding — not a failure.

**Honest limit:** CER expectations for simulated-input sessions may differ from real EMG sessions. All CER values from simulated sessions are labeled SIM in analysis tables.

---

## Full session trial ordering

Blocks alternate A–B–A–B. Within each block, the 10 trials are pseudorandomly ordered using a session-specific seed (logged in session header). The table below shows the **canonical unshuffled order** — the actual order in any session is recovered from the log's `trial_order_seed`.

| Block | Domain | Trials (canonical order) |
|-------|--------|--------------------------|
| 1 | A | A-01, A-02, A-03, A-04, A-05, A-06, A-07, A-08, A-09, A-10 |
| 2 | B | B-01, B-02, B-03, B-04, B-05, B-06, B-07, B-08, B-09, B-10 |
| 3 | A | A-01, A-02, A-03, A-04, A-05, A-06, A-07, A-08, A-09, A-10 |
| 4 | B | B-01, B-02, B-03, B-04, B-05, B-06, B-07, B-08, B-09, B-10 |

Total: 40 trials per session. Blocks 1 and 3 present the same Domain A trial set (different seed per block so prompt order differs). Same for Blocks 2 and 4.

---

## Primary metrics summary

| Metric | Domain | Unit | Captured per | Notes |
|--------|--------|------|-------------|-------|
| Selection accuracy | A | % correct | Trial | Binary correct/incorrect |
| Selection latency | A | ms | Trial | Prompt display → confirmed selection |
| Character error rate (CER) | B | ratio (0–1) | Trial | (subs+ins+del) / target length |
| Time-to-completion | B | ms | Trial | Prompt display → confirmed last char |
| Effort — physical | Both | 1–7 Likert | Block | Post-block self-report |
| Effort — mental/frustration | Both | 1–7 Likert | Block | Post-block self-report |
| Re-request count | A | integer | Trial | Times participant asked for prompt re-read |
| Input modality | Both | categorical | Session | SIMULATED / MYOWARE_EMG / MINDROVE_EMG |

---

## Known limits of this trial table

- **Domain order not counterbalanced:** A–B–A–B is fixed in v1. Order effects are not controlled; this will be noted in any analysis report.
- **No external participants in Weeks 2–4:** All sessions are DEV_SESSION (Caleb or Mark). External participant data will differ in ways that cannot be predicted from internal sessions.
- **Simulated input ≠ real EMG:** CER and latency from SIM sessions cannot be directly compared to EMG sessions. They are reported separately with a SIM label.
- **Trial count per domain is small (n=20 per domain per session):** Sufficient for internal validation; not sufficient for robust inferential statistics. A power analysis is planned for Week 4 before any external data collection is scheduled.
