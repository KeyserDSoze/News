# O — Autonomous daily newsroom

## Purpose and status

This is a proposed opt-in pipeline, not an active service until the owner configures a paid OpenAI API key and enables a repository variable. It can research, draft and conditionally publish 10 World, 5 Italy, 5 Technology and 5 Science articles in Italian and English, with original SVG art and Git history.

**The workflow begins at approximately 07:00 Europe/Rome; it does not guarantee the edition is online at 07:00.** GitHub schedules can be delayed or dropped, especially at the top of an hour. If the requirement is publication *by* 07:00, start the research earlier and define an earlier editorial cutoff.

## One-time setup by repository owner

1. Obtain an **OpenAI Platform API key** and establish project budgets and rate limits. A ChatGPT subscription is not an API subscription.
2. Add the API key to GitHub repository **Settings → Secrets and variables → Actions → Secrets**, name **OPENAI_API_KEY**. Do not put it in chat, code, issues or workflows.
3. Configure optional Actions repository variables: **O_MODEL** (default gpt-5.5), **O_LOOKBACK_DAYS** (default 5), **O_MAX_MODEL_CALLS** (default 130), **O_MAX_TOKENS** (default 750000). Model consumption is billable; limits on call count/tokens are not a monetary spending ceiling.
4. Manually run **Actions → O — Daily automatic newsroom → Run workflow** with **dry_run=true**. Confirm sources, bilingual factual consistency, article count and bill. A genuinely successful dry run is required before production.
5. Set Actions repository variable **O_AUTO_PUBLISH_ENABLED=true** to enable daily scheduled auto-publication. Until that exact value is present, scheduled jobs are skipped.
6. Verify repository branch protection permits the narrowly scoped GitHub Actions bot to push to main, or configure a dedicated authorized bot. Do not disable important repository protections casually. Review and configure failure notifications, since GitHub Actions failures otherwise leave the previous edition online.
7. To stop unattended publishing immediately, change **O_AUTO_PUBLISH_ENABLED=false**.

## Publishing lifecycle

- 07:00 local scheduled trigger with timezone support for CET/CEST.
- Search credible sources across the last five days, considering older impactful developments only when the event date is explicit.
- Check at least **two independently owned reporting publishers** per candidate: require the exact linked pages to be surfaced by web search and fetched successfully. Simple duplication of a syndicated agency report is not independent verification.
- Prevent duplicates by comparing article IDs, overlapping original URLs and very similar headlines against roughly three weeks of prior editions.
- Write the article once as a matched IT/EN pair with four substantial paragraphs per language, independent summary, facts, perspectives, unknowns, Q&A, impact from 0.5 to 5 in half-step increments and exactly three tags.
- A second AI model review performs a separate web search for factual disagreements. It can reject questionable stories; it is **not infallible** and does not guarantee truth.
- Create 25 original graphic SVG illustrations labelled as illustrations, with author credit, provenance and license. No unlicensed agency photos are included.
- **Fail closed**: if any category is incomplete, documents inaccessible, API quota exceeded, format incorrect, claims rejected, content tests, build or Playwright fail, do not commit. Retain yesterday's valid edition.
- If all checks pass, commit JSON and art permanently into main, then explicitly dispatch the existing Pages workflow. A push made using the Actions GITHUB_TOKEN does not automatically trigger other push workflows, hence the explicit dispatch. The existing Pages workflow verifies the live site.

## Important limitations

Automated evidence checking is useful but cannot guarantee absence of hallucination, mistranslation or false agreement among sources. The public site should retain correction history and undergo regular **human after-publication audits** even if daily pre-approval is waived. The 25-article quota is a target, not permission to invent weakly sourced stories. If it cannot be fulfilled, the system skips the entire edition and surfaces a workflow failure.

The old **ChatGPT scheduled task at 07:00** is separate. It does not directly invoke this workflow. Once the new automation is really enabled, repurpose that task to monitor and report failures (preferably at a later time), instead of maintaining two separate research jobs.
