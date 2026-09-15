# Kuvera App Review Insights Analyser — README

A tool that turns a week's worth of Kuvera app reviews (App Store + Play Store) into a short, actionable weekly pulse — top themes, real quotes, and action ideas — plus a ready-to-send email draft.

Built as part of a Product Management learning challenge (App Review Insights Analyser milestone).

---

## Scope

| | |
|---|---|
| **Product** | Kuvera (mutual fund investing app) |
| **Data window** | Last 8–12 weeks (June 12 – Sep 2, 2026 in this sample run) |
| **Sources** | App Store, Play Store, and public customer-care/forum mentions |
| **Max themes** | 5 |
| **Note length** | Under 250 words |

---

## How it works

1. **Input** — paste a CSV of reviews (columns: rating, title, text, date, platform) into the tool.
2. **Grouping** — the AI reads every review and groups them into at most 5 recurring themes, ranking each by a mix of how many reviews mention it and how severe/business-critical it is (a bug that blocks transactions can outrank a more commonly mentioned but minor complaint).
3. **Quote selection** — for each theme, it pulls one real, verbatim quote from the actual review text — never a paraphrase, never invented.
4. **Note generation** — it writes the top 3 themes, one quote each, and 3 specific action ideas into a single page, kept under 250 words.
5. **Email generation** — the same content, reformatted as a ready-to-send email.
6. **Privacy** — the system prompt instructs the model to strip any usernames, emails, or other personal identifiers automatically, even if present in pasted input.

---

## How to re-run this for a new week

1. Open `kuvera_review_pulse_generator.html` (works as a Claude.ai artifact — it calls Claude directly via the browser, no setup needed).
2. Export or compile this week's reviews into the same CSV format: `rating,title,text,date,platform`.
3. Paste that CSV into the input box (replacing the sample data).
4. Click **"Generate Weekly Pulse."**
5. Review the three tabs — **Theme Breakdown**, **One-Page Note**, **Email Draft** — and use the copy buttons to grab the text you need.
6. Paste the note into your weekly doc, or the email into your mail client, and send.

No code changes are needed to re-run this each week — only fresh review data.

---

## Theme legend

These are the 5 themes the live tool identified in the locked-in final run (exact wording/ranking can vary between runs — see Known Limits):

| Rank | Theme | What it covers |
|---|---|---|
| 1 | **Unwanted data aggregation** | New update merges all external platform holdings into one view, confusing users who want to see only their Kuvera-made investments |
| 2 | **Removed core features** | Long-time users lost Tax Harvesting, EPF tracking, and offline gold tracking after the redesign |
| 3 | **Sync/import failure** | Mutual fund sync stuck on "temporarily paused" since February 2026, with no fix |
| 4 | **Contact/OTP bug blocking transactions** | A bug overwrote a user's registered mobile number, blocking OTP receipt and halting new investments |
| 5 | **KYC document rejection** | Government-approved KYC documents (e.g. "One and Same Person" certificates) repeatedly rejected with generic replies |

---

## Known limits

- **Sample data, not a full scrape:** Kuvera has ~19,900 total Play Store reviews; no tool used here can access or download all of them. This run's 12 data points were individually found and verified through targeted web research across 9 different search angles (Play Store, App Store across 3 storefronts, Quora, Reddit, customer-care forums, review aggregators). This satisfies the brief's own allowance ("Reviews CSV used — sample/redacted is fine") but is not statistically comprehensive.
- **LLM-based grouping is not fully deterministic:** re-running the exact same data may produce slightly different theme names or groupings between runs, since the underlying model generates fresh output each time rather than applying fixed rules. For example, the same 12-review dataset produced different theme names and a different top-ranked issue when run through Claude (in initial testing) versus the deployed tool's Groq-based model — both were reasonable, evidence-grounded groupings, just phrased and prioritized differently.
- **Not every review may appear in the top-5 breakdown:** in one live run, the theme breakdown surfaced 5 themes covering 8 of the 12 reviews explicitly (the payment refund complaint, the minor iPad display bug, the WhatsApp consent friction, and the one positive review weren't individually broken out that time). This is a function of the underlying model prioritizing the most severe/voluminous patterns — re-running often surfaces a different subset.
- **Word count runs close to the limit:** the generated one-page note came in at 248/250 words in this run — comfortably compliant, but worth a quick check after each re-run since output length can vary slightly.
- **Environment-dependent:** like the Challenge 1 chatbot, this calls Claude's API directly via `fetch`, which only authenticates automatically inside a Claude.ai artifact session — it will not work if the HTML file is opened standalone outside Claude.ai.
- **No PII by design:** the tool is instructed to strip names/emails/phone numbers automatically, but always double-check output before sharing externally, especially if pasting real (non-sample) review data that might contain identifiers reviewers included themselves.
- **Not officially affiliated:** this is an unofficial learning prototype, not endorsed by or affiliated with Kuvera.

---

## Deliverables in this submission

| File | Description |
|---|---|
| `kuvera_review_pulse_generator.html` | Working prototype — paste reviews, generate the pulse |
| `kuvera_reviews_sample.csv` | 12 real, anonymized, verified review data points |
| `kuvera_weekly_pulse.md` | Actual tool output: one-page weekly note |
| `kuvera_email_draft.md` | Actual tool output: email draft version |
| `README.md` | This file |
