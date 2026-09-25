# Ohana Property & Transition Services: Business Profile

Use this file as the discovery context whenever this skill is applied to Ohana's GHL sub-account. Skip the Phase 1 discovery questions for any information covered here.

---

## Business Identity

**Company:** Ohana Property & Transition Services LLC
**Location:** Columbus, Indiana
**Website:** ohanapropertyexperts.com
**GHL Sub-Account:** Active (separate sub-account within the agency)

**Core service:** Estate cleanout and junk removal, full-property clearing of homes after a death, downsizing, or court-ordered estate liquidation. Services include furniture removal, donation coordination, debris disposal, and full-property documentation. The home is delivered empty, clean, and market-ready.

**NOT:** Senior move management, moving company, auction house, or storage service. Ohana removes and disposes; they do not move people or sell items.

**Core business mechanic:** Photo-based quoting. Leads submit photos of the property; Ohana quotes remotely without requiring an in-person walkthrough for every inquiry. This is the key conversion step, not a phone call or calendar booking. All CTAs and automations should drive toward photo submission, not "book a call."

---

## Services (from site)

1. **Estate Cleanout**: Complete property clearing for probate, inherited homes, and family estates
2. **Junk Removal**: Single-item to whole-house junk and debris removal
3. **Donation Coordination**: Sorting and routing usable items to local charities/thrifts
4. **Property Documentation**: Before/after photo documentation for estate attorneys and executors
5. **Senior Downsizing Support**: Clearing the former home (not the move itself)
6. **Commercial Cleanout**: Office and commercial property clearing

---

## Target Customer Segments

### Segment A: Probate Attorneys (Referral Partners)
- **Who:** Estate/probate attorneys in Bartholomew County and surrounding counties (Columbus, IN area)
- **Pain point:** Their personal representative clients are overwhelmed and under time pressure (60-day probate inventory deadlines). Attorneys don't have a reliable cleanout vendor to refer; they scramble each time.
- **What they want:** A single trusted vendor they can hand off to immediately when probate opens, someone who documents everything and doesn't create liability.
- **Outreach segment:** A1 / A2 sequences
- **GHL tag:** `segment-probate-attorney`

### Segment B: Realtors (Referral Partners)
- **Who:** Realtors in Columbus, IN who list estate properties, inherited homes, and downsizing situations
- **Pain point:** Estate listings can't go live until the home is cleared. Delays cost them listing dates and commissions.
- **What they want:** A reliable cleanout crew that works around their staging timeline and doesn't slow down the deal.
- **Outreach segment:** B1 / B2 sequences
- **GHL tag:** `segment-realtor`

### Segment C: Direct Consumer (Estate Executors / Family)
- **Who:** Personal representatives, heirs, or family members handling an estate in or near Columbus, IN
- **Pain point:** Overwhelmed by the sheer volume of belongings, don't know where to start, often have a hard deadline (property sale, court date, lease end)
- **What they want:** Someone who handles everything so they don't have to
- **Inbound channels:** Facebook ads, Google search, word of mouth, referrals from A/B partners
- **GHL tag:** `segment-direct-consumer`

---

## GHL Pipeline: Ohana Cleanout Pipeline (9 Stages)

| Stage | Meaning | Primary Action |
|-------|---------|---------------|
| New Lead | Just entered system | Fire speed-to-lead automation |
| Scored / Qualifying | Responded, gathering info | Collect property address + photo request |
| Priority A | High-urgency, high-value job | Call within 1 hour |
| Priority B | Medium job, flexible timeline | Quote within 24 hours |
| Priority C | Small job or uncertain | Email quote within 48 hours |
| Priority D | Very small or low margin | Deprioritize, still quote |
| Walkthrough Scheduled | Site visit confirmed | Send confirmation + reminder |
| Quote Sent | Price delivered | Follow up at 24hr and 72hr |
| Won | Job confirmed, deposit paid | Trigger post-sale onboarding sequence |
| Lost | No-go for any reason | Tag reason, enroll in 90-day reactivation |

---

## Tag Dictionary

### Source Tags (applied on lead entry)
| Tag | Source |
|-----|--------|
| `source-facebook-ad` | Meta/Facebook lead ad |
| `source-google-search` | Google organic or paid |
| `source-referral-attorney` | Probate attorney referral |
| `source-referral-realtor` | Realtor referral |
| `source-referral-other` | Other word-of-mouth referral |
| `source-seo-blog` | BabyLoveGrowth article CTA |
| `source-shortform-video` | Munch clip social CTA |

### Segment Tags
| Tag | Meaning |
|-----|---------|
| `segment-probate-attorney` | Contact is a probate/estate attorney |
| `segment-realtor` | Contact is a licensed realtor |
| `segment-direct-consumer` | Contact is an estate executor or family member |

### Status Tags
| Tag | Meaning |
|-----|---------|
| `photo-submitted` | Lead sent property photos |
| `quote-sent` | Quote delivered to lead |
| `follow-up-1` | First follow-up sent |
| `follow-up-2` | Second follow-up sent |
| `partner-responded` | Referral partner replied to outreach |
| `partner-call-scheduled` | Partner call booked |
| `partner-active` | Active referral relationship established |
| `partner-cold` | No response after 10 days, in reactivation queue |
| `reactivation-30` | In 30-day reactivation sequence |
| `reactivation-60` | In 60-day reactivation sequence |
| `reactivation-90` | In 90-day reactivation sequence |
| `do-not-contact` | Opted out |

---

## Custom Fields (GHL)

| Field Name | Type | Purpose |
|-----------|------|---------|
| Property Address | Text | Address of the estate/cleanout property |
| Property Size | Dropdown (1BR/2BR/3BR/4BR+/Commercial) | Scoping and pricing |
| Urgency Level | Dropdown (Urgent <7 days / Standard 2-4 weeks / Flexible) | Priority scoring |
| Referral Source Name | Text | Which attorney or realtor referred this lead |
| Lead Source Article | Text | UTM campaign value for SEO attribution |
| Job Value Estimate | Currency | Quote amount |
| Photos Received | Checkbox | Whether photo submission was completed |

---

## Columbus, IN Referral Partner Contact List (Wave 1)

### Probate Attorneys

| Name | Firm | Email | Phone | Sequence |
|------|------|-------|-------|---------|
| Jeff Rocker | Beck Rocker | cclerc@beckrocker.com | - | A1 |
| F. Jefferson Crump III | JCAP | jep.jcap@sbcglobal.net | - | A1 |
| Blake Reed | Voelz Law | blake@voelzlaw.com | - | A1 |
| Lora Mount | Voelz Law | lora@voelzlaw.com | - | A1 |
| Elizabeth James | Voelz Law | elizabeth@voelzlaw.com | - | A1 |
| Alan Whitted | Whitted Law | alan@whittedlaw.com | - | A1 |
| Sean Thomasson | Thomasson Law | sean@thomassonlaw.com | - | A1 |
| Jason Guthrie | Thomasson Law | jason@thomassonlaw.com | - | A1 |

*Note: 2 additional attorney contacts in the full list have no confirmed email; use phone/LinkedIn for first touch.*

### Realtors

| Name | Firm | Email | Phone | Sequence |
|------|------|-------|-------|---------|
| Melissa Holbrook | Carpenter Realtors | mholbrook@callcarpenter.com | - | B1 |
| Andrea Anderson | Berkshire Hathaway HS IN | marketingbhhsin@gmail.com | - | B1 |

*Note: 8 additional realtor contacts in the full list have no confirmed email; use phone/LinkedIn for first touch.*

---

## CPM Build Order for Ohana Sub-Account

The first three items are confirmed already live per owner:

| Status | Item | Notes |
|--------|------|-------|
| ✅ Done | A2P 10DLC registration submitted | SMS compliance clock started |
| ✅ Done | Email domain warming started | Sending reputation building |
| ✅ Done | BabyLoveGrowth publishing | SEO compounding clock started |
| ⏳ Next | UTM tagging on all BabyLoveGrowth CTAs | 30 min, do immediately |
| ⏳ Next | GHL source-tag workflows for UTM attribution | Day 1-2 |
| ⏳ Next | Tag dictionary + custom fields in GHL | Day 1 |
| ⏳ Next | Build Ohana Cleanout Pipeline (9 stages) | Day 1 |
| ⏳ Next | Speed-to-lead workflow (photo request sequence) | Day 2-3 |
| ⏳ Next | Quote follow-up workflow (24hr + 72hr) | Day 3-4 |
| ⏳ Next | No-show / no-quote-response reactivation | Day 4-5 |
| ⏳ Next | Post-sale onboarding + review request | Day 5-6 |
| ⏳ Next | Referral partner A1/B1 outreach sequences | Day 3-5 |
| ⏳ Next | End-to-end test | After A2P clears + email warms |
| ⏳ Next | Go live | Day 15-17 from domain auth start |

---

## Key Automation Design Decisions (Steelman)

**Photo request instead of booking link as primary CTA:**
The nature of the service requires a property-specific quote. Sending someone to a generic calendar wastes their time and produces bad calls. Photo submission filters for serious leads and gives Ohana what they actually need to price the job. Keep this design; don't replace it with a Calendly link.

**Referral partner outreach before direct consumer ads:**
Referral partners compound. One active probate attorney can send 10-20 jobs per year. One Facebook ad produces one lead. Build the partner channel first; use the ad channel to fill gaps during ramp-up.

**Speed-to-lead is still the #1 lever even with photo-based quoting:**
The first message should acknowledge the inquiry and request photos within 5 minutes. The lead doesn't need to hear a price in minute 1; they need to feel that someone picked up immediately. "Got your message, can you send me a few photos of the property? That's all I need to get you a number." is a better first touchpoint than "we'll review your request in 24 hours."
