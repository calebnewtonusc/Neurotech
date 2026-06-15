# Project 1 — Pilot Session Notes Template

**Instructions for use:** Copy this file for each pilot session. Rename the copy to `pilot-session-notes-YYYYMMDD-N.md` (where N is the session number that day). Fill in every field before, during, and after the session. Do not leave fields blank — write "none" or "N/A" if there is genuinely nothing to record. A session notes file with blank fields is unusable for the hardware kill-switch decision on June 19.

---

## Session header

| Field | Value |
|-------|-------|
| Session date | |
| Session number (today's count) | |
| Session ID (from log file) | |
| Session type | PILOT\_SESSION |
| Operator name | |
| Participant code | |
| Input modality | SIMULATED / MYOWARE\_EMG / MINDROVE\_EMG (circle one) |
| Calibration completed? | Yes / No / Skipped (if SIMULATED) |
| Calibration notes (if any) | |
| Session start time | |
| Session end time | |
| Total blocks completed | |
| Total trials completed | |

---

## Pre-session checklist

Mark each item. If any item is NO, explain why in the "Pre-session issues" field below.

| Item | Status |
|------|--------|
| Input device connected and signal present | YES / NO |
| Preprocessing pipeline running | YES / NO |
| Event logger initialized, session ID generated | YES / NO |
| Session notes template open | YES / NO |
| Environment quiet | YES / NO |
| Participant instructions read aloud | YES / NO |

**Pre-session issues (if any):**  
*(Write "none" if all checks passed)*

---

## Warm-up observations

**Warm-up result:** PASS / FAIL  
**If FAIL — reason:**  

**Classes that fired correctly during warm-up:**  
*(List class IDs that produced a registered event — e.g., IC-02, IC-04)*

**Classes that did NOT fire during warm-up:**  
*(List class IDs that failed to register or produced ambiguous signal)*

**Signal quality observation:**  
*(Describe the signal visually — clean, noisy, intermittent, saturated, etc.)*

---

## Per-block notes

### Block 1

**Trials completed:** (out of 20)  
**Timeouts:** (count)  
**Device faults:** (count)  

**Input classes that performed reliably:**  
*(Class IDs that consistently registered and appeared distinct)*

**Input classes with problems:**  
*(Class IDs that missed, misfired, or were confused with another class)*

**Specific trial incidents:**  
*(Describe any individual trial that was notable — unexpected signal, participant hesitation, wrong class fired, etc.)*

**Operator signal-quality rating (1–5):**  
*(1 = very poor / unusable, 3 = workable with concerns, 5 = clean and reliable)*

---

### Block 2

**Trials completed:** (out of 20)  
**Timeouts:** (count)  
**Device faults:** (count)  

**Input classes that performed reliably:**  

**Input classes with problems:**  

**Specific trial incidents:**  

**Operator signal-quality rating (1–5):**  

---

### Block 3 (if run)

**Trials completed:** (out of 20)  
**Timeouts:** (count)  
**Device faults:** (count)  

**Input classes that performed reliably:**  

**Input classes with problems:**  

**Specific trial incidents:**  

**Operator signal-quality rating (1–5):**  

---

### Block 4 (if run)

**Trials completed:** (out of 20)  
**Timeouts:** (count)  
**Device faults:** (count)  

**Input classes that performed reliably:**  

**Input classes with problems:**  

**Specific trial incidents:**  

**Operator signal-quality rating (1–5):**  

---

## Stopping conditions triggered

*(Check all that apply and provide details)*

| Condition | Triggered? | Details |
|-----------|-----------|---------|
| DISCOMFORT\_STOP | YES / NO | |
| BLOCK\_TIMEOUT (3+ consecutive timeouts on one class) | YES / NO | Which class: |
| DEVICE\_FAULT\_TERMINAL | YES / NO | |
| Logging failure (missing fields / wrong timestamps) | YES / NO | |
| Participant requested stop | YES / NO | |

---

## Post-session debrief responses

**Q1 — "Were there any input gestures that felt unclear, ambiguous, or hard to produce consistently?"**  
*(Verbatim or close paraphrase of participant response)*

**Q2 — "Did any part of the interface seem to misread your intent?"**  
*(Verbatim or close paraphrase)*

**Q3 — "Did you notice fatigue in your hand, wrist, or arm? If so, after how many trials?"**  
*(Verbatim or close paraphrase)*

---

## Operator overall assessment

**Signal quality summary:**  
*(1–2 sentences. Be specific: which channels were noisy, which classes were clean, what the SNR looked like subjectively.)*

**Class discriminability assessment:**  
*(For each class, was it reliably distinct from others? Use the format: IC-02: reliable / IC-06: confused with IC-03 / etc.)*

**Classes flagged for redesign or removal:**  
*(List class IDs with reason. If none, write "none.")*

**Logging system status:**  
*(Was the log file complete? Were all fields populated? Any anomalies in timestamps or event order?)*

**Fatigue observations:**  
*(Did participant performance change over the session? After which block? Any visible changes in gesture quality?)*

**Recommended changes before next pilot session:**  
*(Specific, actionable items — e.g., "Re-center electrode band before Block 1," "Remove IC-06 from class list," "Increase calibration trial count to 15.")*

---

## Kill-switch relevance

This section feeds directly into the June 19 hardware kill-switch decision. Answer honestly.

**Does this session's data support continuing with the current input modality?**  
YES / NO / UNCERTAIN — *explain:*

**If UNCERTAIN or NO — what specific change would move this to YES?**  
*(Be specific: "Switch from SIMULATED to MyoWare EMG and repeat," "Reduce to 4-class system," "Fix electrode placement protocol," etc.)*

**Session log file path:**  
*(Exact filename of the .jsonl session log)*

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Operator | | |
| Second reviewer (optional) | | |
