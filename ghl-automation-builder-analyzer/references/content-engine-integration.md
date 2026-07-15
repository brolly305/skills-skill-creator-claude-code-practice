# Content Engine Integration: BabyLoveGrowth + Munch to GHL

## What these tools are and what role they play

**BabyLoveGrowth** is an AI SEO content engine: it researches keywords, writes optimized articles, and auto-publishes them to your website on a schedule. It exposes an API, webhook output, and native connectors to Zapier, Make, and n8n, making it genuinely automatable in the full-loop sense.

**Munch** is an AI video-repurposing tool: long-form video in (YouTube, Zoom, Drive link), short-form clips out (Reels, TikTok, Shorts), with captions generated automatically. Its integration story is mostly direct-to-social (native YouTube, TikTok, Instagram publishing) and file export. There is no robust public API or Zapier action library. Munch automates *distribution to social platforms*; it does not wire deeply into GHL.

**The architecture:** BabyLoveGrowth and Munch operate at the top of the funnel. They manufacture attention: organic search traffic and social video views. GHL converts and nurtures that attention into booked calls and paying clients. The automation you're actually building is the **handoff layer** between attention and conversion.

```
BabyLoveGrowth → article published → UTM link → GHL form/funnel → tag → sequence
Munch          → clip posted to social → link in bio / CTA → GHL form/funnel → tag → sequence
```

Getting this handoff right (source-tagged, attributed, automated) is the 80/20, not deep API integration.

---

## BabyLoveGrowth Integration (Full Automation Loop)

### How it connects to GHL

BabyLoveGrowth supports webhooks and Zapier/Make/n8n. GHL has its own Zapier actions. The bridge:

```
BabyLoveGrowth publishes article
  → Webhook fires to Zapier/Make
    → Branch 1: GHL - post to connected social channels (if GHL social is active)
    → Branch 2: GHL - trigger email-newsletter workflow to contact list
    → Branch 3: Notify team via GHL task or internal notification
```

### Setup steps

**Step 1: Configure UTM parameters on every CTA in every article**

Every article BabyLoveGrowth publishes should have at least one CTA link pointing to a GHL funnel or form, with UTMs:
```
https://[your-ghl-funnel]?utm_source=organic&utm_medium=blog&utm_campaign=[article-topic]&utm_content=babylovegrowth
```

In GHL, set a workflow trigger on form submit that reads the UTM source and applies a tag automatically:
- `utm_source=organic` → apply tag `source-seo-blog`
- `utm_campaign=[topic]` → apply tag `topic-[topic]`

This is how you attribute which articles produce booked calls, not just traffic.

**Step 2: Build the Zapier/Make automation**

Trigger: BabyLoveGrowth webhook fires on "article published"

Actions (set up as parallel branches):
1. GHL - create social post (if GHL social planner is active) with article link + summary
2. GHL - trigger "newsletter blast" workflow for contacts tagged `newsletter-subscriber`
3. GHL - create internal task: "New article live: [title], check comments/engagement in 48hrs"

**Step 3: Verify the webhook in BabyLoveGrowth**

Go to BabyLoveGrowth settings → Integrations → Webhook. Paste your Zapier/Make catch URL. Test with a draft publish first. Confirm the payload includes the article title, URL, and publish date; you'll use those in the GHL notification/task body.

**Step 4: Close the attribution loop in GHL**

In GHL, on any contact tagged `source-seo-blog`, add a custom field: `Lead Source Article`. Populate it via the Zap using the UTM campaign value. Now you can filter your pipeline by this field and answer: "Which articles drove the most booked calls this month?"

---

## Munch Integration (Feeder Model)

### The honest integration picture

Munch does not have a deep Zapier or GHL connector. Forcing a complex integration here is over-engineering. Instead, treat Munch as a **clip factory** and wire the GHL connection through the content itself, not through APIs.

### The two moves that actually matter

**Move 1: Every Munch clip has a single GHL-linked CTA**

Wherever Munch publishes the clip (TikTok, Reels, Shorts, YouTube), the caption and link-in-bio must point to a GHL landing page with UTM tagging:
```
https://[your-ghl-funnel]?utm_source=social&utm_medium=[tiktok/reels/shorts]&utm_campaign=munch-clip&utm_content=[clip-topic]
```

GHL tags the lead `source-shortform-video` on form submit. You now know video content is driving pipeline. No API needed; the link does the attribution.

**Move 2: Repurpose Munch clips as paid social creative pointing at GHL funnels**

Export the best-performing organic clips from Munch → run them as paid ads (Meta, TikTok Ads) with the landing page set to your GHL funnel. This is often the highest-ROI use of Munch output: the clip already proved it can hold attention organically; now buy volume on it.

GHL captures the lead, fires the speed-to-lead automation, and tags the source. The creative production (Munch) and the conversion system (GHL) stay cleanly separated.

---

## Tag convention for content-sourced leads

Add these to your existing tag dictionary:

| Tag | Applied when |
|-----|-------------|
| `source-seo-blog` | Lead came from a BabyLoveGrowth article CTA |
| `source-shortform-video` | Lead came from a Munch clip (TikTok/Reels/Shorts) |
| `source-longform-video` | Lead came from a long-form YouTube/podcast link |
| `topic-[keyword]` | UTM campaign maps to article/content topic |
| `newsletter-subscriber` | Contact opted into blog/newsletter distribution list |

---

## Critical path for adding this integration

This is **off** the main launch critical path (A2P + domain warming). Integration wiring is floated work, a half-day in Zapier. But one sub-dependency matters:

⚡ **BabyLoveGrowth must be publishing before GHL can do anything with it.** SEO content takes 3–6 months to rank and compound. Start publishing the moment the website is live; do not wait for the GHL system to be "done." These are parallel clocks. Delay in starting content means delay in when SEO traffic shows up to be converted, regardless of how good the GHL system is.

Priority sequence:
1. Day 0: Start BabyLoveGrowth publishing (the long compounding clock)
2. Day 0: Configure UTMs on all CTAs (10 minutes, no API required)
3. Day 1–5: GHL source-tag workflows for UTM attribution
4. After main GHL system is live: Wire Zapier newsletter/social distribution Zap
5. Ongoing: Export Munch clips → run as paid ads pointing at live GHL funnels

---

## 80/20 priority for this integration

⚡ **Highest leverage:** UTM source-tagging on every content CTA → GHL tag automation. This is 30 minutes of setup and it gives you permanent attribution visibility. Without it, you're flying blind on what content is worth producing.

⚡ **Second highest:** BabyLoveGrowth → Zapier → GHL newsletter distribution. Turns a published article into an automated email send to your list, with zero recurring human effort.

📝 **Lower leverage (do later):** Munch API exploration, deep social sync. Let Munch's native publishing do its job; capture the leads through the link.

---

## What to watch for

⚠️ **GHL Zapier action availability varies by plan.** "GHL has a Zapier integration" is true, but specific actions (trigger workflow, apply tag, create contact) depend on your GHL plan tier. Verify your available actions in Zapier before designing around one.

⚠️ **BabyLoveGrowth webhook payload format.** Test the webhook with a draft publish before building the full Zap. Confirm the payload structure (article URL, title, date) before mapping fields in Zapier; it avoids rebuilding after launch.

⚠️ **UTM parameter stripping.** Some ad blockers and iOS privacy features strip UTM parameters. For high-value traffic, supplement UTMs with GHL's built-in source tracking and confirm parameters are arriving on at least 70–80% of test submissions before relying on attribution data.
