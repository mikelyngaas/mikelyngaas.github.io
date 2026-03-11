# Feature Risk Mitigator — Full Decision Tree

Reference document for the logic and content powering [risk.html](risk.html). Source: [The Product Risk Cheatsheet](https://medium.com/p/5b4bc6164181).

---

## 1. Entry Points

```
                    ┌─────────────────────────┐
                    │   Feature Risk Mitigator  │
                    │        (Intro)          │
                    └───────────┬────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
   ┌──────────────────────┐            ┌──────────────────────┐
   │ "I know my biggest   │            │ "Help me figure      │
   │  risk"               │            │  it out"              │
   └──────────┬───────────┘            └──────────┬───────────┘
              │                                   │
              ▼                                   ▼
   ┌──────────────────────┐            ┌──────────────────────┐
   │ Pick a risk bucket    │            │ Diagnostic (3 Qs)    │
   │ (8 options)           │            │ → scores summed      │
   └──────────┬───────────┘            └──────────┬───────────┘
              │                                   │
              └─────────────────┬─────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Results: risk bucket   │
                    │  + common signs         │
                    │  + mitigation cards     │
                    │  (+ secondary risk if   │
                    │   runner-up score > 2)  │
                    └─────────────────────────┘
```

- **Path A (I know my risk):** User selects one of 8 risk buckets → show that bucket’s results.
- **Path B (Help me figure it out):** User answers 3 questions → scores are summed per risk key → results show the **top-scoring** risk; if the **second** risk has score **> 2**, it appears as a “You may also want to watch for…” secondary risk with a link to view its mitigations.

---

## 2. Diagnostic Questions & Scoring

Scores are **additive**. Each selected option adds the listed points to the corresponding risk keys. After all three questions, the risk key with the **highest** total is the primary result; the second-highest is shown as secondary only if its total is **> 2**.

### Question 1: Where are you in the product process?

| Option | Label | Scores (riskKey: points) |
|--------|--------|---------------------------|
| 1 | Problem shaping — we're still choosing or defining the problem to solve | coreValue: 4, pricing: 1 |
| 2 | Solution shaping — we're designing the solution (before or early in build) | coreValue: 2, usability: 3, execution: 1 |
| 3 | Building — we're actively building | execution: 3, usability: 2, coreValue: 1 |
| 4 | Launched — we're live in market | distribution: 3, pricing: 2, usability: 1 |

### Question 2: What keeps you up at night?

| Option | Label | Scores |
|--------|--------|--------|
| 1 | Customers won't actually want this | coreValue: 5 |
| 2 | Users won't be able to figure it out | usability: 5 |
| 3 | Nobody will know about it or try it | distribution: 5 |
| 4 | Customers won't pay enough for it | pricing: 5 |
| 5 | We can't build it reliably | execution: 5 |
| 6 | A competitor will beat us to it | copycat: 5 |

### Question 3: How many people need to take action for your product to deliver value?

| Option | Label | Scores |
|--------|--------|--------|
| 1 | Just the end user — they sign up and get value directly | (none) |
| 2 | An admin sets it up, then end users adopt it | multiplayer: 4, distribution: 1 |
| 3 | Multiple teams or stakeholders need to coordinate | multiplayer: 5, distribution: 2 |

---

## 3. Risk Buckets (Display Order)

**Main risks (shown first):**  
coreValue → usability → distribution → pricing → execution  

**Niche risks (under “Niche risks” label):**  
multiplayer → copycat → compliance  

---

## 4. Risk Bucket Content

For each bucket: **key**, **name**, **emoji**, **description**, **common risks**, **mitigations** (name, description, time).

---

### coreValue — Core Value Risk  
**Emoji:** 😬  

**Description:** The feature doesn't solve a real problem, or the solution isn't meaningfully better than the status quo.

**Common risks:**
- The feature doesn't solve a real problem.
- The solution is not a step function better than the status quo.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Revisit fundamentals | Crisp up your target audience and what you're solving for them. If you can't articulate the problem in one sentence, you're not ready to build. | 1–2 days |
| Write the press release first | Amazon style: write the headline and the "so what?" for customers before building anything. If the press release isn't compelling, the product won't be either. | Half a day |
| Ask the magic wand question | Ask prospects and customers: "If you had a magic wand, how would [X painful process] work?" Their answers reveal the real shape of the problem. | 5+ customer calls |
| Run alpha tests | Test prototypes and scrappy v1s to measure value delivered prior to expensive building. Validate the core value loop before investing in polish. | 1–2 weeks |
| Talk to people who rejected or churned | Prospects who evaluated and passed, or users who left a competitor, reveal value gaps you can't see from current customers. | 5–10 interviews |

---

### usability — Usability Risk  
**Emoji:** 🕹️  

**Description:** Customers can't figure out how to use the product, hit friction early, or lose trust due to bugs.

**Common risks:**
- Customers don't know how to set it up.
- Customers hit a cold start problem.
- Customers find it too complex or confusing.
- Customers experience bugs that erode trust.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Measure time-to-value and clicks-to-value | Count the literal steps between signup and the first moment of value. Then ruthlessly reduce friction at each step. | 2–3 days |
| Run small, targeted UXR | Don't boil the ocean. Run focused usability studies on specific onboarding and activation workflows where you suspect drop-off. | 1–2 weeks |
| Revisit UX first principles | If you were designing this feature from scratch — no existing product surfaces, no debt — how would it work? Use this as a north star. | 1 day workshop |
| Run a detailed bug bash | In addition to automated tests, run a hands-on bug bash to find the edge cases and paper cuts that erode customer trust. | Half a day |

---

### distribution — Distribution Risk  
**Emoji:** 📦  

**Description:** Customers don't know the feature exists, don't think it's for them, or your GTM team isn't ready to sell it.

**Common risks:**
- Customers aren't aware that the feature exists.
- Customers don't think the feature is "for them" or understand its benefits.
- Go-to-market team isn't prepared to market or sell it.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Simulate first-time use (FTU) | Walk through the experience as a brand new user and as an existing user. Understand your "hook" — the moment that makes someone want to try it. | 1 day |
| Nail down value props with GTM early | Don't wait until launch week. Work with marketing and sales to articulate value props and test messaging as early as possible. | 2–3 days |
| Run a bug bash with EPD and XFN | Get cross-functional teammates hands-on with the product early. This builds familiarity, surfaces issues, and creates internal champions. | Half a day |
| Build in-product discovery surfaces | Announcements, contextual tooltips, nudges in adjacent workflows. Don't rely solely on email or GTM to drive awareness — the product itself is your best distribution channel. | 1–2 weeks |

---

### pricing — Pricing Risk  
**Emoji:** 💰  

**Description:** Customers don't think the product is worth the cost, or pricing changes trigger backlash.

**Common risks:**
- Customers don't think it's worth the cost.
- Widespread community backlash to price increases.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Partner with a customer advisory board | Work with friendly customers and advisors to pressure-test your pricing strategy before it goes live. Their reactions will preview the market's. | 2–4 weeks (ongoing) |
| Run willingness-to-pay exercises | Use Van Westendorp or Gabor-Granger methods to understand price sensitivity. Know your ceiling before you set a number. | 1–2 weeks |
| Prepare comms for best, worst, and middle case | Write the customer email for each scenario. If the worst-case email makes you queasy, your pricing plan needs more work. | 2–3 days |

---

### execution — Execution Risk  
**Emoji:** 🔧  

**Description:** Technical constraints, third-party dependencies, or performance limits threaten the product's viability.

**Common risks:**
- Changes to 3rd party APIs, AI models, or services de-stabilize the feature.
- Technical limitations threaten viability and force UX or capability trade-offs.
- Performance thresholds can't be met.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Build redundancies on key dependencies | If you depend on a single vendor (e.g., one AI model), make your product compatible with alternatives. Don't let one partner's outage become your outage. | 1–2 weeks |
| Build a Proof of Concept first | Tackle the most technically challenging piece before anything else. A working PoC tells you whether the whole bet is viable. | 1–2 weeks |
| Forecast outlier usage | Ask "what happens if one customer 100x's their usage?" Simulate extreme load and edge cases on your systems before they happen in production. | 2–3 days |
| De-risk the critical path first | Sequence your roadmap around uncertainty, not ease. Work on the hardest, most uncertain piece first — don't save the scariest bet for last. | Ongoing (planning approach) |

---

### multiplayer — Multiplayer Risk (niche)  
**Emoji:** 👥  

**Description:** Adoption requires multiple people to act — usually a buyer/admin to set it up and end users to adopt it — reducing your odds of activation.

**Common risks:**
- User A (buyer/admin) must set up the feature before User B (end user) can get value.
- Either side of the activation chain can drop off, killing adoption.
- Awareness, setup, and value delivery are spread across different people.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Map the full activation chain | Document who does what, in what order, and where each person might drop off. You can't fix a funnel you haven't mapped. | 1 day |
| Reduce setup burden on User A | Make admin configuration dead simple or offer guided setup. Every extra step for the buyer is a chance for the chain to break. | 1–2 weeks |
| Build pull mechanics for User B | Give end users a reason to engage — notifications, shared value, visible benefit. Don't rely on admins to evangelize for you. | 1–2 weeks |
| Consider a single-player fallback | Can you deliver some value even if only one side has adopted? A product that works solo and shines with a team is easier to land. | 1–2 weeks |

---

### copycat — Copycat Risk (niche)  
**Emoji:** 👀  

**Description:** A competitor ships a newer or better version of your product and steals market share.

**Common risks:**
- A competitor launches a similar feature with more resources.
- Your differentiation erodes as the market matures.
- Customers switch because alternatives are cheaper or bundled.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Identify your defensible moat | What's genuinely hard to replicate? Data, network effects, deep integrations, proprietary workflows. If the answer is "nothing," you have a strategy problem. | 1–2 days |
| Accelerate time-to-market | Shrink your cycle time so you ship before competitors can react. Speed is a moat when your team can sustain it. | Ongoing (process change) |
| Build switching costs | Integrations, workflows, and accumulated data that make it painful to leave. The best switching costs are ones customers are grateful for. | 2–4 weeks |

---

### compliance — Compliance Risk (niche)  
**Emoji:** 📜  

**Description:** New legislation or regulatory requirements threaten the viability of the product or its distribution.

**Common risks:**
- New legislation threatens the product's viability.
- Regulatory requirements differ across markets or regions.
- Data handling or privacy rules constrain product capabilities.

**Mitigations:**

| Name | Description | Time |
|------|-------------|------|
| Engage legal and compliance stakeholders early | Don't wait until the product is built to ask "is this allowed?" Loop in legal during the design phase, not the launch phase. | 1–2 days |
| Design for configurability | Make it easy to toggle features, data handling, or distribution by region or regulation. Flexibility now saves painful rework later. | 2–4 weeks |
| Build audit trails and data controls from day one | Logging, consent management, and data export capabilities are exponentially harder to bolt on after launch. | 2–4 weeks |

---

## 5. Result Selection Logic (Code)

- After the diagnostic, `diagnosticScores` is an object: `{ riskKey: totalPoints, ... }`.
- Sort entries by `totalPoints` descending.
- **Primary result:** `sorted[0].riskKey` (or `'coreValue'` if empty).
- **Secondary result (optional):** `sorted[1].riskKey` only if `sorted[1].totalPoints > 2` and `sorted[1].riskKey !== primary`.

---

*Last updated to match risk.html (problem/solution shaping Q1, emojis: distribution 📦, usability 🕹️, “View all risks” in results footer).*
