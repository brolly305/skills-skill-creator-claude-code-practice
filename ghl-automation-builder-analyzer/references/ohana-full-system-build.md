# Ohana Full-System Build: The 10-Layer AI & Automation System

This file maps the 10-layer "Real Estate AI & Automation System" infographic onto Ohana's GHL sub-account. Ohana is the pilot. Once it is running and measured, the same structure becomes the productized template sold to other agency clients (real estate teams, other home-service businesses).

Read `ohana-profile.md` first. Tags, pipeline stages, segments, and custom fields referenced here are defined there unless marked **NEW**.

**What changes from the infographic, and why:**

| Infographic assumes | Ohana reality | Adaptation |
|---|---|---|
| Goal is booking an appointment | Goal is photo submission and a remote quote | Layer 5 books walkthroughs only for Priority A or jobs photos can't scope |
| Buyer / Seller / Investor tags | Attorney / Realtor / Direct consumer | Segment tags from the profile |
| Hot / Warm / Cold scoring | Priority A-D pipeline stages | Numeric score drives the stage |
| AI voice agent answers calls | Many callers are grieving families | Voice AI is Phase 3, and only after SMS AI has been reviewed |
| Property alerts and market updates | Not relevant | Replaced with a partner "refer a client" form and quarterly partner updates |
| Transaction milestones | Deposit, job date, completion, documentation | Layer 7 follows the cleanout job lifecycle |

**Governance constraints that apply to every layer** (from `ohana-app/CLAUDE.md`):
- The AI must say it is an AI if asked. It never claims to be human.
- Copy stays respectful and free of pressure. No fake urgency, no "only 2 slots left."
- No invented testimonials or results in any template.
- Nothing is sent to real contacts until the owner approves the copy and runs the end-to-end test.
- Ohana branding stays separate from HOL Creative Solutions.

---

## Build Phases (Critical Path)

A2P 10DLC approval is the critical path. Nothing SMS-based can go live until it clears. Every other item has float and should be built while A2P is pending.

| Phase | Layers | Goes live when | Est. build time |
|---|---|---|---|
| **1. Foundation** | 6 (CRM), 2 (Capture), 1 (Sources) | Now, email-only until A2P clears | 2-3 days |
| **2. Response engine** | 3 (AI SMS/chat), 4 (Qualify), 5 (Walkthroughs) | A2P approved + 1 week of AI in Suggestive mode | 3-4 days |
| **3. Lifecycle** | 7 (Job lifecycle), 9 (Reporting) | After first 5 jobs run through Phase 2 | 2-3 days |
| **4. Scale** | 8 (Integrations), 10 (Growth), Voice AI | After 30 days of Phase 2-3 data | Ongoing |

---

## Layer 6: CRM & Pipeline (build first; everything writes into it)

### 6.1 Pipeline
Build **Ohana Cleanout Pipeline** with the 10 stages in `ohana-profile.md`, in order:
New Lead, Scored / Qualifying, Priority A, Priority B, Priority C, Priority D, Walkthrough Scheduled, Quote Sent, Won, Lost.

Also build a second pipeline, **Referral Partners**:
Identified, Outreach Sent, Responded, Call Scheduled, Active Partner, Cold.

### 6.2 Custom fields
Existing (from profile): Property Address, Property Size, Urgency Level, Referral Source Name, Lead Source Article, Job Value Estimate, Photos Received.

**NEW:**

| Field | Type | Purpose |
|---|---|---|
| Lead Score | Number | Drives Priority A-D routing |
| Job Type | Dropdown: Estate Cleanout / Junk Removal / Downsizing / Commercial / Other | Routing and reporting |
| Deadline Date | Date | Probate, closing, or lease-end date if the lead has one |
| Walkthrough Needed | Checkbox | Set when photos can't scope the job |
| Job Date | Date | Scheduled cleanout date |
| Deposit Paid | Checkbox | Gate between Quote Sent and Won |
| Documentation Recipient Email | Text | Attorney or executor who gets the before/after photo report |
| Lost Reason | Dropdown: Price / Timing / Went with another vendor / No response / Not a fit / Other | Reactivation and reporting |

### 6.3 Tags
Use the full dictionary in `ohana-profile.md`. **NEW** tags:

| Tag | Meaning |
|---|---|
| `ai-handoff` | AI passed the conversation to a human |
| `walkthrough-needed` | Photos insufficient, site visit required |
| `job-complete` | Cleanout finished |
| `review-requested` | Review ask sent |
| `review-left` | Customer confirmed review |
| `partner-referral-submitted` | Lead came in through the partner referral form |

### 6.4 Internal notifications
- Every Priority A lead: SMS + push to owner immediately.
- Every `ai-handoff`: SMS to owner with a link to the conversation.
- Daily 7:30am email to owner: new leads, quotes awaiting follow-up, jobs today.

---

## Layer 2: Capture

### 2.1 Photo Quote Request form (primary conversion form)
Fields, in this order:
1. First name, Last name
2. Mobile phone, Email
3. Property address (maps to Property Address)
4. What do you need help with? (Job Type)
5. Property size (Property Size)
6. When does it need to be done? (Urgency Level)
7. Is there a specific deadline date? (Deadline Date, optional)
8. **Upload photos of the rooms** (file upload, multiple, optional; sets Photos Received)
9. How did you hear about us? (dropdown, feeds the source tag if no UTM)
10. SMS consent checkbox (required wording for A2P; unchecked by default)

Form submit text: "Thank you. We have your request and will reply by text shortly. If you haven't added photos yet, you can reply to our text with them."

Embed on: homepage, every service page, every BabyLoveGrowth article CTA (with UTMs), and as the Facebook ad destination.

### 2.2 Partner "Refer a Client" form (NEW, for attorneys and realtors)
Fields: partner name, partner email, client name, client phone, client email, property address, deadline date, notes, "OK to contact the client directly?" (yes/no).

Hidden field: `source = referral-attorney` or `referral-realtor` (two copies of the form, or one form with a partner-type dropdown). Send each active partner their own link.

### 2.3 Landing pages
- **/quote**: short page, one headline, the Photo Quote form, three trust points (licensed and insured, donation coordination, documentation for executors). No testimonials until real ones exist.
- **/partners**: for attorneys and realtors. What Ohana handles, how documentation works, the Refer a Client form.

---

## Layer 1: Lead Sources and Attribution

One workflow per source that tags on entry. Reuse the `source-*` tags from the profile.

| Source | Entry point | How it's tagged |
|---|---|---|
| Facebook / Instagram ads | GHL Facebook lead form integration or /quote with `utm_source=facebook` | `source-facebook-ad` |
| Google search / ads | /quote with UTM, or GHL call tracking number | `source-google-search` |
| BabyLoveGrowth articles | /quote with `utm_source=blog&utm_campaign=<slug>` | `source-seo-blog`, campaign copied to Lead Source Article |
| Short-form video (Blotato: TikTok, YouTube) | Link in bio pointing to /quote with `utm_source=tiktok` or `youtube` | `source-shortform-video` |
| Attorney / realtor referral | Refer a Client form | `source-referral-attorney` / `source-referral-realtor` |
| Inbound calls | GHL tracking number, missed-call text-back | `source-inbound-call` (**NEW**) |
| Word of mouth | "How did you hear" = Friend/family | `source-referral-other` |

**W01: Source Attribution** (trigger: Form Submitted, any Ohana form)
If/Else on UTM source or form hidden field, add the matching tag, copy `utm_campaign` into Lead Source Article, then add to workflow W02.

**W01b: Missed-Call Text-Back** (trigger: Call Status = missed/no answer on Ohana number)
Wait 1 minute, then SMS: "Hi, this is Ohana Property Services. Sorry we missed your call. How can we help? If it's about clearing a property, a few photos by text are all we need to get you a number." Tag `source-inbound-call`.

---

## Layer 3: Instant AI Response

### 3.1 W02: Speed-to-Lead (trigger: Contact Created or Form Submitted)
1. Create opportunity in Ohana Cleanout Pipeline, stage **New Lead**.
2. **If Photos Received = true:** SMS: "Hi {{contact.first_name}}, this is Ohana Property Services. We got your request and your photos for {{contact.property_address}}. We'll review them and get back to you with a number. Is there anything in the home we should know about, like items the family wants to keep?"
3. **Else:** SMS: "Hi {{contact.first_name}}, this is Ohana Property Services. Thank you for reaching out about {{contact.property_address}}. Could you text us a few photos of the main rooms, garage, and basement if there is one? That's all we need to give you a number, no visit required."
4. Email with the same message plus the direct photo upload link.
5. Move to **Scored / Qualifying** and run W03 (scoring).
6. Hand the conversation to the Conversation AI bot (3.2).

Until A2P clears, steps 2-3 are email only and W01b is off.

### 3.2 Conversation AI bot (SMS + website chat widget)
**Mode:** Start in **Suggestive** mode (AI drafts, a human approves each reply) for at least 7 days or 25 conversations, whichever is later. Review drafts daily. Switch to **Auto-Pilot** only after the owner signs off. This is the reversible version of AI response.

**Bot goals, in order:**
1. Get photos of the property.
2. Confirm property address, rough size, and timeline or deadline.
3. Find out who they are (executor/family, attorney, realtor).
4. Hand off to a human for pricing.

**Bot instructions (paste into the bot's prompt field):**
```
You are the text assistant for Ohana Property & Transition Services, an estate
cleanout and junk removal company in Columbus, Indiana. Many people writing to
you have recently lost a family member or are going through a hard transition.
Be warm, brief, and patient. Never rush or pressure anyone.

Your job is to collect what Ohana needs to give a quote:
- photos of the main rooms, garage, basement, and outbuildings
- the property address
- roughly how big the property is
- whether there is a deadline (probate, a closing date, a lease ending)
- whether they are family/executor, an attorney, or a realtor

Rules:
- You are an AI assistant. If anyone asks whether you are a person or a bot,
  say plainly that you are an AI assistant for Ohana and that a person on the
  team will handle their quote.
- Never give a price, price range, or estimate. Say the team will review the
  photos and send a number.
- Never promise a specific date. Say the team will confirm scheduling.
- Do not give legal, tax, or probate advice. Suggest they ask their attorney.
- If they mention a loss, acknowledge it simply ("I'm sorry for your loss")
  and continue gently. Do not dwell on it or use it to sell.
- Ohana removes, donates, and disposes of items. It does not move people,
  sell items, run auctions, or provide storage. If they need those, say so
  kindly.
- Keep messages under 320 characters.

Hand off to a human (stop replying and add the tag ai-handoff) when:
- they ask to talk to a person
- they ask about price after photos are submitted
- they are upset, confused, or complaining
- they ask a legal question
- anything is outside the rules above
```

**W04: AI Handoff** (trigger: tag `ai-handoff` added)
Turn off bot for contact, notify owner (6.4), create task "Reply to {{contact.name}}" due in 1 hour during business hours.

### 3.3 Voice AI (Phase 3, not now)
Hold until Conversation AI has 30 days of reviewed transcripts. When added: answer only after hours, disclose AI in the first sentence, collect name/address/callback number, and text the photo request. Log decision per `07_Conformance_Corpus.md` before enabling.

---

## Layer 4: Qualify & Nurture

### 4.1 W03: Lead Scoring (trigger: Contact Changed on Urgency Level, Property Size, Photos Received, or source tag added)
Reset Lead Score to 0, then add:

| Signal | Points |
|---|---|
| Urgency: Urgent (<7 days) | +40 |
| Urgency: Standard (2-4 weeks) | +20 |
| Urgency: Flexible | +5 |
| Size: 4BR+ or Commercial | +30 |
| Size: 3BR | +20 |
| Size: 2BR | +10 |
| Size: 1BR | +5 |
| Tag `source-referral-attorney` or `source-referral-realtor` | +20 |
| Photos Received = true | +10 |
| Job Type = Estate Cleanout | +10 |

Then move the opportunity:
- **70+** to Priority A: owner notified immediately, call within 1 hour.
- **45-69** to Priority B: quote within 24 hours.
- **25-44** to Priority C: email quote within 48 hours.
- **Under 25** to Priority D: quote when capacity allows.

*Assumption:* point weights are a first guess, not measured. After 30 leads, compare score against Won/Lost and adjust. Revision trigger: if more than 30% of Won jobs came from C/D, the weights are wrong.

Build this with GHL's Math Operation action on the Lead Score field (or the native Lead Scoring feature if enabled in the account; check which is available before building).

### 4.2 W05: Photo Nudge (trigger: enters Scored / Qualifying AND Photos Received = false)
- +24h: SMS: "Hi {{contact.first_name}}, just checking in. Whenever you have a minute, a few photos by text are all we need. No rush."
- +72h: Email with upload link and a short note on what photos help most.
- +7d: SMS: "Would it be easier for us to come see the property instead? Reply WALK and we'll set up a time." (Reply WALK sets Walkthrough Needed and runs W06.)
- Exit on: Photos Received = true, reply received, or tag `do-not-contact`.

### 4.3 W07: Quote Follow-Up (trigger: stage = Quote Sent)
Tag `quote-sent`, then:
- +24h: SMS: "Hi {{contact.first_name}}, did the quote for {{contact.property_address}} come through okay? Happy to answer any questions."
- +72h: Email: restate what's included (removal, donation coordination, disposal, before/after documentation) and how to confirm.
- +7d: SMS: "If the timing isn't right yet, that's completely fine. Just let us know when you're ready and we'll pick it back up."
- +14d: no reply, move to Lost, Lost Reason = No response, run W11 reactivation.
- Exit on: reply, Deposit Paid = true, or stage change.

### 4.4 W08: Partner Nurture (Referral Partners pipeline)
Use the A1/B1 drafts in `ohana-outreach-drafts.md` for first touch and the A2/B2 bumps for follow-up.
- Reply received: `partner-responded`, move to Responded, notify owner.
- Call booked: `partner-call-scheduled`.
- No reply after 10 business days: `partner-cold`, move to Cold, enter 90-day reactivation.
- Active partners: quarterly email with a short update (capacity, turnaround, any new service) and their Refer a Client link. No manufactured stats.

---

## Layer 5: Walkthroughs (Book Appointments)

Ohana's primary CTA stays photo submission. Calendar booking exists only for jobs photos can't scope.

### 5.1 Calendar
**Ohana Walkthroughs**: 30-minute slots, 30-minute buffer for travel, available only on days the owner sets, synced to Google Calendar, 24-hour minimum notice unless Priority A.

### 5.2 W06: Walkthrough Booking (trigger: Walkthrough Needed = true or tag `walkthrough-needed`)
SMS with calendar link: "Here's a link to pick a time for us to stop by: {{calendar.link}}. It usually takes about 20 minutes."

### 5.3 W09: Walkthrough Confirmation & Reminders (trigger: Appointment booked on Ohana Walkthroughs)
- Move to Walkthrough Scheduled.
- Immediately: confirmation SMS + email with address, time, and reschedule link.
- -24h: reminder SMS.
- -2h: reminder SMS: "We'll see you at {{appointment.start_time}}. If you need to move it, just reply here."
- No-show (status = no-show): +1h SMS: "Looks like we missed each other today. No problem at all. Want to pick another time? {{calendar.link}}" Then +3d same by email. Then exit to Priority C.
- Reschedule/cancel: GHL native handling; on cancel, SMS offering photos as the alternative.

---

## Layer 7: Job Lifecycle (Deal Management)

### 7.1 W10: Won to Job Complete (trigger: Deposit Paid = true, or stage manually set to Won)
1. Move to Won. Remove tags `quote-sent`, `follow-up-1`, `follow-up-2`.
2. SMS + email confirmation: job date, what to expect, what to set aside (items the family is keeping, important papers, photos, keepsakes).
3. **If Documentation Recipient Email is set:** email that recipient: "Ohana has been engaged for {{contact.property_address}}. You'll receive before/after documentation when the job is complete."
4. -2 days from Job Date: reminder SMS with arrival window. Ask them to confirm access (keys, lockbox code).
5. Job Date: create internal task "Before photos" at start, "After photos + donation receipts" at end.
6. When tag `job-complete` is added: send the documentation email (before/after photos, donation receipts) to the customer and to Documentation Recipient Email. Include the invoice or balance link.

Deposit collection: use GHL Payments (Stripe) invoice or payment link from the quote. If Ohana's Jobber-style app (`ohana-app/`) is the system of record for invoices, mark Deposit Paid manually until a webhook is built (Layer 8).

### 7.2 W12: Review Request (trigger: tag `job-complete`)
- +2 days: SMS: "Thank you for trusting us with {{contact.property_address}}, {{contact.first_name}}. If you have a minute, a short Google review helps other families find us: {{review.link}}". Tag `review-requested`.
- +7 days, no `review-left`: one gentle email with the same ask. Then stop. No third ask.
- Use GHL Reputation Management to catch any rating of 3 or below and notify the owner before replying.

### 7.3 W13: Post-Job Referral and Nurture (trigger: tag `job-complete`)
- +30 days: email: "If you know anyone else going through a move, a loss, or a cleanout, we'd be glad to help them the same way."
- If lead came from a partner: email the partner a thank-you and a one-line job summary (with the customer's permission; no private details).
- +6 months, +12 months: short check-in email. Many estate clients handle a second property or know someone who is.

### 7.4 W11: Lost-Lead Reactivation (trigger: stage = Lost)
Tag Lost Reason is required. Then:
- +30d (`reactivation-30`): "Hi {{contact.first_name}}, just checking in on {{contact.property_address}}. If anything has changed, we're here."
- +60d (`reactivation-60`): short email with photo quote link.
- +90d (`reactivation-90`): final SMS. Then move to long-term nurture (quarterly email only).
- Skip entirely if Lost Reason = Not a fit or tag `do-not-contact`.

---

## Layer 8: Integrations

| Integration | Purpose | Phase | How |
|---|---|---|---|
| LC Phone (GHL Twilio) | SMS, calls, tracking numbers | 1 | Native; A2P registration in progress |
| LC Email (Mailgun) | Email sending | 1 | Native; domain warming in progress |
| Google Calendar | Walkthrough sync | 2 | Native calendar integration |
| Stripe via GHL Payments | Deposits and invoices | 3 | Native |
| Facebook Lead Ads | Ad lead capture | 2 | Native |
| Google Business Profile | Reviews, messages | 2 | Native |
| Conversation AI | SMS and chat AI | 2 | Native (OpenAI underneath) |
| Blotato | Scheduled short-form posts to TikTok and YouTube (link in bio to /quote with UTMs) | 2 | Blotato MCP from Claude sessions; content plan in `content-engine-integration.md` |
| BabyLoveGrowth | SEO articles with UTM'd CTAs | Live | Already publishing |
| `ohana-app` (Jobber-style app) | Jobs, quotes, invoices | 4 | GHL outbound webhook on Won creates the client and job in the app; app webhook back sets `job-complete` |
| Slack or owner SMS | Notifications | 1 | SMS to owner is enough at current volume |

Blotato gap: Ohana has TikTok and YouTube connected. Facebook in Blotato is connected to HOL Creative Solutions pages, not an Ohana page. Connect an Ohana Facebook page and Instagram before posting there, so the two brands stay separate.

---

## Layer 9: Reporting

Build one GHL dashboard, **Ohana Weekly**:

| Widget | Question it answers |
|---|---|
| New leads by source (bar) | Which channels produce leads |
| Lead-to-photo rate | Is speed-to-lead working |
| Photo-to-quote time (avg) | Is the team keeping up |
| Quote-to-won rate by Priority | Is the scoring model right |
| Won revenue by source | Which channels produce money, not just leads |
| Pipeline value by stage | What's in flight |
| AI handoff count | How often the bot needs help |
| Active referral partners | Is the partner channel growing |

Review weekly for the first 8 weeks. Do not report benchmark numbers from other businesses as Ohana results.

---

## Layer 10: Scaling & Productizing

What becomes reusable for other clients once Ohana has 60 days of data:

1. **GHL snapshot** of the sub-account: pipelines, fields, tags, forms, calendar, workflows W01-W13, dashboard. Strip Ohana copy into `{{placeholders}}`.
2. **Adaptation table** per industry (the one at the top of this file). For a real estate team: segments become buyer / seller / investor, photo submission becomes home valuation or search criteria, walkthroughs become showings/consultations, job lifecycle becomes transaction milestones.
3. **Bot prompt template** with the fixed safety rules (AI disclosure, no pricing, handoff triggers) and a variable business section.
4. **Measured results from Ohana**, only once they exist. Until then, sell the build, not a result.

---

## Master Workflow Index

| ID | Name | Trigger | Phase |
|---|---|---|---|
| W01 | Source Attribution | Form submitted | 1 |
| W01b | Missed-Call Text-Back | Missed call | 2 (after A2P) |
| W02 | Speed-to-Lead | Contact created / form submitted | 1 (email), 2 (SMS) |
| W03 | Lead Scoring | Scoring fields change | 2 |
| W04 | AI Handoff | Tag `ai-handoff` | 2 |
| W05 | Photo Nudge | Qualifying without photos | 2 |
| W06 | Walkthrough Booking | Walkthrough Needed | 2 |
| W07 | Quote Follow-Up | Stage = Quote Sent | 2 |
| W08 | Partner Nurture | Referral Partners pipeline | 1 |
| W09 | Walkthrough Confirm & Reminders | Appointment booked | 2 |
| W10 | Won to Job Complete | Deposit Paid | 3 |
| W11 | Lost-Lead Reactivation | Stage = Lost | 3 |
| W12 | Review Request | Tag `job-complete` | 3 |
| W13 | Post-Job Referral & Nurture | Tag `job-complete` | 3 |

## Go-Live Checklist
- [ ] A2P 10DLC approved
- [ ] Email domain warmed (spam test passes)
- [ ] Owner has read and approved every SMS and email above
- [ ] Test contact run through every workflow W01-W13 using a personal phone and email
- [ ] Conversation AI reviewed in Suggestive mode for 7 days / 25 conversations
- [ ] Owner notifications confirmed arriving
- [ ] Unsubscribe / STOP handling tested
- [ ] Decision logged in `ohana-app/docs/governance/07_Conformance_Corpus.md` format
