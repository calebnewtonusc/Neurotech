# Project 1 — Input Class Definitions v1

**Version:** 1.0  
**Date:** 2026-06-15  
**Author:** Mark Lin  
**Status:** Final — cleared for pilot collection starting June 16.  
**Linked documents:** `week-03/pilot-instructions.md`, `week-02/protocol_v1.md`, `week-02/trial_table.md`

---

## What an input class is

An input class is a distinct, intentional user gesture or action that the Project 1 system must reliably distinguish from all other classes in order to map user intent to a command. The system can only be as good as the discriminability of its input classes — if two classes produce overlapping signals, the decoder will confuse them regardless of model complexity.

**Honest limit:** These class definitions apply to the current Project 1 input modalities: simulated low-bandwidth input and wrist surface EMG (MyoWare 2.0 or MindRove forearm band). EMG measures **muscle activation**, not brain signals. The classes below are muscle-gesture classes, not neural intent classes. Do not describe them as "neural commands" or "brain signals" in any report or application material.

---

## Input class table

Each class must satisfy three criteria to be cleared for formal baseline collection:
1. **Distinctiveness:** Signal features are statistically separable from all other classes in at least 3 pilot sessions.
2. **Repeatability:** The operator can predict the class from the signal alone (above chance) without seeing the prompt.
3. **Fatigue tolerance:** The class can be produced 20+ times in a session without the participant reporting discomfort.

| Class ID | Class name | Gesture description | Primary muscle group targeted | Expected signal signature | Mapping to Protocol v1 command domain |
|----------|-----------|---------------------|------------------------------|--------------------------|---------------------------------------|
| IC-01 | Rest / Neutral | No active gesture; hand and wrist at rest in natural position | None (baseline) | Low-amplitude, low-frequency signal across all channels; used as the "null" reference | Not a command — used for between-trial baseline periods |
| IC-02 | Fist close | Close all fingers into a full fist | Finger flexors (flexor digitorum superficialis, flexor digitorum profundus) | High-amplitude burst across multiple channels; rapid onset | Domain A navigation commands (high-effort, clear intent) |
| IC-03 | Index extension | Extend index finger while other fingers remain loosely closed | Extensor indicis | Moderate-amplitude, channel-specific burst; narrower spread than fist close | Domain A — single-select / confirm action |
| IC-04 | Wrist extension | Extend the wrist upward (dorsiflexion) | Extensor carpi radialis longus and brevis | Channel-specific activation on the dorsal forearm channels | Domain A — navigation (e.g., NAV\_HOME, NEXT\_FIELD) |
| IC-05 | Wrist flexion | Flex the wrist downward (palmar flexion) | Flexor carpi radialis, flexor carpi ulnaris | Channel-specific activation on the ventral forearm channels; distinct from fist close by onset shape | Domain A — undo / back navigation (UNDO, NAV\_HOME) |
| IC-06 | Pinch (thumb-index) | Touch thumb tip to index finger tip | Flexor pollicis longus, first dorsal interosseous | Low-amplitude, high-specificity signal; may be noisy depending on electrode placement | Domain B — character selection / confirm entry |
| IC-07 | Double tap (wrist) | Lightly tap wrist twice in rapid succession (~300ms apart) | Extensor tendons; brief impact artifact | Distinctive paired-pulse pattern; temporal feature (inter-tap interval) is the discriminating signal | Domain A/B — mode switch or submit action (SUBMIT, SAVE\_DOC) |

---

## Simulated input class mapping

When running in SIMULATED mode, each input class is represented by a keyboard key or button press that triggers a synthetic event. The mapping is:

| Class ID | Simulated trigger | Notes |
|----------|-----------------|-------|
| IC-01 | No keypress (timeout/wait) | Rest is implicit between trials |
| IC-02 | Key: `F` | Fist close |
| IC-03 | Key: `I` | Index extension |
| IC-04 | Key: `U` | Wrist extension (Up) |
| IC-05 | Key: `D` | Wrist flexion (Down) |
| IC-06 | Key: `P` | Pinch |
| IC-07 | Key: `T` twice within 400ms | Double tap |

Simulated input bypasses all signal processing and fires a synthetic event directly. It is used to validate the event pipeline, logging schema, and decoding logic independent of hardware. **Simulated events must never be described as EMG or muscle data.**

---

## Class discriminability requirements

For pilot sessions to clear a class for formal baseline use, the following must be observed across ≥ 3 pilot sessions:

| Requirement | Measurement | Threshold |
|-------------|-------------|-----------|
| Above-chance classification | Accuracy of a leave-one-trial-out linear classifier on pilot session data | > 1/N_classes + 0.15 (where N\_classes = number of active classes) |
| Per-class sensitivity | Recall for each class | > 0.70 |
| Confusion pair identification | Pairs of classes with pairwise confusion rate | Flag any pair with confusion rate > 0.20 |
| Operator predictability | Operator can identify class from signal alone (blind to prompt) | > 70% correct on a 20-trial blind test |

**Honest limit:** These thresholds are working criteria for internal pilot evaluation. They are not derived from clinical standards for AAC device classification. They represent a minimum bar for proceeding — exceeding them does not guarantee good performance in the full baseline experiment.

---

## Classes currently at risk

Based on the participant walkthrough and prior literature review, these classes may fail the discriminability requirements:

| Class ID | Risk | Reason | Contingency |
|----------|------|--------|-------------|
| IC-06 | High | Pinch produces low-amplitude signal; placement sensitivity is high; easily confused with IC-03 on some electrode configurations | If IC-06 fails in pilot, replace with a whole-hand squeeze (all fingers simultaneously, sub-maximum force) |
| IC-07 | Medium | Double-tap timing requires consistent inter-tap interval; may be tiring after repeated trials | If IC-07 fails, replace with a sustained hold (any class held for >800ms = mode switch signal) |
| IC-05 | Low | Wrist flexion is anatomically distinct but shares electrode coverage with IC-02 on some armband configurations | Test IC-05 and IC-02 confusion rate explicitly in first pilot session |

---

## Class reduction plan (if needed)

If the kill-switch decision on June 19 proceeds and ≥ 2 classes fail discriminability, the system will operate with a reduced class set. Priority order for retention:

1. IC-02 (Fist close) — highest expected discriminability; maps to majority of Domain A commands
2. IC-04 (Wrist extension) — second-clearest anatomical separation
3. IC-03 (Index extension) — useful for single-select
4. IC-05 (Wrist flexion) — retain if distinct from IC-02
5. IC-06, IC-07 — most likely candidates for removal

A 4-class system (IC-02, IC-03, IC-04, IC-05) is sufficient to run all Domain A trials if command menus are restructured accordingly.

---

## Version history

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-06-15 | Mark Lin | Initial class definitions locked for Week 3 pilot |
