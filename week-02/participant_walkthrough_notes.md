# Project 1 — Participant Walkthrough Notes

**Date:** 2026-06-09  
**Author:** Mark Lin  
**Task:** Walk through Protocol v1 like a participant; flag ambiguous prompts; refine effort-survey questions.  
**Linked documents:** `week-02/protocol-v1.md`, `week-02/trial-table.md`, `week-02/logging-schema-v1.md`  
**Status:** Complete. All flags below are actionable items for Caleb's interface implementation and for Protocol v2 if needed.

---

## Purpose of this document

Before Caleb builds the experiment runner, Mark ran through the full Protocol v1 mentally (and partially on paper) as if he were a naive participant. This surfaces ambiguities that would cause a real participant to pause, make unexpected choices, or produce uninterpretable data. It also refines the effort-survey questions so the post-block ratings are as clean as possible before any sessions are logged.

---

## 1. Participant experience walkthrough — Domain A (Command Selection)

**Simulated run-through:** Read each prompt aloud, then looked at a mock 5-option menu and tried to select the correct command without being told which one was right.

### Flags raised

| Prompt ID | Prompt text | Flag | Severity | Proposed fix |
|-----------|-------------|------|----------|--------------|
| A-01 | "Open the notes file." | "The notes file" is ambiguous if the interface shows multiple file-related commands (e.g., OPEN_NOTES vs OPEN_DOC vs OPEN_RECENT). A participant might reasonably select OPEN_DOC. | Medium | Change to "Open the notes file specifically" or make the command label visible after selection so participants understand the vocabulary. |
| A-04 | "Copy the selected text." | Assumes text is currently selected. A participant who isn't sure whether anything is selected may hesitate or ask a clarifying question. In the baseline (no actual UI state), this is abstract. | Low | Add "(assume text is already selected)" to the prompt text. Low priority for internal sessions; higher priority before external participants. |
| A-05 | "Close the current window." | "Window" vs "app" vs "tab" is ambiguous in a general-purpose interface context. CLOSE_WIN is clear as a label, but a participant who thinks in terms of "tabs" may pause. | Low | Acceptable for v1. Flag for external participant version. |
| A-09 | "Submit the form." | Protocol §7 notes this is an irreversible action and a stopping condition if accidental. But the prompt itself doesn't signal that — a participant goes at normal speed. The stopping condition only triggers after an error, not before. | High | Either (a) add a brief visual cue ("This action is final") to the Submit prompt display, or (b) move A-09 to end of the block so it cannot interrupt earlier trials. Recommend option (b) for v1. |
| A-10 | "Delete the selected item." | Confusion pair with A-05 (CLOSE_WIN) flagged in trial table. In practice, "delete" vs "close" is semantically distinct, but under speed/fatigue both involve removing something from view. | Low | Acceptable for v1. Log confusion pair hits. |

**Overall Domain A assessment:** 4 of 10 prompts are clean (A-02, A-03, A-06, A-07, A-08). A-01 and A-09 need attention before external sessions. A-04, A-05, A-10 are acceptable for internal DEV_SESSION runs with a note.

---

## 2. Participant experience walkthrough — Domain B (Text Entry)

**Simulated run-through:** For each target string, mentally stepped through character-by-character or word-chunk-by-word-chunk selection, tracking working memory load.

### Flags raised

| Prompt ID | Target string | Flag | Severity | Proposed fix |
|-----------|--------------|------|----------|--------------|
| B-04 | file: notes.txt | The colon immediately after "file" is unusual. If the character selection interface does not include a colon as a visible option, the participant is stuck. Confirm colon is in the character set. | High | Caleb must verify that ":" is an available selection in the interface before any B-04 trials run. |
| B-05 | go to line 42 | Number entry ("42") requires the interface to support digit selection. If digits are grouped separately from letters, the participant must navigate to a number sub-panel, which is an added step not present for letter-only strings. | Medium | Caleb should confirm the UI path for digit entry. If it requires extra navigation, add a note to the trial instructions ("numbers are in the '123' panel"). |
| B-06 | search: neural | Same colon issue as B-04. | High | Same fix: confirm ":" is available. |
| B-09 | attach: log.csv | Three special characters: colon, period, and extension suffix. If the participant must navigate to a symbols panel for each of these, this trial is significantly harder than the others in Domain B — not just because of content but because of UI friction. This would inflate CER and time-to-completion for non-protocol reasons. | High | Either (a) ensure all special characters are accessible in one panel, or (b) note in the trial instructions that B-09 requires navigation to the symbols panel, and track UI-navigation steps separately from intent errors. |
| B-03 | hello world | Clean. No flags. | — | — |
| B-01, B-02, B-07, B-08, B-10 | Various | Clean — all use common words, no punctuation, no digits. | — | — |

**Overall Domain B assessment:** 3 of 10 prompts have high-severity flags related to special-character availability in the interface (B-04, B-06, B-09). These must be resolved before the first DEV_SESSION that includes these trials. The remaining 7 prompts are clean for v1.

---

## 3. Participant instructions review

From Protocol v1 §5, the instructions read:

> "In this study, you will use [INPUT MODALITY: gesture / simulated input] to control a computer interface. For each trial, a prompt will appear telling you what to do. Your job is to complete the task as accurately and comfortably as you can. Speed matters, but accuracy matters more — do not rush to the point of making errors you would not normally make. You can ask for a prompt to be re-read once. If anything feels unclear or uncomfortable, say stop and we will pause. There are no wrong questions. At the end of each block, you will answer two short questions about your effort level. The session takes 20–35 minutes."

### Flags

1. **"[INPUT MODALITY: gesture / simulated input]"** — The bracket notation must be replaced with the actual modality before reading. The risk is that the operator reads it literally as "[INPUT MODALITY: gesture / simulated input]" which confuses the participant. Caleb's interface should surface the selected modality as a plain-text string that the operator reads directly.

2. **"Speed matters, but accuracy matters more"** — For DEV_SESSION runs where both Caleb and Mark know the system, this instruction doesn't change behavior. For external participants, this framing may cause some people to go very slowly (maximizing accuracy) and others to go at normal speed. The instruction is acceptable for v1 but should be tested for interpretation in a pilot session before external data collection.

3. **"The session takes 20–35 minutes"** — This estimate is unverified for simulated-input sessions. Mark's paper run-through of a full 40-trial session took approximately 28 minutes at a moderate pace. The estimate is reasonable but should be logged and updated after the first DEV_SESSION.

---

## 4. Effort-survey question refinement

### Current questions (Protocol v1 §6)

**Q1 — Physical effort:** "How physically demanding did you find this block?" (1 = not at all demanding, 7 = extremely demanding)

**Q2 — Mental effort / frustration:** "How mentally demanding or frustrating was this block?" (1 = not at all, 7 = extremely)

### Problems identified

**Q2 conflates two constructs:** Mental demand and frustration are related but not identical. A trial could be mentally demanding (requires sustained attention) without being frustrating (it's engaging). Conversely, a broken interface is frustrating without being cognitively demanding. Conflating them into one question makes it impossible to distinguish interface friction (frustration) from cognitive load (mental demand) as sources of user burden.

**Q1 phrasing is unusual for a keyboard/mouse-style interface:** Asking about "physical demand" in a context where the primary input is simulated or wrist EMG may elicit confusion. Participants may not have a frame of reference for "physically demanding" when moving a wrist slightly. This risks all Q1 ratings clustering at 1 (floor effect) — which, combined with low variance, makes Q1 useless as a discriminating measure.

### Proposed refined questions

**Q1 — Physical effort (revised):**  
"How much physical effort did this block require from your arm, wrist, or hand?"  
(1 = none at all, 7 = a lot)

*Why:* More specific to the EMG/gesture context. Anchors "physical" to the relevant body parts rather than the abstract concept of physical demand.

**Q2 — Mental demand (split into two):**  
**Q2a — Cognitive load:**  
"How much mental concentration did this block require?"  
(1 = very little, 7 = a great deal)

**Q2b — Frustration:**  
"How frustrated did you feel during this block?"  
(1 = not at all frustrated, 7 = very frustrated)

*Why splitting matters:* Separating cognitive load from frustration lets us identify whether effort differences between Domain A and Domain B come from working-memory demands (cognitive load, expected higher in B) vs. interface friction (frustration, expected higher in B only if the interface is unclear). This distinction is directly relevant to Protocol v1 §6's honesty limit ("effort ratings are self-report and subject to response bias") — splitting the constructs reduces one source of ambiguity.

### Revised effort block for Protocol v1.1

If the split is adopted, each BLOCK_EFFORT event in the logging schema will need a `frustration` field in addition to `effort_mental` and `effort_physical`. This is a logging schema change — mark as a required addition before the first external session. For Week 2 DEV_SESSION runs, either the current Q2 or the split Q2a/Q2b may be used; log which version was used in the session notes field.

**Decision needed (Caleb):** Accept the Q2 split for v1 now, or keep Q2 combined for Week 2 and split in Protocol v1.1 for Week 3? Recommend accepting the split now — it costs one extra UI field and avoids a protocol change mid-collection.

---

## 5. Summary of actionable items for Caleb's interface build

| Priority | Item | Owner |
|----------|------|-------|
| High | Verify ":" is selectable in Domain B interface before B-04, B-06, B-09 trials | Caleb |
| High | Move A-09 (Submit) to end of block, or add a visual "final action" cue | Caleb (with Mark agreement) |
| High | Confirm digit entry path for B-05 ("42"); add UI note to trial if extra navigation required | Caleb |
| Medium | Surface input modality as plain text in operator view so it is read correctly | Caleb |
| Medium | Accept Q2 split (cognitive load + frustration as separate questions) and add `frustration` log field | Decision: Caleb + Mark |
| Low | Flag A-04 ("assume text is already selected") for external participant version | Mark, Protocol v1.1 |
| Low | Log session duration and update 20–35 min estimate after first DEV_SESSION | Both |

---

## 6. What this document does NOT change

- Protocol v1 version number and date remain 2026-06-08. This document is a review artifact, not a protocol amendment.
- Trial IDs, prompt text, and canonical target strings are unchanged. Flagged prompts are noted for awareness; they remain in v1 as written.
- The logging schema v1 field set is unchanged for this week. The Q2 split would require a schema bump to v1.1, which is a separate decision.
- No data has been collected yet. All flags above apply to pre-collection review only.
