# Framework Playbooks: GHL Context

## Table of Contents
1. First Principles in GHL
2. Red Team: GHL Attack Vectors
3. Steelman: Defending Design Decisions
4. Y Combinator Lens
5. 80/20: GHL Leverage Map
6. GaryVee: Attention & Channel Strategy
7. NEPQ: Full Sequence Architecture
8. Hormozi: Offer Engineering in Automation

---

## 1. First Principles in GHL

**Core question:** What is the fundamental job this automation is being hired to do?

Strip away every assumption. A "lead follow-up automation" is not a goal; it's a tool. The goal is: *get qualified prospects to show up to a sales call ready to buy*. Or: *reactivate dormant customers to purchase again*. Start there.

**First Principles Decomposition:**

Step 1: Name the single business outcome in one sentence with a number:
> "Move 15 inbound leads per week from inquiry to booked call, with a 60% show rate."

Step 2: Identify the minimum number of touchpoints required to achieve it. Not best practices; minimum; every extra step is a risk, a cost, and a potential failure point.

Step 3: Name the one human emotion that needs to shift between trigger and outcome:
- Is it trust? (they need to believe you can deliver)
- Is it urgency? (they're considering but not moving)
- Is it awareness? (they don't fully understand their problem yet)
- Is it safety? (they're afraid of risk)

Every message in the sequence should serve that one emotional job.

Step 4: Remove anything that doesn't directly serve step 1 through step 3. Common bloat to cut:
- Generic "check in" emails with no specific ask
- Redundant touchpoints on the same day via the same channel
- Automations triggered by tags that never get applied
- Sequences that run past the lead's decision window (most B2C decisions happen within 72 hours)

---

## 2. Red Team: GHL Attack Vectors

Run this attack checklist against every automation:

**Timing Attacks:**
- ⚠️ Messages sent outside 8am–8pm local time? (check timezone settings in GHL contacts)
- ⚠️ First follow-up delayed more than 5 minutes after form submit? (leads go cold fast)
- ⚠️ Gaps longer than 24 hours in a speed-to-lead sequence?
- ⚠️ Sequence ends before the lead has had 7–11 touchpoints? (most conversions happen after touchpoint 5)

**Channel Attacks:**
- ⚠️ SMS going to landlines? (check opt-in source)
- ⚠️ Email domain not warmed? (deliverability failure; check spam score)
- ⚠️ No reply detection? (if lead replies, do they get stuck in a sequence that keeps firing?)
- ⚠️ Voicemail drops used for cold leads? (illegal in some states without prior consent)

**Logic Attacks:**
- ⚠️ What if the lead books a call but the automation doesn't stop? (double-booking, spam experience)
- ⚠️ What if a tag fails to apply? (downstream sequences that depend on it will never fire)
- ⚠️ What if the lead is added to two overlapping automations simultaneously? (contradictory messages)
- ⚠️ Are there orphan contacts, leads tagged but never entered into a relevant sequence?

**Copy Attacks:**
- ⚠️ Does the first SMS sound like spam? ("Hi [FirstName], I saw your inquiry..."): impersonation check
- ⚠️ Are there unsubscribe links missing from cold email sequences? (CAN-SPAM violation risk)
- ⚠️ Is the subject line too salesy? (triggers spam filters)
- ⚠️ Does the automation try to close in the first message? (kills trust instantly)

**Human Handoff Attacks:**
- ⚠️ At what point does a human need to respond, and is there a notification/task assigned?
- ⚠️ Does the automation create a task in GHL when a lead replies but the auto-reply is wrong?
- ⚠️ If a sales rep manually marks a deal closed-won, does the automation stop immediately?

---

## 3. Steelman: Defending Design Decisions

The steelman framework is used when the user is about to change or scrap something. Before recommending removal, ask: *What would have to be true for this to be the right choice?*

**Common steelman cases in GHL:**

"The sequence is too long (10 emails)" - Steelman:
> If the average customer decision cycle for this offer is 14–21 days, a 10-email sequence spread over 3 weeks actually matches the natural buying timeline. Long sequences outperform short ones for high-ticket offers where trust is the bottleneck. Only cut this if the unsubscribe rate is rising after email 4.

"They're sending 3 SMSes in the first hour" - Steelman:
> Research shows the highest contact rate window is minutes 0–5 after a lead opts in. Three SMS in hour one, if the copy escalates properly (curious → helpful → specific ask), can triple show rates compared to a single message. Cut this only if reply rates show no improvement after message 1.

"They have no email, only SMS" - Steelman:
> SMS open rates are 98% vs. 20% for email. For a local service business with fast decision cycles (pest control, HVAC, dental), SMS-only may actually be the right call. Add email only if there's evidence that the lead's buyer journey requires a longer trust period.

Use the steelman BEFORE recommending changes. Show your reasoning. This prevents the trap of "optimizing" away the one thing that's actually working.

---

## 4. Y Combinator Lens

**The YC question for every automation:** Does this make something people want, and can it scale?

**YC Thinking Applied to GHL:**

**PMF Check:**
- Would the lead respond positively to this sequence even if they knew it was automated?
- Is the core offer strong enough that the automation is just logistics, or is the automation trying to compensate for a weak offer?
- If this automation ran for 90 days, would it produce predictable, repeatable revenue?

**Growth Thinking:**
- What is the one metric this automation improves? Track only that metric for 30 days.
- Can this automation be cloned for a second location / second niche without rebuilding it from scratch? If not, it's not scalable.
- What's the referral moment: is there a step in the automation that asks for a referral at the moment of highest satisfaction?

**Retention Play:**
- Does the automation have a post-purchase sequence? Most businesses lose 40% of potential LTV by going silent after the first transaction.
- Is there a re-engagement automation for contacts who went dark after 30/60/90 days?

**Cut Ruthlessly:**
- Remove any step that doesn't directly serve: (a) getting the lead to the next stage, or (b) getting the client to buy again / refer
- "Nurture" emails with no specific CTA are almost always waste. Replace with value+ask.

---

## 5. 80/20: GHL Leverage Map

**The 80/20 rule applied to GHL automations:**

**The 20% that drives 80% of conversions:**

1. **Speed to first contact**: The single highest-leverage variable. Responding within 5 minutes of form submit produces 9x higher contact rates than waiting 1 hour. If only one thing is automated, it must be the immediate first response.

2. **The appointment confirmation + reminder sequence**: Show rate is the primary conversion metric for most service businesses. A 3-part sequence (confirm → 24hr reminder → 1hr reminder) consistently lifts show rates by 20–40%. This automation alone can double revenue.

3. **The "dead lead reactivation"**: 60–70% of leads who didn't convert on first contact can be reopened with a correctly timed reactivation campaign (30/60/90 days). This is free revenue from leads already paid for.

4. **The post-sale referral ask**: Sent at the moment of peak satisfaction (immediately post-delivery or first result), this single automation can produce 20–30% of new revenue at zero CAC.

5. **Inbound reply routing**: When a lead replies to an SMS or email and a human picks it up within 5 minutes, conversion rate increases dramatically. Notification automations that alert reps instantly are worth more than entire nurture sequences.

**The 80% you can deprioritize initially:**
- Multi-channel "value" campaigns with no CTA
- Social proof sequences before the lead has shown buying intent
- Complex conditional branches for edge cases affecting <5% of contacts
- Re-engagement sequences for leads older than 6 months (fix the front end first)

---

## 6. GaryVee: Attention & Channel Strategy

**The core GaryVee insight for GHL:** You're fighting for attention in a world of infinite content. Your automation is competing with TikTok, Instagram, texts from friends, Netflix. If it doesn't grab attention immediately and feel native to the channel, it's invisible.

**Channel-Native Messaging:**

SMS: Think text from a friend. Short. Casual. Specific. No "Dear [FirstName]":
> Good: "Hey [Name], just saw your request about [X]. Quick question before I send you the info: are you looking to start this month or further out? [Rep Name]"
> Bad: "Hello [FirstName], thank you for your interest in our services. We will be in touch shortly."

Email: Think useful content first, ask second. Subject line creates a curiosity gap, not a sales pitch:
> Good subject: "The mistake most [niche] owners make with [problem]"
> Bad subject: "Follow up from [Company Name]"

Voicemail Drop: Use only after 2 failed SMS/email attempts. Sound like a real person leaving a real message. 20–30 seconds max.

DM (FB/IG via GHL): Match the vibe of the platform. Instagram DMs should be shorter and more visual-reference-forward than email.

**The 5-Minute Rule:**
GaryVee's attention economics applied: the lead's attention to your brand is highest in the first 5 minutes after they opt in. Any delay is attention lost. Speed IS the product in the first touchpoint.

**Document the Automation Moments:**
Every touchpoint where a lead positively engages (replies, books, shows up, buys) is a moment worth capturing for content. Build "notify me when X happens" steps into automations so the sales/marketing team can document wins.

**Omnichannel Without Being Annoying:**
Vary the channel every 2 touchpoints. SMS → email → voicemail → SMS → email. Never hit the same channel twice in a row within 24 hours unless the lead engaged on that channel.

---

## 7. NEPQ: Full Sequence Architecture

**Jeremy Miner's NEPQ framework tells us:** People make decisions emotionally and justify rationally. An automation that leads with logic (here are our features, here's our pricing, book a call) bypasses the emotional decision-making process and gets ignored or rejected.

**The NEPQ Automation Arc:**

**Stage 1: Connection (Touchpoints 1–2, Day 0)**
Goal: Make the lead feel seen, not sold to. Open a conversation, not a pitch.
- Never start with: "We'd love to schedule a call!" and this triggers the sales alarm
- Do start with: A question about their situation that shows you understand their world
- Example SMS: "Hey [Name], quick q: what's been the biggest struggle with [specific problem] so far? Just want to make sure what I share is actually useful for where you're at."

**Stage 2: Situation (Touchpoints 3–4, Day 1–2)**
Goal: Understand where they are now without interrogating.
- Ask one question per message, not five
- The question should be answerable in one sentence
- Example: "Are you currently [doing X alternative] or more just getting started exploring options?"

**Stage 3: Problem Awareness (Touchpoints 5–6, Day 3–5)**
Goal: Help the lead articulate their own pain in their own words. You're not telling them they have a problem; you're reflecting it back.
- Share a story or case study that mirrors their problem ("We had a client in [similar situation] who was dealing with [X]...")
- Ask: "Does any of that sound familiar to where you're at?"
- This is where most automations skip to the pitch. Don't.

**Stage 4: Consequence (Touchpoints 7–8, Day 6–10)**
Goal: Amplify the emotional cost of staying stuck. Not fear-mongering, just honest consequence.
- "A lot of people in [their situation] tell us the longer they wait, the [specific negative outcome]. Has that been something you've noticed?"
- This stage should feel empathetic, not pushy. The lead should feel like you get them.

**Stage 5: Solution Bridge (Touchpoint 9+, Day 10–14)**
Goal: The lead is now emotionally primed. Bridge to the offer naturally.
- The offer should feel like the obvious answer to the pain they've been discussing
- "Based on everything you've shared, here's what I think would actually move the needle for you..."
- Include a specific, low-friction CTA: one-click calendar link, not "reach out when you're ready"

**NEPQ in Short Sequences:**
For fast-decision offers (local services, low-ticket), compress to 3 stages:
- Message 1: Connection question
- Message 2: Problem + consequence in one
- Message 3: Solution bridge + CTA

---

## 8. Hormozi: Offer Engineering in Automation

**Core Hormozi equation:** Value = (Dream Outcome × Perceived Likelihood of Achievement) / (Time Delay × Effort & Sacrifice)

Every element of the automation should move one of these four levers.

**Dream Outcome: Make it Specific**
Generic: "We help businesses grow"
Hormozi: "We help [niche] owners go from $X to $Y in 90 days without [common sacrifice]"

Every CTA in the automation should point at the dream outcome with a number and a timeframe. Vague outcomes don't convert.

**Perceived Likelihood:**
Build proof progressively through the sequence:
- Touchpoint 1: Credibility signal (brief, specific: "250 clients in [niche]")
- Touchpoint 3: Social proof (exact quote from customer with their result, not generic praise)
- Touchpoint 6: Risk reversal (guarantee, trial, no commitment first step)
- Touchpoint 9: Case study that mirrors the lead's exact situation

**Time to Value:**
Reduce time to the first micro-win. Can the automation deliver something immediately useful? (free resource, diagnostic, quick win insight). The lead who gets immediate value is 3x more likely to convert.

**Effort & Sacrifice:**
Every step in the automation should ask for the minimum commitment:
- Instead of "schedule a 45-minute strategy call" → "15-minute audit, no prep needed"
- Instead of "fill out this application" → "reply YES and I'll send the details"
- Instead of linking to a long-form page → embed key info in the message itself

**Value Ladder Architecture:**
Map the automation against the value ladder:
```
[Lead Magnet / Free Offer]
         ↓ automation
[Low-ticket tripwire / $27–$97]
         ↓ automation
[Core offer / $500–$5k]
         ↓ automation
[High-ticket / $10k+]
         ↓ automation
[Continuity / recurring]
```
Each automation stage should move the lead up one rung, not skip rungs.

**Grand Slam Offer in Automation:**
Can the automation itself present a stacked offer? E.g., when someone books a call, they're told:
> "You'll also get: [Bonus 1], [Bonus 2], and a [Guarantee], and if [X] doesn't happen by [date], [consequence]. All included when you show up."

This increases show rate dramatically and pre-handles objections before the call.
