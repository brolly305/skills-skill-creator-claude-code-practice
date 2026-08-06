# Your Q3 plan, run through the five rings

**The read:** this is not one plan, it is five plans, and four of them cannot produce revenue inside the window they're aimed at. One of them subtracts from it.

Assumptions I'm working from, since you didn't give me these: it's early August, so ~40% of Q3 is already spent and you have about five months to year end; I don't know your churn, ACV, cash runway, current net-new MRR per month, site conversion rate, or whether you have SOC 2. Where those matter I've said so rather than guessed quietly.

## First, the arithmetic nobody in the plan has done

$40k → $100k in five months is **20% month-over-month, compounded, net of churn**. Linear, that's **+$12k of net new MRR every month**. At 3% monthly revenue churn you need to add ~$13–14k gross to net $12k.

Now put each initiative against that window:

| Initiative | Cost in Q3 | Earliest revenue | Effect on the December number |
|---|---|---|---|
| 4 big features | Most of your engineering | Q4, *if* tied to a tier, price, or expansion motion | Plausibly positive — unproven |
| 8 blog posts/month | Founder or writer time, all quarter | SEO compounds in 4–9 months → Q1–Q2 2027 | Zero |
| 2 enterprise AEs | Largest cash line; 3–6mo ramp + 3–9mo enterprise cycles | Q1–Q2 2027 at the earliest | Zero, and it eats the runway |
| Match Datadog entry pricing | Immediate | Immediate | **Negative** — you re-rate your existing base on day one |
| Rebrand + new site in September | Design, dev, and everyone's opinions | — | **Negative** — new sites routinely lose 4–8 weeks of organic and conversion, in exactly the weeks you need |

One of five can reach the number. You are spending a quarter of a six-person company's life mostly on things that arrive after the date you're aiming at. That is the whole finding; everything below is why each ring let it through.

## Ring by ring

### Earth 地 — thin

One thing is genuinely sound and rare: your win condition is checkable by a third party. "$100k MRR by year end" is a real target, not a slogan. Most plans fail this.

But nothing under it holds. There is no derivation of the $60k — no split between expansion from your existing base, new logos at current ACV, and packaging. At a typical dev-tools ACV that gap is on the order of a hundred new paying teams in five months while losing none of the ones you have. What is your net new MRR per month *right now*? If it's $4k, this plan asks you to triple it, and none of the five items explains how.

Musashi's foreman knows the grain of each timber before he assigns it. You have six people and five programs. Assign each person to exactly one item on that list and you will find you cannot staff it — that exercise *is* your cut list.

And you have assumed resources you don't possess. "Go upmarket into enterprise" is not a hiring decision, it's a product and compliance program: SOC 2 Type II, SSO/SAML, SCIM, audit logs, a DPA, an MSA, and someone who can survive a 200-line security questionnaire. If those don't exist, your two new AEs will spend Q4 forwarding questionnaires to your engineers — which converts your most expensive new hires into a tax on your only revenue-producing team.

### Water 水 — hollow

There is no form in this plan. Five destinations, no gait. No cadence, no weekly loop, no measurement, and — the tell — **no kill criteria anywhere**. Not one of the five items has a condition under which you stop it. Musashi teaches five guards and then teaches that the guard is only correct with reference to what's in front of you; a stance you'd hold while losing isn't a stance.

Also, this is a jumping foot. Cutting price and adding two enterprise salaries in the same quarter commits cash you cannot uncommit if month one comes in at +$4k instead of +$12k. Every step should leave the next step available. This one doesn't.

If you do have an operating rhythm elsewhere, say so. But what you sent me is a list of outcomes, and outcomes are not a form.

### Fire 火 — hollow

You have one named opponent, Datadog, and your engagement with them is to fight on the ground they chose with the weapon they are best funded to use.

Sit in their seat for a second. Datadog's entry tier is a customer-acquisition instrument subsidized by expansion revenue on hosts, logs, and APM. Yours is your revenue. If you match it, they will not notice, and they will not respond — you take the entire cost of the exchange and they take none of it. That's not a price war, it's a unilateral price cut you're calling a competitive move.

Second seat: the buyer who said "too expensive." In dev tools that sentence usually means *"I couldn't get this approved"* — no budget line, no champion, no procurement path. It is the objection that gets answered and keeps coming back, which means it isn't the real one. Cut the price and you'll find the same deals still not closing, only now at a lower number and with your existing customers asking for the new rate.

Also notice: item 3 goes upmarket, item 4 cuts the entry price to win downmarket. The mountain and the sea cannot be the same. You are taking two opposite stances in the same quarter and will be strong in neither.

Three moves that actually fit here:

- **Release four hands.** You're locked in the same spirit as a much larger opponent. Leave. Don't match the entry price — change the unit of comparison so the prices aren't comparable. Price on repos, pipelines, or CI minutes rather than hosts. When the buyer can't line your number up against theirs, the price objection has nowhere to live.
- **Become the enemy.** Before you touch pricing, call the last ten lost deals this week. Ask who else was in the room, who owned the budget, and what they actually chose. My strong guess is your top competitor isn't Datadog — it's "do nothing / we'll just grep the logs." That's a completely different fight and price doesn't feature in it.
- **Injure the corners.** Don't attack Datadog's center — breadth, brand, price. Attack the corner they take for granted: teams whose pain is *CI specifically*, where CI Visibility is a bolt-on that nobody inside Datadog owns as their main product. That is the only ground on which six people beat them, and it's the exact ground you'd abandon by going upmarket.

### Wind 風 — hollow

The plan knows one rival and its response to that rival is imitation. Copying an incumbent's practice without asking which parts are load-bearing *for a company of that size* is the specific failure this book exists to prevent. Datadog's entry price, their brand refresh cadence, their content volume — all of those are outputs of a machine with a sales org, an expansion motion, and a marketing budget you don't have.

"Double content to 8 posts a month" is the velocity cult. True strategy has no dependence on speed. The question is not 4 versus 8 — it's whether you can name a single post from the last six months that produced a customer. If you can't, doubling produces twice as much of nothing, and it does so with the same two people.

The rebrand is the clearest ornament on the list. A new logo does not change a platform engineer's buying decision. A new site *might*, but only if you can state today's visitor→trial→paid conversion rate and say it's below band. If you can't quote that number, the rebrand is decoration scheduled during your highest-leverage weeks. And it will collide directly with item 2: you're doubling the content output, then rebuilding the site the content lives on. URL changes and redirect misses will cost you weeks of organic in October and November.

### Void 空 — hollow

"We think if we execute all 5 we hit $100k." That sentence treats execution as the only uncertainty. It isn't even the main one. The real uncertainty is whether these five, executed perfectly, connect to the number at all — and on the table above, four of them don't.

Things you are currently pretending to know:

- that the four features are why you lose deals (who asked — existing customers, or lost prospects? those are different features with different revenue mechanics)
- that price is why you lose (stated objection, not verified)
- that AEs hired in Q3 close inside Q4
- that content compounds inside two quarters
- that $100k is reachable at all from your current net-new rate

Every one of those is cheap to test, and none of them is tested in this plan. More planning won't resolve them; contact will.

## The weakest ring is Earth

Fire and Wind are the loudest failures, but they're downstream. Nobody derived the number, so nobody could tell which activities were even eligible to hit it, so the list became "everything we could think of." Three moves:

1. **Build the bridge, this week.** One table: expansion from the existing base, new logos at current ACV, packaging change, minus churn. Make it sum to $60k with inputs you'd defend to an investor. If it doesn't close with plausible numbers, reset the target now rather than in November. A target you privately know is fiction poisons every decision underneath it.
2. **Count the timber.** Six people, one quarter. Name the owner of each of the five. When you run out of people — and you will, at three — you have your cut list. Include cash: what do two enterprise AEs cost you through March 2027, and what does that do to runway?
3. **Price the enterprise motion before you staff it.** List the prerequisites (SOC 2, SSO, audit logs, MSA, DPA, procurement path). Then have a founder personally run five enterprise deals end to end. If a founder can't close one, an AE won't. That test costs you six weeks and nothing in salary.

## Verdict

Executed perfectly, this plan does not get you to $100k. Executed at the level six people can actually manage across five fronts, it leaves you in January with a lower price on your whole book, a rebuilt site that lost its rankings, two expensive sellers mid-ramp in a motion you haven't proven, four half-shipped features, and less cash. That is worse than doing nothing, which is a rare and specific thing to be able to say about a plan.

Keep item 1. It's the only one with a line to the number, and putting it first suggests your instincts are better than your plan. Tie each of the four features to a tier, a price, or an expansion trigger before you build it, so shipping it is a revenue event and not a changelog entry. Kill the rebrand. Freeze content at four and spend the recovered time on lost-deal calls. Defer the AEs until a founder has closed enterprise deals unassisted. Do not touch the price until you've run the last ten losses and, if you still believe it, tested the new number on the next fifteen inbound deals only — a price cut applied to the whole book is permanent, and you can't take it back.

## Dokkōdō for this quarter

1. Fund nothing that pays back after March until everything that pays back in December is fully staffed.
2. Do not build a feature until a *lost* deal has named it.
3. Do not cut a price you have not tested on fifteen deals.
4. When a larger opponent sets the terms, change the terms. Never match them.
5. Hire no seller for a motion no founder has closed.
6. The logo is not the problem.
