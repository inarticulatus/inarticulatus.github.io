---
title: 'Document In, Cited Output Out: A Pipeline Where Every Cell Links to Its Source'
description: 'An extraction pipeline for regulated documents where every value in the output grid carries a citation back to the document that produced it — and a verification layer that decides whether a value is allowed to stand'
pubDate: 'Oct 01 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
category:
    - projects
    - AI engineering
    - data engineering
---

Built with BFSI documents in mind: regulatory circulars, policy wordings and compliance filings, where a reviewer has to be able to sign off every figure.

## The Problem: A Grid of Numbers Nobody Can Check

Extract a table from a hundred PDFs and you get a spreadsheet. Every cell looks equally
trustworthy, and none of them are.

For a regulated workflow that is the entire problem. A reviewer cannot audit a number
without going back to the source document and finding it themselves. So the grid is
either unusable, because nobody will sign it off, or it is used anyway and the
provenance question is lost.

The specific failure I kept designing against: an extraction pipeline that is
*accurate on average* and completely silent about which rows are wrong. A 96% accurate
grid (illustrative figures) is not the same artefact as a grid where 96% of rows cite
a verifiable source and the remaining 4% are flagged before anyone relies on them.
The second one can be signed off. The first one cannot.

## The Constraint That Drove Everything

Three constraints shaped the design, and they came from the buyer rather than from
engineering preference:

**1. A value without a citation is not output.** If I cannot point at the text that
produced a cell, the cell does not exist. This is a stricter rule than "high
confidence" and it removes the entire class of confident-but-wrong output.

**2. Reproducibility is not a nice-to-have.** A regenerated result that differs from
the previous run is a defect, not a rounding difference. That rules out anything
whose output depends on uncontrolled model state.

**3. Tenant isolation has to be structural.** Not enforced in application code, which
is one forgotten `WHERE` clause away from a cross-tenant leak. Structural means the
database itself enforces the tenant boundary on every row.

## The Design

### Extraction and the cited grid

The pipeline moves a document through upload, chunking, extraction and assembly into
a grid — but the grid is not the data structure. The grid is a *projection* of a
cited-value record. Each record holds the extracted value together with the span of
source text that produced it.

That inversion is the whole design. It means the citation cannot be lost downstream,
because the citation and the value are the same object. A row cannot exist without
its source attached, because there is no representation of a row that omits one.

### The cited-value record

The unit that everything is built around. A row in the grid is a projection of one
of these; the record is the source of truth:

```
cited_value
  value          the extracted value, typed (string | number | date | enum)
  source_span    character offsets into the document: [start, end]
  source_text    the exact substring, stored rather than re-derived
  document_id    which document this came from
  page           page number, so a reviewer can navigate to it
  field_key      which field of the schema this answers
  run_fingerprint  ties the value to the inputs and config that produced it
  verification   Tier 1 verdict: pass | flag, with the rule that produced it
```

Two details are load-bearing. `source_text` is stored rather than re-extracted on
read, so what the reviewer sees is what the rule checked — not a second pass that
might differ. And `verification` travels with the value, so a flagged value cannot
be rendered as a clean cell by a downstream consumer that forgets to check.

### Fingerprint-locked reproducibility

Each run is bound to a fingerprint over the inputs and the configuration used to
process them. A second run over the same fingerprint is expected to reproduce the
prior output; a run that does not is a detectable event rather than a silent
divergence.

This is deliberately conservative. It does not guarantee bit-identical output
throughout. It guarantees that divergence is *visible* — that the system can tell
you when a result would have changed, and against which input.

### Serverless AWS design

The compute is serverless, which suits the load shape: document processing is
bursty, driven by upload events rather than steady traffic. The pipeline is
event-driven between stages, so a long extraction does not hold resources while
waiting for a human, and a failed stage retries from its own boundary rather than
restarting the document.

### Row-level multi-tenant isolation

Tenancy is enforced at the row level, with the tenant key carried through every
stage. The consequence that matters: a query that forgets to filter by tenant returns
nothing rather than another tenant's rows. Failing closed is the only acceptable
default for this data.

I test this rather than assume it. Row-level security is verified by attempting reads
as a second tenant against the first tenant's rows and asserting an empty result, so
a policy regression fails a test instead of passing review.

## Verification

The verification layer is the part that is genuinely live, and it is worth being
precise about scope.

**Tier 1 — rule-based verification — is implemented and running.** Rules check
extracted values against the cited source text: does the cited span actually contain
the value, does the value's type match what the span implies, does the span fall
inside the region of the document the field is supposed to come from. A value that
fails its rules does not ship as a plain cell. It is marked.

**Further tiers are planned and are not built.** Anything beyond Tier 1 should be
read as roadmap, not as capability. I would rather say this plainly than let a
reader infer a maturity level the system does not have.

This is the honest current state: Tier 1 catches the mechanically checkable
failures. It does not yet catch an extraction that is faithful to the wrong
region, or a value that is technically supported but semantically misleading.
Those need judgement a rule set does not have.

## Results

Qualitative, deliberately. I am not publishing throughput, citation-accuracy,
latency or cost figures for this pipeline, because I do not have independently
verified numbers for them and a performance claim I cannot defend is worse than no
claim at all.

What I can state as built:

- Every output value carries a citation to a source span, structurally, not by
  convention
- Tier 1 rule-based verification is live and gates which values ship clean
- Divergence between runs is detectable against an input fingerprint
- Tenant isolation is enforced at the row level and fails closed

## Limits

Worth being explicit, because these define where the system is not useful yet:

1. **Tier 1 is mechanical.** It verifies that a value matches its cited span. It
   does not verify that the span is the *right* span.
2. **No numeric results published**, for the reason above.
3. **Design ahead of build.** The design anticipates verification tiers beyond
   Tier 1; those are roadmap, not capability. Nothing in this write-up should be
   read as a description of a completed system beyond Tier 1.

## Why This Design

The through-line across all of it: make the trustworthy path the only path.

A citation that can be lost downstream is documentation. A citation that is the same
object as the value cannot be lost. A reproducibility guarantee that is checked is
evidence. One that is assumed is a hope. Tenant isolation in application code is a
policy; tenant isolation in the storage boundary is a property.

The goal is not that the pipeline produces a grid. It is that a reviewer can
establish, for any given cell, exactly where it came from — without trusting the
system that produced it.

## Working With Me

This is Craton Labs work (legally Manta Solutions Private Limited), and the engagements are scoped as fixed pieces rather than
open-ended retainers.

**Single-system audit — the entry point.** You send one document set or one LLM
feature. I establish what "supported" means for that system, run the evaluation,
and hand back a severity-ranked findings list with the evidence behind each finding.
Small enough to approve without procurement.

**Evaluation layer build.** The cited extraction pipeline, or an evaluation harness
for an existing system: claim-level grounding, unsupported-claim rate, citation
coverage, traceability to source and version, adversarial and prompt-injection
testing. Built to run against your data, with the harness documented so your team
owns it afterwards.

**Ongoing assurance — the retainer.** A monthly pass over new material or changed
systems, on the same measures, so the evidence a reviewer needs is current rather
than reconstructed under deadline.

**Advisory, documentation and technical testing. Not a legal opinion, and not a
conformity assessment, certification or attestation under any regulatory regime.**
I produce the evidence; your compliance function decides what it means.

Email: [utkarsh@craton-labs.com](mailto:utkarsh@craton-labs.com)
