# GHL Automation Audit Checklist: 50 Points

Use this in ANALYZE mode for a systematic full-stack review of an existing GHL setup. Score each item as: ✅ Pass / ⚠️ Needs improvement / ❌ Critical issue

Score at the end: 45–50 = Excellent, 35–44 = Good, 25–34 = Needs work, <25 = Rebuild

---

## SECTION 1: Speed & Timing (First Principles + GaryVee) - 10 points

1. ☐ First contact attempt fires within 5 minutes of form submit / lead ad
2. ☐ Messages are only sent between 8am–8pm in the lead's local timezone
3. ☐ Day-0 has at least 2 touchpoints across different channels
4. ☐ No gap longer than 24 hours in the first 72-hour sequence
5. ☐ Total sequence length is appropriate for the offer's decision cycle (short-ticket <7 days, high-ticket up to 21 days)
6. ☐ Appointment reminders fire at 24hr and 1hr before
7. ☐ No-show follow-up fires within 15 minutes of missed appointment
8. ☐ Post-sale sequence begins within 1 hour of payment/close
9. ☐ Reactivation campaigns are scheduled for 30, 60, and 90-day inactive leads
10. ☐ Sequences stop immediately when lead converts (no post-purchase prospecting messages)

---

## SECTION 2: Channel Strategy (GaryVee + 80/20) - 10 points

11. ☐ SMS is the primary channel for day-0 outreach (not email)
12. ☐ Channel variety across the sequence (not same channel 2x in a row)
13. ☐ SMS messages are under 160 characters OR properly segmented
14. ☐ Email subjects create a curiosity gap (not company name or generic "follow up")
15. ☐ Voicemail drops are only used after 2+ failed text/email attempts
16. ☐ Reply detection is configured: lead reply pauses automation and creates task
17. ☐ Opt-out/STOP detection is active and contacts are removed from all sequences
18. ☐ Email domain is warmed and has DKIM/SPF configured (check deliverability)
19. ☐ No spam-trigger words in email subject lines ("FREE", "ACT NOW", "LIMITED TIME" etc.)
20. ☐ All outbound phone numbers are A2P 10DLC registered (SMS compliance)

---

## SECTION 3: Copy & Message Quality (NEPQ + Hormozi) - 10 points

21. ☐ First message opens with a connection or curiosity question, NOT a pitch
22. ☐ Messages follow NEPQ arc: connection → situation → problem → consequence → solution
23. ☐ Every CTA points at a specific dream outcome with a number or timeframe
24. ☐ Social proof is present before the main CTA (case study, testimonial, result)
25. ☐ At least one risk reversal or guarantee is referenced in the sequence
26. ☐ The main CTA requires minimum friction (one-click, pre-filled, short time commitment)
27. ☐ Messages are written in channel-native language (casual SMS, informative email)
28. ☐ No placeholder text like [Your Name] or [Company] left in templates
29. ☐ Personalization variables (FirstName, custom fields) are populated correctly
30. ☐ Copy is specific to the niche, not generic enough to work for any business

---

## SECTION 4: Logic & Architecture (First Principles + Red Team) - 10 points

31. ☐ Every automation has a single clearly defined goal (not "nurture"; be specific)
32. ☐ Exit conditions are defined for every automation (win, loss, no-response)
33. ☐ Tags are applied and removed consistently (no orphan tags)
34. ☐ Tag naming convention is consistent (lowercase, hyphenated, descriptive)
35. ☐ No lead can be in two conflicting sequences simultaneously
36. ☐ Pipeline stages map 1:1 to meaningful actions or decision points
37. ☐ Conditional logic (IF/THEN) is used where lead behavior should change the path
38. ☐ All webhook/integration connections are live and tested (not assumed)
39. ☐ A human task is created whenever the automation reaches a decision point it can't handle
40. ☐ There is a documented owner for every automation (who to call if it breaks)

---

## SECTION 5: Business Strategy (YC + 80/20 + Hormozi) - 10 points

41. ☐ The automation supports a clear value ladder (low → high ticket progression)
42. ☐ There is a referral ask automation (post-sale, at moment of peak satisfaction)
43. ☐ There is a review request automation (with direct link to Google/Facebook)
44. ☐ The automation has defined KPIs and they are being tracked
45. ☐ The 80/20 analysis has been done: which 2–3 sequences produce 80% of revenue?
46. ☐ The automation can run without manual intervention for 7+ days
47. ☐ Dead lead reactivation is set up (30/60/90 day sequences exist)
48. ☐ Post-sale upsell sequence exists (not just onboarding)
49. ☐ The automation is documented (what it does, when it triggers, who owns it)
50. ☐ The automation has been reviewed in the last 90 days for performance data

---

## Scoring Guide

**45–50 (Excellent):**
Your GHL setup is well-engineered. Focus on optimizing copy with NEPQ and A/B testing your highest-volume sequences. The constraint is now offer quality, not automation.

**35–44 (Good):**
Solid foundation. Priority fixes: address any ❌ items first, then ⚠️ items in Sections 1 and 3 (timing and copy have the highest ROI impact).

**25–34 (Needs Work):**
Multiple gaps are costing you conversions. Build a fix priority list: start with the 3 items from Section 1 that failed; timing issues compound every other problem. Then Section 3 (copy). Architecture last.

**<25 (Rebuild):**
The automation foundation is broken. Don't patch; rebuild from the Speed-to-Lead pattern in `ghl-patterns.md`. Get that working first, then layer in appointment, reactivation, and post-sale sequences one at a time.

---

## Quick Win Priority Stack

When you have limited time, fix in this order:

1. ⚡ **5-minute first response** (if broken, fix before anything else)
2. ⚡ **Appointment reminders 24hr + 1hr** (highest ROI per minute of setup time)
3. ⚡ **Reply detection → human task** (prevents burned leads)
4. ⚡ **Dead lead reactivation** (free revenue from paid traffic)
5. ⚡ **Post-sale referral ask** (zero CAC growth lever)
6. ⚡ **Review request sequence** (social proof compound effect)
7. 📝 **Copy rewrite with NEPQ** (only after structural issues fixed)
8. 📝 **Value ladder automation** (only when core sequences are solid)
