---
title: 'How I Measure Whether an LLM Claim Is Actually Supported by Its Source'
description: 'Claim-level grounding, unsupported-claim rate, and adversarial testing — the three measurements that tell you whether an LLM output can be relied on, rather than merely sounds right'
pubDate: 'Oct 02 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category:
    - AI engineering
    - LLM evaluation
---

## The Measurement Nobody Runs

Ask whether an LLM output is reliable and you usually get a confidence score, a
quality rating, or a general sense that it read well. None of those answer the
question a reviewer actually has, which is narrower and harder:

> **Is this specific claim supported by the text it cites?**

An output can be fluent, well-formatted, entirely confident, and still be wrong. It
can also contain a single fabricated figure inside an otherwise excellent answer.
A single holistic score cannot distinguish those cases, because it averages across
them — and the one bad claim is the only part anyone will care about.

So I measure at the claim level instead.

## Three Measurements

### 1. Claim-level grounding

Break the output into its individual factual claims. For each one, ask whether the
cited source actually entails it.

The important discipline is being strict about what "entails" means. It is not
topical relevance — the citation being *about* the same subject is not support. It is
not surface overlap — the words matching is not entailment. The cited text has to
contain enough information to make the claim true on its own.

Grounding is reported per claim, so a response is not "mostly good" — it is a set of
claims, each of which is either supported or not.

### 2. Unsupported-claim rate

The proportion of claims that fail the grounding check. This is the number I
actually put in front of a reviewer, because it is the one that cannot be
massaged by a good overall impression.

It has a useful property: it is comparable across runs. A prompt change that leaves
tone identical and drops the unsupported-claim rate is a real improvement. A change
that improves the writing and raises the rate is a regression, however good it
reads.

The design consequence is that you want a low rate, not an average one. Optimising
for "mostly right" produces systems whose failure mode is invisible.

### 3. Adversarial and prompt-injection testing

Grounding measures claims the system made. Adversarial testing measures what it
does when pushed.

- **Prompt injection:** can content in a retrieved document instruct the model to
  change its answer? A document is data, not instruction, and the model has to hold
  that line under adversarial phrasing.
- **Adversarial prompts:** construct questions where the retrieved context does not
  contain the answer. The correct behaviour is abstention, not a plausible guess.
- **Abstention testing:** does the system actually abstain when it should? A system
  that answers everything has a zero abstention rate and a hidden cost — the
  unsupported claims are still being produced, just less visibly.

This third measurement is the one that most often reveals a problem the first two
score well on.

## A Concrete Example

A retrieved chunk from an internal policy document, presented as a citation for a
question about an eligibility condition.

The two failure modes to check for:

**Mode A — the citation is on-topic but does not support the claim.** The chunk
discusses the general area, and the claim is a specific threshold. Grounding at the
claim level catches this. A chunk-similarity score does not, because the chunk is
highly similar to the question.

**Mode B — the document text contains an instruction.** The chunk includes a line
formatted like guidance to an assistant. A system that treats retrieved text as
instruction will follow it, and will do so while producing output that still cites
the chunk — so the citation looks clean while the answer is compromised.

Mode A is a measurement problem. Mode B is a trust boundary problem. A system can
score well on the first and still be exploitable through the second, which is why
they are separate tests rather than one aggregate.

## What This Does Not Do

Two honest limits:

1. **Grounding is not correctness.** A claim can be faithfully supported by a source
   that is itself wrong or out of date. Citation quality and truth are different
   properties.
2. **Rule-based checks catch mechanical failures only.** This is the same boundary
   as the verification tiers in my extraction pipeline — Tier 1 verifies that a value
   matches what its source says. It does not verify that the source is right, or
   that it is the right source. Further tiers are planned and are not built.

That boundary is worth stating because it is where most of these systems overclaim.
A grounding metric is a real measurement, and it is still a partial one.

## Why I Care About This

Because the interesting failure mode is not the system being visibly wrong. It is
the system being wrong in a way that looks auditable — clean citations, confident
prose, plausible numbers. The only defence is to measure the specific claim rather
than the impression, and to be honest that even that measurement has limits.

The goal is not to make AI sound right. It is to make it show its work.
