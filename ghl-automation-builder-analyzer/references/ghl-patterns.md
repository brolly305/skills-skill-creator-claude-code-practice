# GHL Automation Patterns & Templates

## Table of Contents
1. Speed-to-Lead (Inbound Form/Ad)
2. Appointment Confirmation & Reminder Sequence
3. No-Show Re-engagement
4. Dead Lead Reactivation (30/60/90 Day)
5. Post-Sale Nurture & Upsell
6. Referral Request Automation
7. Pipeline Stage Automations
8. Review Request Sequence
9. Webinar / Event Follow-up
10. Long-Term Nurture (Cold Leads)

---

## 1. Speed-to-Lead Automation

**Trigger:** Form submit, Facebook Lead Ad, Google Ads conversion, ClickFunnels webhook
**Goal:** Contact lead within 5 minutes and qualify for next step

**Automation Map:**
```
TRIGGER: Form submitted / Lead ad fires
↓
IMMEDIATE (0 min):
  - Add tag: "new-lead"
  - Enter pipeline: "Leads" → Stage: "New"
  - Assign to rep (round robin or specific)
  - Create task: "Call [FirstName] NOW" → Due: 5 min
  - SMS: Connection question (see copy below)
↓
5 MIN (if no reply):
  - Email: Follow-up with more context + single CTA
↓
1 HOUR (if no reply):
  - SMS: Second touch, different angle
  - Voicemail drop (if enabled)
↓
DAY 1, 9AM (if no reply):
  - SMS: Third touch, offer/value angle
  - Email: Case study or social proof
↓
DAY 2, 9AM (if no reply):
  - SMS: Consequence question (NEPQ Stage 4)
↓
DAY 3, 9AM (if no reply):
  - SMS: Final ask, "Still interested?" one-liner
  - Email: Last chance + direct CTA
↓
DAY 7 (if no reply):
  - Remove from sequence
  - Add tag: "unresponsive-7d"
  - Move pipeline to "Nurture"
  - Enter: 30-day reactivation sequence

EXIT CONDITIONS:
  - Lead replies to any message → pause sequence, create task for rep
  - Lead books appointment → remove from this sequence, enter "Appointment Confirmed" sequence
  - Lead says STOP/unsubscribe → remove from all sequences, add tag "opted-out"
  - Rep marks "not interested" → remove, tag "closed-lost"
```

**Copy Templates:**

SMS Day 0 (Connection):
> "Hey [FirstName], saw your info come through about [topic]. Quick question before anything else: are you looking to [solve X] in the next 30 days, or more just exploring options right now? [RepName]"

SMS Day 0, 1 hour:
> "[FirstName], just want to make sure my last message went through. No pressure either way, just want to point you to the right resource. [RepName]"

SMS Day 1:
> "Hey [FirstName], I help [niche] owners [achieve specific outcome] without [common sacrifice]. Curious if that's relevant to where you're at? Happy to share what's worked for others in your situation."

SMS Day 3 (Final):
> "[FirstName], I'm going to close out your file unless I hear otherwise. If timing's off, totally get it; just want to make sure I'm not clogging up your inbox. Worth a quick chat? [CalendarLink]"

---

## 2. Appointment Confirmation & Reminder Sequence

**Trigger:** Contact books appointment (Calendly webhook / GHL calendar)
**Goal:** Maximize show rate, target 60%+ for qualified leads

**Automation Map:**
```
TRIGGER: Appointment booked
↓
IMMEDIATE:
  - SMS: Confirmation + what to expect (copy below)
  - Email: Confirmation with calendar invite + pre-work (optional)
  - Add tag: "appointment-booked"
  - Move pipeline to "Appointment Set"
↓
24 HOURS BEFORE:
  - SMS: Reminder + confirm intent
  - Email: Reminder with what you'll cover on the call
↓
1 HOUR BEFORE:
  - SMS: Final reminder + join link if video call
↓
DURING WINDOW (if no show):
  - 5 min after start: Create task "Call [FirstName]: may be running late"
  - 15 min after start: SMS "Are you still able to join? We can start a few minutes late"
↓
POST-CALL (manual trigger by rep):
  - Rep marks "Showed" → enter post-show sequence
  - Rep marks "No-Show" → enter no-show re-engagement sequence

EXIT CONDITIONS:
  - Appointment cancelled → enter re-scheduling sequence
  - Appointment rescheduled → restart confirmation sequence
  - Deal marked "Won" → enter post-sale sequence
```

**Copy Templates:**

SMS Confirmation (Immediate):
> "You're confirmed for [Day] at [Time] with [Rep/Company]. I'll send a reminder the day before. Here's what we'll cover: [2-3 bullet outcomes]. Looking forward to it! [Name]"

SMS 24hr Reminder:
> "Hey [FirstName], just a reminder you're booked tomorrow at [Time]. Still on? If anything's changed, here's the link to reschedule: [Link]. See you then!"

SMS 1hr Reminder:
> "[FirstName], we're on in 1 hour. Here's your join link: [Link]. Talk soon!"

---

## 3. No-Show Re-engagement

**Trigger:** Rep marks contact as "No-Show" (or pipeline stage change)
**Goal:** Re-book within 48 hours while intent is still warm

**Automation Map:**
```
TRIGGER: Pipeline stage → "No-Show" OR tag "no-show-applied"
↓
15 MIN AFTER:
  - SMS: Soft check-in (not accusatory)
↓
2 HOURS AFTER:
  - SMS: Reschedule offer with specific times
↓
NEXT DAY, 10AM:
  - Email: What they missed + second chance CTA
↓
DAY 3:
  - SMS: Final re-engage attempt
↓
DAY 7 (if no response):
  - Move to "Dead Leads" → enter 30-day reactivation

EXIT CONDITIONS:
  - Lead books new appointment → exit, enter appointment confirmation sequence
  - Lead replies → create task, pause sequence
```

**Copy Templates:**

SMS 15min after:
> "Hey [FirstName], we missed you just now. Everything okay? Happy to pick up whenever works for you. [Name]"

SMS 2hr after:
> "[FirstName], I have [Tuesday at 2pm] or [Wednesday at 10am] open. Either of those work? [CalendarLink]"

---

## 4. Dead Lead Reactivation (30/60/90 Day)

**Trigger:** Tag applied ("unresponsive-30d" / "unresponsive-60d") or pipeline stage
**Goal:** Re-open 15–20% of cold leads; this is free pipeline from already-paid traffic

**Automation Map:**
```
TRIGGER: 30 days of inactivity OR specific tag
↓
DAY 0:
  - SMS: Pattern interrupt, totally different angle from original outreach
  - Email: New case study or result (proof-forward, no pitch)
↓
DAY 3:
  - SMS: Consequence angle, cost of not acting
↓
DAY 7:
  - Email: New offer angle, new bonus, price change, limited availability
↓
DAY 14:
  - SMS: Breakup message, genuine and not manipulative
↓
DAY 30 (60-day sequence only):
  - SMS: Major news hook ("We just [launched X / achieved Y for clients] and thought of you")
↓
DAY 60 (90-day sequence only):
  - Final email: Clean slate re-introduction

EXIT CONDITIONS:
  - Lead engages → create task, remove from reactivation
  - Lead books → enter appointment sequence
  - Lead opts out → tag "opted-out", remove permanently
```

**Copy Templates:**

30-Day SMS (Pattern Interrupt):
> "Random question [FirstName], are you still dealing with [specific problem from their original inquiry]? Asking because we just helped a [similar person] go from [X] to [Y] in [timeframe] and figured it was worth a shot. [Name]"

Breakup SMS:
> "Hey [FirstName], I'm going to stop reaching out after this. No hard feelings at all; I know timing matters. If you ever want to revisit [specific offer/topic], just reply here and I'll pick it up. Take care. [Name]"

---

## 5. Post-Sale Nurture & Upsell

**Trigger:** Pipeline → "Won" / payment received / contract signed
**Goal:** Deliver quick win → build relationship → upsell to next tier

**Automation Map:**
```
TRIGGER: Deal won / payment confirmed
↓
IMMEDIATE:
  - SMS: Personal welcome from rep or owner
  - Email: Onboarding + what to expect next
  - Add tag: "active-client"
  - Remove from all prospect sequences
  - Move to "Client" pipeline
↓
DAY 3:
  - SMS: Check-in on early experience
↓
DAY 7:
  - Email: First value delivery / milestone check
↓
DAY 14:
  - SMS: "How's it going?" (genuine relationship touch)
↓
DAY 30:
  - Email: First result highlight + referral ask
  - Task created for rep: "Call [FirstName]: 30-day check-in"
↓
DAY 45:
  - Email/SMS: Upsell introduction, next rung of value ladder
↓
DAY 60:
  - Upsell follow-up
↓
DAY 90:
  - Review request sequence triggered (see #8)

EXIT CONDITIONS:
  - Client upgrades → enter new service onboarding
  - Client cancels/churns → enter win-back sequence
  - Client refers someone → add referrer tag, enter referral reward sequence
```

---

## 6. Referral Request Automation

**Trigger:** Day 30 post-purchase OR manual tag "ready-for-referral-ask"
**Goal:** Generate 1 referral per 5 clients, zero CAC new customer

**Copy Template (SMS):**
> "Hey [FirstName], quick one. We've had some great results together with [specific outcome]. Do you know 1-2 other [type of person] who might be dealing with [same problem]? If so, just send me their name + number and I'll take great care of them. [Name]"

**Email Subject:** "Quick favor from a happy client?"
> "Hi [FirstName], I've loved working with you on [X]. If the results have been worthwhile, the best compliment you can pay is an introduction to someone who might benefit too. No pressure, and if you know someone, just reply here with their info or forward this email to them. Thank you genuinely. [Name]"

---

## 7. Pipeline Stage Automations

**Best practice:** Every stage change should trigger at minimum:
1. A task assigned to the responsible person
2. An internal notification
3. A tag update

**Common stage-change automations:**

Stage → "Proposal Sent":
- Wait 24 hours → SMS: "Did you get a chance to look at the proposal? Happy to answer any questions."
- Wait 48 hours → Email: FAQ pre-empting top objections
- Wait 72 hours → Task: "Call to follow up on proposal"

Stage → "Negotiating":
- Create task: "Decision expected by [date]: check in 48 hours before"
- Internal notification to sales manager

Stage → "Closed Won":
- Trigger post-sale sequence (see #5)
- Notify fulfillment team (webhook or internal notification)
- Update CRM tags, pipeline, contact record

Stage → "Closed Lost":
- Add tag "closed-lost-[reason]" (track loss reasons)
- Enter 90-day reactivation sequence
- Remove from all active sales sequences

---

## 8. Review Request Sequence

**Trigger:** Project complete / service delivered / 90 days post-purchase
**Goal:** 30%+ of clients leave a Google/Facebook review

**Automation Map:**
```
TRIGGER: Tag "service-complete" applied
↓
DAY 0:
  - SMS: Personal thank-you + review ask (copy below)
↓
DAY 3 (if no review):
  - Email: Review request with direct link + why it matters
↓
DAY 7 (if no review):
  - SMS: Final ask, lighter touch

EXIT CONDITIONS:
  - Contact clicks review link → tag "review-requested", stop sequence
  - Contact leaves review → manually tag "reviewed", remove from sequence
```

**SMS Copy:**
> "Hey [FirstName], [Rep Name] here. Really enjoyed working with you on [X]. If you had a great experience, would you mind leaving us a quick Google review? It takes 60 seconds and helps us a ton: [Direct Link]. No pressure, and thank you either way! 🙏"

---

## 9. Webinar / Event Follow-up

**Trigger:** Webinar registration / attendance tag applied by Zoom/integration

**Registered but Didn't Attend:**
```
Day 0 (1hr after event): 
  - SMS: "Missed you today; here's the replay: [link]"
  - Email: Full replay + key takeaways summary
Day 2:
  - SMS: "Did you get a chance to watch? What part was most relevant to you?"
Day 4:
  - Email: Case study related to webinar topic
Day 7:
  - Soft CTA: Next step offer
```

**Attended Full Webinar:**
```
Immediate post-event:
  - SMS: "Thanks for joining today! What was your biggest takeaway?"
  - Email: Replay + resources + offer summary
Day 1:
  - SMS: "Did [specific insight] from today apply to your situation?"
Day 3:
  - Email: Case study + offer CTA (price/deadline if applicable)
Day 5:
  - SMS: Urgency/deadline reminder if offer is time-limited
```

---

## 10. Long-Term Nurture (Cold / Not-Yet-Ready Leads)

**Trigger:** Leads not ready in speed-to-lead sequence → tagged "long-term-nurture"
**Goal:** Stay top-of-mind for 12 months; capture leads when they become ready

**Cadence:**
- Twice per month: Value email (tip, insight, case study, no hard pitch)
- Once per month: SMS check-in
- Quarterly: Re-qualification attempt ("Has anything changed for you?")

**Content framework for nurture emails:**
1. One actionable insight they can use today (no product mention)
2. One social proof element (client result, brief and specific)
3. Soft CTA: "If you ever want to talk about applying this to [their situation], I'm here."

**The key:** Nurture sequences fail when they're 80% pitch and 20% value. Flip it. The contact should feel like they're getting a free newsletter from a smart expert, not a sales drip.

---

## GHL Technical Notes

**Tag Naming Convention (recommended):**
- Status tags: `status-new`, `status-qualified`, `status-booked`, `status-won`, `status-lost`
- Source tags: `source-fb-ad`, `source-google`, `source-referral`, `source-organic`
- Sequence tags: `in-speed-to-lead`, `in-nurture-30d`, `in-post-sale`
- Action tags: `opted-out`, `reviewed`, `referred`, `unresponsive-7d`

**Always use "Remove from Workflow" actions when:**
- Lead books an appointment (remove from all prospecting sequences)
- Lead pays (remove from all sales sequences)
- Lead says STOP or opts out (remove from everything, legal requirement)
- Lead enters a new, higher-priority sequence

**Webhook integrations to build first:**
- Calendly → GHL (appointment data, cancellations)
- Stripe → GHL (payment confirmation → trigger post-sale sequence)
- Typeform/JotForm → GHL (detailed intake data)
- Facebook Lead Ads → GHL (native integration in GHL)
