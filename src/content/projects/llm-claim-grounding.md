---
title: 'How I Measure Whether an LLM Claim Is Actually Supported by Its Source'
description: 'Claim-level grounding, unsupported-claim rate, and adversarial testing — the three measurements that tell you whether an LLM output can be relied on, rather than merely sounds right'
pubDate: 'Oct 01 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category:
    - projects
    - AI engineering
    - LLM evaluation
---

Built with BFSI documents in mind: regulatory circulars, policy wordings and compliance
filings, where a reviewer has to be able to sign off every figure and every sentence
that asserts one.

## The Measurement That Gets Skipped

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

The design consequence is that you drive the rate down and track it over time,
rather than settling for an acceptable average.

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

This third measurement is the one that tends to surface a problem the first two
score well on, because the first two only examine outputs the system chose to
produce, while adversarial testing examines responses to inputs it did not.

## How the Grounding Decision Is Actually Made

A claim-level grounding metric is only useful if the per-claim decision is itself
measurable. Treating the judge as a black box produces a number nobody can audit,
which defeats the purpose.

The method needs three parts, and they are the parts a sceptical reviewer will ask
about:

**The judge.** Whether a cited span entails a claim is decided by a model — either a
dedicated NLI model classifying the span/claim pair, or an LLM judge given a written
entailment rubric. This choice is the largest single source of variance in the
metric, because the two disagree most often exactly where the claim is loose
("generally requires" vs "requires").

**The calibration set.** The judge is checked against hand-labelled claims — a set
labelled by a person, with the ambiguous cases kept in rather than discarded, since
those are the ones the judge will get wrong.

**The agreement rate.** The proportion of hand-labelled claims the judge reaches the
same conclusion on, reported alongside the metric rather than buried. A grounding
rate of 0.92 means nothing without knowing the judge agrees with a human at what
rate on this kind of material.

> **Not published:** the specific judge, calibration set size and agreement rate
> for this setup are not published here, because I do not have independently
> verified figures for them. A judge-agreement number I cannot defend would weaken
> exactly the claim this page is making — that the measurement is auditable.

## A Concrete Example

*Illustrative, not taken from client material.*

**The question:** *What is the minimum paid-up premium required under the policy?*

**The retrieved chunk:**

> *Section 4.2 — Premium Requirements. The assured must maintain a paid-up premium
> of not less than ₹5,00,000 at all times during the policy period. Where the policy
> is issued on a quarterly basis, the minimum applies at each quarter end. Claims
> arising before the policy inception date are not payable under this contract.*

**The claim the model produced:**

> *The minimum paid-up premium required under this policy is ₹5,00,000, maintained
> at all times during the policy period.*

That claim **passes** grounding. The span states the figure, the figure matches, and
the qualifier survives the paraphrase.

Now the failing variant, same chunk:

> *The minimum paid-up premium is ₹5,00,000 for both quarterly and annual policies,
> and claims from before inception are payable at the insurer's discretion.*

This **fails on three counts**, and a chunk-similarity score would rank it similarly
to the passing one — the vocabulary overlap is almost identical:

1. The chunk's quarterly rule conditions the minimum on the policy being quarterly.
   The claim generalises it to all policies.
2. The chunk excludes pre-inception claims outright. The claim invents a discretion
   that does not exist.
3. Both claims cite the same span, at high similarity to the same question. Only
   claim-level decomposition separates them.

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

## Working With Me

**Single-system evaluation — the entry point.** You send one LLM feature and the
material it retrieves from. I run the evaluation, and hand back a findings list
ranked by severity, with the specific claims that failed, the spans that should
have supported them, and the adversarial cases that broke it.

**Evaluation harness build.** Claim-level grounding, unsupported-claim rate,
citation coverage, version traceability, adversarial and prompt-injection testing —
built against your data, calibrated on hand-labelled claims, and documented so your
team owns the harness afterwards rather than depending on a vendor.

**Ongoing assurance — the retainer.** The same measures, re-run monthly against new
material and changed systems, so the evidence a reviewer needs is current rather
than reconstructed under deadline.

**Advisory, documentation and technical testing. Not a legal opinion, and not a
conformity assessment, certification or attestation under any regulatory regime.**
I produce the evidence; your compliance function decides what it means.

Email: [utkarsh@craton-labs.com](mailto:utkarsh@craton-labs.com)
