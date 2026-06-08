# Week 2 — Pre-registered Hypothesis

**Week:** 2 — Protocol, logging & baseline architecture  
**Dates:** June 8–12, 2026  
**Registered by:** Mark Lin  
**Date registered:** 2026-06-08  
**Status:** LOCKED. This document must not be edited after the first internal test session runs. Any revision requires a new version with a dated rationale.

---

## What this document is

A pre-registered hypothesis locks a falsifiable prediction before data is collected. Its purpose is to prevent post-hoc rationalization of results. Even for internal developer sessions, writing the prediction first is the discipline.

This week's sessions are internal/developer-only (DEV_SESSION). The hypothesis covers what we expect to observe from baseline-mode runs before any predictive assistance is introduced.

---

## Week 2 primary hypothesis

**H1 (Primary — User burden):**  
In baseline gesture-only mode, completing Domain B (text entry) trials will impose significantly higher self-reported mental effort (Q2) than Domain A (command selection) trials, as measured by post-block effort ratings on the 1–7 Likert scale.

**Predicted direction:** Domain B mean Q2 > Domain A mean Q2.  
**Predicted magnitude:** At least 1.5 scale points difference, which would be practically meaningful for a 1–7 scale.

**Rationale:** Text entry via sequential character selection is cognitively more demanding than discrete command selection from a menu: it requires maintaining the target string in working memory across multiple selection steps, whereas command selection collapses intent to a single decision. This difference in working memory load is expected to be the largest driver of subjective mental burden in the baseline condition.

**Honest limit:** With n=2 developers (Caleb and Mark) running internal sessions in Week 2, this hypothesis cannot be tested statistically. Week 2 data will be used to (a) verify the measurement instruments work as intended, (b) generate a directional qualitative observation, and (c) inform the sample size needed for a proper test when external sessions begin.

---

## Week 2 secondary hypothesis

**H2 (Secondary — Latency):**  
Domain A command-selection latency will be lower (faster responses) in Block 3 than Block 1, reflecting intra-session practice effects on a fixed command vocabulary.

**Predicted direction:** Block 3 mean latency < Block 1 mean latency.  
**Predicted magnitude:** 10–25% reduction in median latency.

**Rationale:** Domain A presents the same 10 prompts (in a different pseudorandom order) in both Block 1 and Block 3. Participants are expected to become familiar with the command vocabulary and the interface layout across the session, reducing selection time. This practice effect is expected and not a confound for the baseline measurement — it will be reported and noted so that future multi-session analyses can account for intra-session learning curves.

**Honest limit:** Practice effects on this scale are confounded with fatigue for sessions running over 30 minutes. We will log session duration and flag any session exceeding 35 minutes.

---

## Week 2 tertiary (logging validation) hypothesis

**H3 (Logging check):**  
Every trial event logged by the system will be reconstructible from the session log file with no missing fields. The logged trial order will match the pseudorandom order recoverable from the session's `trial_order_seed`.

**Predicted outcome:** 100% field completeness for all logged trials in DEV_SESSION runs.

**Rationale:** This is a software correctness claim, not a behavioral one. Verifying it now — before any external sessions — ensures the logging schema is trustworthy. A single missing field in a DEV_SESSION is treated as a blocking bug.

**Honest limit:** This check covers the fields defined in `week-02/logging-schema-v1.md`. If new fields are added to the schema, this hypothesis does not cover them and must be extended.

---

## What a confirming result looks like

| Hypothesis | Confirming observation |
|-----------|----------------------|
| H1 | Block 2 and Block 4 (Domain B) Q2 ratings both higher than Block 1 and Block 3 (Domain A) Q2 ratings for both developers |
| H2 | Median latency in Block 3 ≤ median latency in Block 1, across both developers |
| H3 | Zero missing log fields; trial order matches seed reconstruction for all sessions |

---

## What a disconfirming result looks like

| Hypothesis | Disconfirming observation | Implication |
|-----------|--------------------------|-------------|
| H1 | Domain B Q2 ≤ Domain A Q2 | The effort instrument may be too coarse, or the command-selection interface is itself unusually demanding in its current form. Review prompt clarity and menu layout before external sessions. |
| H2 | Block 3 latency ≥ Block 1 latency | Fatigue or interface friction is outpacing practice gains. Investigate session duration and interface feedback. |
| H3 | Any missing log field | Treat as a blocker. Do not proceed to external sessions until the logging system is verified. |

---

## Hypotheses explicitly NOT made this week

The following are things one might hypothesize but which are out of scope for Week 2 data:

- **We do not claim** that the baseline accuracy rates observed in DEV_SESSION runs are representative of external participants.
- **We do not claim** that simulated-input CER estimates will match real EMG CER.
- **We do not claim** that Block 3 latency improvements will persist across sessions (that is a Week 9 question).
- **We do not claim** that predictive assistance will reduce effort — that is the Week 5+ hypothesis.

---

## Sign-off

Hypotheses H1, H2, and H3 are locked as of 2026-06-08. The first DEV_SESSION data collected against Protocol v1 will be evaluated against these predictions. Results will be recorded in the Week 2 Friday artifact regardless of whether they confirm or disconfirm the hypotheses.

| Role | Name | Date |
|------|------|------|
| Protocol author | Mark Lin | 2026-06-08 |
| Implementation reviewer | Caleb Newton | (to be signed at first session) |
