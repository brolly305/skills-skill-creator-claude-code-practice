#!/usr/bin/env python3
"""Build a no-JavaScript review page for an iteration of the musashi-five-rings evals.

The skill-creator's own viewer renders from an embedded JS payload, which some
mobile file previews won't execute. This produces the same review as static HTML:
content is in the markup, and collapsing uses native <details>.
"""
import json
import re
import sys
from pathlib import Path

import markdown

ITER = Path(sys.argv[1] if len(sys.argv) > 1 else "iteration-1")
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else ITER / "review-page.html")

MD = markdown.Markdown(extensions=["tables", "sane_lists"])

TITLES = {
    0: ("Build a method", "BUILD mode", "Two-person junk removal business asking for a 12-month method"),
    1: ("Stress-test a plan", "TEST mode", "Six-person startup's five-point Q3 plan, run ring by ring"),
    2: ("Teach the text", "STUDY mode", "What the Fire book says, applied to a price war"),
}
CONFIGS = [("with_skill", "With the skill"), ("without_skill", "Baseline — no skill")]


def md(text: str) -> str:
    MD.reset()
    return MD.convert(text)


def esc(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def load():
    evals = []
    for d in sorted(ITER.glob("eval-*")):
        meta = json.loads((d / "eval_metadata.json").read_text())
        runs = {}
        for cfg, _ in CONFIGS:
            run = d / cfg / "run-1"
            runs[cfg] = {
                "output": (run / "outputs" / "response.md").read_text(),
                "grading": json.loads((run / "grading.json").read_text()),
                "timing": json.loads((run / "timing.json").read_text()),
            }
        evals.append({"meta": meta, "runs": runs})
    bench = json.loads((ITER / "benchmark.json").read_text())
    return evals, bench


def stat_row(evals):
    """Per-eval pass rates for the summary table."""
    rows = []
    for e in evals:
        eid = e["meta"]["eval_id"]
        name = TITLES[eid][0]
        cells = []
        for cfg, _ in CONFIGS:
            s = e["runs"][cfg]["grading"]["summary"]
            cells.append((s["passed"], s["total"]))
        rows.append((name, cells))
    return rows


def build():
    evals, bench = load()

    # ---- summary table
    rows = stat_row(evals)
    tot_w = sum(c[0][0] for _, c in rows), sum(c[0][1] for _, c in rows)
    tot_b = sum(c[1][0] for _, c in rows), sum(c[1][1] for _, c in rows)

    summary = ['<div class="scroll"><table class="data">',
               "<thead><tr><th>Test case</th><th>With skill</th><th>Baseline</th></tr></thead><tbody>"]
    for name, cells in rows:
        (wp, wt), (bp, bt) = cells
        tie = ' class="tie"' if wp / wt == bp / bt else ""
        summary.append(
            f"<tr{tie}><td>{esc(name)}</td>"
            f'<td class="num">{wp}/{wt}<span class="pct">{wp/wt:.0%}</span></td>'
            f'<td class="num">{bp}/{bt}<span class="pct">{bp/bt:.0%}</span></td></tr>')
    summary.append(
        f'<tr class="total"><td>All assertions</td>'
        f'<td class="num">{tot_w[0]}/{tot_w[1]}<span class="pct">{tot_w[0]/tot_w[1]:.0%}</span></td>'
        f'<td class="num">{tot_b[0]}/{tot_b[1]}<span class="pct">{tot_b[0]/tot_b[1]:.0%}</span></td></tr>')
    summary.append("</tbody></table></div>")

    # ---- cost table
    def mean(cfg, key):
        v = [e["runs"][cfg]["timing"][key] for e in evals]
        return sum(v) / len(v)

    cost = ['<div class="scroll"><table class="data">',
            "<thead><tr><th>Per run, averaged</th><th>With skill</th><th>Baseline</th></tr></thead><tbody>",
            f'<tr><td>Tokens</td><td class="num">{mean("with_skill","total_tokens"):,.0f}</td>'
            f'<td class="num">{mean("without_skill","total_tokens"):,.0f}</td></tr>',
            f'<tr><td>Wall clock</td><td class="num">{mean("with_skill","total_duration_seconds"):.0f}s</td>'
            f'<td class="num">{mean("without_skill","total_duration_seconds"):.0f}s</td></tr>',
            "</tbody></table></div>"]

    # ---- notes
    notes = "".join(f"<li>{md(n)[3:-4] if md(n).startswith('<p>') else md(n)}</li>"
                    for n in bench.get("notes", []))

    # ---- eval sections
    sections = []
    for e in evals:
        eid = e["meta"]["eval_id"]
        title, mode, blurb = TITLES[eid]
        panels = []
        for cfg, label in CONFIGS:
            r = e["runs"][cfg]
            s = r["grading"]["summary"]
            checks = "".join(
                f'<li class="{"ok" if x["passed"] else "no"}">'
                f'<span class="mark" aria-hidden="true">{"✓" if x["passed"] else "✗"}</span>'
                f'<span><b>{esc(x["text"])}</b><em>{esc(x["evidence"])}</em></span></li>'
                for x in r["grading"]["expectations"])
            panels.append(f"""
<section class="panel {cfg}">
  <header class="panel-head">
    <h4>{label}</h4>
    <span class="score">{s['passed']}/{s['total']}</span>
  </header>
  <details class="checks">
    <summary>Assertion detail</summary>
    <ul class="checklist">{checks}</ul>
  </details>
  <details class="out" open>
    <summary>The answer it gave</summary>
    <div class="prose">{md(r['output'])}</div>
  </details>
</section>""")

        sections.append(f"""
<section class="eval" id="eval-{eid}">
  <div class="eval-head">
    <p class="eyebrow">{mode}</p>
    <h2>{esc(title)}</h2>
    <p class="blurb">{esc(blurb)}</p>
  </div>
  <details class="promptbox">
    <summary>The prompt both runs were given</summary>
    <p>{esc(e['meta']['prompt'])}</p>
  </details>
  {''.join(panels)}
</section>""")

    return HTML.format(summary="".join(summary), cost="".join(cost),
                       notes=notes, sections="".join(sections))


HTML = """<title>Musashi Five Rings — iteration 1 review</title>
<style>
:root {{
  --ground:#fbfbfd; --surface:#ffffff; --sunk:#f2f4f8;
  --ink:#151a22; --muted:#5c6673; --faint:#8b95a3;
  --rule:#dde1e8; --accent:#2d4a7a; --accent-soft:#e8edf6;
  --ok:#1c6b4b; --no:#a02c2c;
  --serif: Georgia, 'Iowan Old Style', 'Times New Roman', serif;
  --sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}}
@media (prefers-color-scheme: dark) {{
  :root {{
    --ground:#0f1218; --surface:#161b24; --sunk:#1b212c;
    --ink:#e7eaf0; --muted:#98a2b1; --faint:#6f7987;
    --rule:#242b37; --accent:#8fb0e8; --accent-soft:#1c2534;
    --ok:#5ec49a; --no:#e08585;
  }}
}}
:root[data-theme="dark"] {{
  --ground:#0f1218; --surface:#161b24; --sunk:#1b212c;
  --ink:#e7eaf0; --muted:#98a2b1; --faint:#6f7987;
  --rule:#242b37; --accent:#8fb0e8; --accent-soft:#1c2534;
  --ok:#5ec49a; --no:#e08585;
}}
:root[data-theme="light"] {{
  --ground:#fbfbfd; --surface:#ffffff; --sunk:#f2f4f8;
  --ink:#151a22; --muted:#5c6673; --faint:#8b95a3;
  --rule:#dde1e8; --accent:#2d4a7a; --accent-soft:#e8edf6;
  --ok:#1c6b4b; --no:#a02c2c;
}}
* {{ box-sizing:border-box; }}
body {{
  margin:0; background:var(--ground); color:var(--ink);
  font-family:var(--sans); font-size:17px; line-height:1.6;
  -webkit-text-size-adjust:100%;
}}
.wrap {{ max-width:44rem; margin:0 auto; padding:2rem 1.15rem 5rem; }}
h1,h2,h3,h4 {{ font-family:var(--serif); font-weight:600; text-wrap:balance; margin:0; }}
h1 {{ font-size:2.1rem; line-height:1.15; letter-spacing:-0.015em; }}
h2 {{ font-size:1.5rem; line-height:1.2; }}
h4 {{ font-size:1.02rem; }}
.eyebrow {{
  font-family:var(--mono); font-size:.68rem; letter-spacing:.14em;
  text-transform:uppercase; color:var(--accent); margin:0 0 .5rem;
}}
.lede {{ font-size:1.08rem; color:var(--muted); margin:.85rem 0 0; }}
header.top {{ border-bottom:2px solid var(--ink); padding-bottom:1.5rem; margin-bottom:2rem; }}

.block {{ margin:2.5rem 0; display:flex; flex-direction:column; gap:.85rem; }}
.block > h3 {{ font-size:1.18rem; }}
.scroll {{ overflow-x:auto; }}
table.data {{ width:100%; border-collapse:collapse; font-size:.92rem; }}
table.data th {{
  font-family:var(--mono); font-size:.66rem; letter-spacing:.1em; text-transform:uppercase;
  color:var(--muted); text-align:left; font-weight:500;
  border-bottom:1px solid var(--rule); padding:.5rem .6rem;
}}
table.data td {{ padding:.62rem .6rem; border-bottom:1px solid var(--rule); }}
td.num {{ font-family:var(--mono); font-variant-numeric:tabular-nums; white-space:nowrap; }}
.pct {{ color:var(--faint); margin-left:.5rem; font-size:.85em; }}
tr.total td {{ font-weight:600; border-bottom:none; }}
tr.tie td:first-child::after {{
  content:"tie"; font-family:var(--mono); font-size:.6rem; letter-spacing:.08em;
  text-transform:uppercase; color:var(--no); margin-left:.6rem;
  border:1px solid currentColor; padding:.05rem .3rem; border-radius:2px;
}}
ul.notes {{ margin:0; padding-left:1.1rem; display:flex; flex-direction:column; gap:.7rem; }}
ul.notes li {{ color:var(--muted); font-size:.95rem; }}
ul.notes b, ul.notes strong {{ color:var(--ink); }}

.eval {{ margin:3.5rem 0 0; padding-top:2rem; border-top:1px solid var(--rule); }}
.eval-head {{ margin-bottom:1.25rem; }}
.blurb {{ color:var(--muted); margin:.4rem 0 0; font-size:.95rem; }}
details {{ border:1px solid var(--rule); border-radius:3px; background:var(--surface); }}
details summary {{
  cursor:pointer; padding:.62rem .8rem; font-family:var(--mono);
  font-size:.7rem; letter-spacing:.09em; text-transform:uppercase; color:var(--muted);
}}
details summary:focus-visible {{ outline:2px solid var(--accent); outline-offset:2px; }}
details[open] > summary {{ border-bottom:1px solid var(--rule); color:var(--ink); }}
.promptbox p {{ margin:0; padding:.9rem .95rem; font-size:.95rem; color:var(--muted); }}

.panel {{ margin-top:1.5rem; display:flex; flex-direction:column; gap:.7rem; }}
.panel-head {{ display:flex; align-items:baseline; justify-content:space-between; gap:1rem; }}
.panel-head h4 {{ margin:0; }}
.with_skill .panel-head {{ border-left:3px solid var(--accent); padding-left:.7rem; }}
.without_skill .panel-head {{ border-left:3px solid var(--rule); padding-left:.7rem; }}
.score {{
  font-family:var(--mono); font-variant-numeric:tabular-nums;
  font-size:.85rem; color:var(--muted); white-space:nowrap;
}}
ul.checklist {{ list-style:none; margin:0; padding:.6rem .8rem 1rem; display:flex; flex-direction:column; gap:.7rem; }}
ul.checklist li {{ display:flex; gap:.6rem; align-items:flex-start; font-size:.88rem; }}
.mark {{ font-family:var(--mono); font-weight:700; line-height:1.5; }}
li.ok .mark {{ color:var(--ok); }}
li.no .mark {{ color:var(--no); }}
ul.checklist b {{ display:block; font-weight:600; }}
ul.checklist em {{ display:block; color:var(--muted); font-style:normal; font-size:.93em; margin-top:.15rem; }}

.prose {{ padding:.3rem 1rem 1.4rem; }}
.prose > :first-child {{ margin-top:.9rem; }}
.prose h1 {{ font-size:1.35rem; margin:1.6rem 0 .5rem; }}
.prose h2 {{ font-size:1.18rem; margin:1.5rem 0 .5rem; }}
.prose h3 {{ font-size:1.02rem; margin:1.3rem 0 .4rem; }}
.prose h4 {{ font-size:.95rem; margin:1.1rem 0 .35rem; }}
.prose p, .prose li {{ font-size:.95rem; }}
.prose ul, .prose ol {{ padding-left:1.2rem; }}
.prose li {{ margin:.3rem 0; }}
.prose blockquote {{
  margin:1rem 0; padding:.2rem 0 .2rem .9rem;
  border-left:2px solid var(--accent); color:var(--muted);
}}
.prose hr {{ border:none; border-top:1px solid var(--rule); margin:1.6rem 0; }}
.prose table {{ width:100%; border-collapse:collapse; font-size:.85rem; margin:1rem 0; }}
.prose th, .prose td {{ border:1px solid var(--rule); padding:.4rem .5rem; text-align:left; }}
.prose th {{ background:var(--sunk); font-family:var(--sans); font-size:.8rem; }}
.prose code {{ font-family:var(--mono); font-size:.86em; background:var(--sunk); padding:.1em .3em; border-radius:2px; }}
.prose strong {{ font-weight:650; }}
footer {{ margin-top:4rem; padding-top:1.5rem; border-top:1px solid var(--rule); color:var(--muted); font-size:.92rem; }}
footer p {{ margin:.6rem 0; }}
@media (max-width:520px) {{
  body {{ font-size:16px; }}
  h1 {{ font-size:1.75rem; }}
  .wrap {{ padding:1.5rem .9rem 4rem; }}
}}
</style>

<div class="wrap">
<header class="top">
  <p class="eyebrow">Skill evaluation · iteration 1</p>
  <h1>Musashi Five Rings</h1>
  <p class="lede">Three test cases, each answered twice — once by Claude with the skill, once
  without it. Same prompt, same model. Read the pairs and tell me where the skill earns its
  place and where it doesn't.</p>
</header>

<div class="block">
  <h3>How the two scored</h3>
  {summary}
  <p class="blurb">31 assertions in total. One run per configuration, so treat these as single
  samples rather than averages — nothing here has a variance estimate behind it.</p>
</div>

<div class="block">
  <h3>What the skill costs</h3>
  {cost}
</div>

<div class="block">
  <h3>What the scores hide</h3>
  <ul class="notes">{notes}</ul>
</div>

{sections}

<footer>
  <p><strong>What I need from you:</strong> read the pairs — eval 0 especially, where the two
  diverge most — and tell me in chat what's off. No form to fill in; just say it in your own
  words and I'll fold it into iteration 2.</p>
  <p>The question I most want answered: does the scroll read like something you'd actually
  come back to when things go sideways, or like structure for its own sake?</p>
</footer>
</div>
"""

if __name__ == "__main__":
    OUT.write_text(build())
    print(f"wrote {OUT} ({OUT.stat().st_size:,} bytes)")
