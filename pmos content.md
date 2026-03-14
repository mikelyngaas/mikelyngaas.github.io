# TL;DR

I built this system to help me develop product docs and prototypes very quickly, but without sacrificing first principles and rigor.

And I built it because most vibe coding tools and systems come up short in several ways:

1. **They're not built for 1 -> N.** Many tools are oriented around ~single shotting a greenfield product or feature. But 95% of us are building on existing platforms.
2. **They're not built for doc creation.** Large, impactful feature development require documenting, collaborating on, and executing against deeply considered edge cases and dependencies. These are not easily grokked in prototypes alone.
4. **They're too agreeable.** By default, coding agents err on the side of reinforcing each idea and adding nice to have features, creating bloat.
3. **They do the core product thinking for you.** This may be fine for side projects, but I firmly believe that it's never been more important for product builders to be able to define the core problem, why it's important, and how your solution will differentiate itself in a world of building-is-cheap. Then AI can assist you as you fill in the details.

This system solves each: it 1. requires company & product context, and a design system 2. allows for modular creation of high level product briefs, detailed PRDs, 1-pagers for GTM teams, or technical documentation 3. deploys swarms of personas (Founder/CEO, Design, Tech Lead, QA, Support, GTM) with a high bar for quality and 4. most importantly, requires you -- a human being -- to draft the core product thinking first.

# Get started

Works in Cursor and Claude Code. Clone the repo, open the folder, then invoke @new-feature in chat (or say "I want to start a new feature"). Give it a short name — e.g. smart-notifications — and the AI creates the feature folder, walks you through the PM POV and feature context, then lets you pick an artifact.

[Open in GitHub →](https://github.com/mikelyngaas/product-dev-os)

# Full breakdown

## Inputs

Three inputs feed every artifact:

- **PM POV** — Your read on the problem, why it matters, your hypothesis, your worries, your conviction level. The AI builds on your judgment, not around it.
- **Feature Context** — Raw evidence: customer quotes, support tickets, sales feedback, competitive intel. Messy is fine.
- **Company Context** — Your product vision, north star metrics, quarterly goals, design principles. Set once in `System/company-context.md`, reuse for every feature.

Conviction calibrates how the AI behaves:

| Your conviction | AI mode |
|-----------------|---------|
| **High (80–100%)** | **Sharpen.** Strengthen your framing with evidence. Push for precision. |
| **Moderate (60–79%)** | **Sharpen and challenge.** Build out the framing but also surface 1–2 pressure-test questions. |
| **Low (< 60%)** | **Challenge.** Pressure-test the hypothesis. Surface alternatives. Ask harder questions. |

## Outputs

Five artifact types. Modular — spin off a prototype from the brief as soon as it's ready; you don't need to finish the PRD first. Produce what the feature and its stage require.

| Artifact | What it does | When to use it |
|----------|--------------|----------------|
| **Product Brief** | Aligns the team on problem, goals, and solution direction | Early stage — before detailed requirements |
| **Full PRD** | Detailed requirements and edge cases ready for engineering | Pre-build — after alignment |
| **Interactive Prototype** | Clickable, self-contained HTML visualization of key workflows | From brief or PRD — when stakeholders need to *see* it |
| **GTM 1-Pager** | Sales/CS/marketing primer for a feature | Pre-launch — when GTM teams need enablement |
| **External Docs** | Customer-facing documentation draft | Near or post-launch |

## How it works

Three inputs converge at the Artifact Hub, which routes to the right workflow. Each artifact runs Draft → Review → Revise; the AI simulates the right stakeholders and tags every piece of feedback P0/P1/P2.

```
                    ┌─────────────────────────┐
                    │       PM POV            │
                    │   (your point of view)  │
                    └────────────┬────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                                   │
              ▼                                   ▼
┌─────────────────────────┐         ┌─────────────────────────┐
│    Feature Context      │         │    Company Context      │
│   (raw evidence)        │         │  (strategy & goals)     │
└─────────────┬───────────┘         └───────────┬─────────────┘
              │                                 │
              └────────────┬────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Artifact Hub   │
                  │  (routes to     │
                  │   the right     │
                  │   workflow)     │
                  └────────┬────────┘
                           │
        ┌──────────┬───────┼───────┬──────────┐
        ▼          ▼       ▼       ▼          ▼
     Brief       PRD   Prototype  GTM      Docs
                                1-Pager
```

Review phase uses AI-simulated personas. Each focuses on a different slice (strategy, engineering, UX, compliance, etc.):

| Persona | Description |
|----------|--------------|
| **CEO/Founder** | Strategic lens: right investment at the right time, ROI, opportunity cost, scope prioritization. |
| **Tech Lead** | Engineering reality check: feasibility, architecture, dependencies, risk, build-vs-buy. |
| **Design Lead** | User's advocate: intuitive workflows, cognitive load, edge-case UX, simplification. |
| **QA Lead** | Failure-case thinker: acceptance criteria, edge cases, testability, release readiness. |
| **GTM Lead** | Market-facing strategist: positioning, adoption, packaging/pricing, launch and enablement. |
| **Support Lead** | Customer confusion anticipator: error messaging, documentation, post-launch monitoring. |
| **Legal Lead** | Risk and compliance guardrail: regulatory, contractual, data privacy, disclosures. |
| **Data Science Lead** | Measurement reality check: instrumentable goals, event design, metrics, guardrails. |

## Get started

Works in Cursor and Claude Code. Clone the repo, open the folder, then invoke @new-feature in chat (or say "I want to start a new feature"). Give it a short name — e.g. smart-notifications — and the AI creates the feature folder, walks you through the PM POV and feature context, then lets you pick an artifact. First time only: fill in `System/company-context.md` with your vision and goals.
