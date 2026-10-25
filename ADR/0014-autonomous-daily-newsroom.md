# ADR 0014 — Fail-closed, opt-in autonomous daily newsroom

Status: Proposed; deployment controlled by O_AUTO_PUBLISH_ENABLED, which must remain unset until a real supervised dry-run passes.

## Context
O is a bilingual, static site whose previous policy required pre-publication human review. The publisher requested reliable unattended 07:00 production and approved using important news from prior days if dated honestly. A scheduled ChatGPT task is not a transactional release system, cannot guarantee persistent GitHub files, and is unsuitable as the only production controller.

## Decision
Add a GitHub Actions schedule using the Europe/Rome time zone and the Responses API with web search and JSON structured outputs. The reporter selects articles for 10 World, 5 Italy, 5 Technology and 5 Science by public interest, sourcing and diversity. Each published story requires two traceable independent newsrooms, factual cross-check, paired IT/EN editorial fields, complete images and deterministic validation. Use a separate AI review and the pre-existing content, build and Playwright tests. The workflow commits to main and explicitly dispatches Pages only after all gates pass.

Automatic pre-publication approval is a narrow exception to the previous editorial policy **only after the repository owner explicitly enables the switch following a successful real dry run**. Continue human post-publication sampling and transparent correction commits.

## Failure mode
No edition is published if research, source access, quotas, validation, build or E2E fail. Never invent news to make up the quota, silently modify earlier archives or claim a successful deploy without evidence.

## Tradeoffs
Costs: OpenAI API tokens and web search calls, GitHub runner minutes. Source access and provenance vary (paywalls/anti-bot). Models may share false premises or misread scientific uncertainty; separate AI reviews reduce but cannot eliminate factual risk. GitHub cron may start late or be dropped. The site's data schema and static-only architecture remain unchanged. No web app version bump is needed for this editorial infrastructure addition.
