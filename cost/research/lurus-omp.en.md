# Lurus, omp, Google and token-comparison research

Accessed 2026-11-04. Research in English. Primary pages fetched, not only search snippets.

## Lurus: subscriptions exist; organization Team is usage-based

- https://code.lurus.ai/en/pricing/ : Pro EUR20/month, EUR30 regular model credits plus separate EUR20 Lura balance; Pro+ EUR60, EUR105 regular + EUR60 Lura; Ultra EUR200, EUR400 regular + EUR200 Lura. One-week trial, not a sustainable free plan. No published annual-discount price on fetched pricing page. Ultra advertises Agent Teams & Orchestration, Pro+ CI integration.
- Same page: Team is a separate organization product, EUR0/member, no seat fee or team base fee, fund shared wallet and pay actual model/AI feature usage. Not an included usage allowance. Team conversion permanent. https://code.lurus.ai/en/features/team-management/ independently corroborates wallet, budgets, policies, no seat fee; top-up manually/automatically with 24h funding limit. No minimum seat count/top-up amount stated on these public pages; do not invent one.
- https://code.lurus.ai/en/terms/ , October 2026, sections 5–6: Team wallet does not expire. Included INDIVIDUAL subscription credits expire at each monthly billing-period boundary; separately purchased extra credits do not expire. EUR prices exclude statutory VAT unless otherwise stated. Pricing FAQ payment methods conflict with terms; no need to enumerate payment methods in findings. Terms mention annual invoicing generically, not a published annual rate.
- https://code.lurus.ai/en/features/openai-compatible-api/ : requires Lurus API key, available model and sufficient credit; API returns inference/tool-call data, does NOT execute tools or provide full CLI runtime. Lurus has CLI + VS Code harness as well as gateway, so 'API-only' is false.

### Presentation clarification

Rechecked the pricing and Team-management pages above: Lurus explicitly offers three individual monthly subscriptions, separately from the usage-based Team wallet. Show Pro EUR20, Pro+ EUR60 and Ultra EUR200 visibly; a EUR0 Team seat fee must not imply that no subscriptions exist, or that Team includes free model usage. Do not multiply an individual subscription by the organization headcount and describe it as centrally managed Team billing.

omp is the harness, not a model provider or another subscription bundle. Keep it outside subscription-price cards. Its software fee and the selected inference/payment route are separate costs; technical subscription-login support does not establish provider permission. Codex and Claude Code are also harnesses, distinct from OpenAI and Anthropic as model providers.

### Lurus rate trap

https://code.lurus.ai/en/docs/models-costs/ FAQ EXACT: 'All prices on this page are provider base rates. We apply a 100 % markup on top to cover operations. Depending on your plan, you receive part of this markup back as bonus credits: Pro 50 %, Pro+ 75 %, Ultra 100 %.'

Thus do not present displayed table as final customer rate. Team discount/bonus not published here; conservative calculation is displayed rate x2, explicitly label as arithmetic based on FAQ, and request contractual confirmation of wallet debits. Individual credit bonuses are already in pricing package, not another automatic discount to apply twice.

Displayed EUR /million tokens, before x2 markup:
| Route | uncached input | output | cached read | cache write if displayed |
|---|---:|---:|---:|---:|
| Lura |1.30|3.60|0.35|not listed|
| Claude Sonnet 5.5 (EU)|2.20|11|0.22|2.75|
| Claude Opus 5.5 (EU)|4.40|22|0.22|5.50|
| Claude Haiku 4.5 (EU)|1.10|5.50|0.11|1.375|
| GPT-6.1 Sol (EU)|2.40|12|0.12|3|
| GPT-6.1 Sol Global (US)|2|10|0.10|2.50|
| GPT-6 Luna EU|0.12|0.60|0.012|0.15|
| Gemini 3.8 Flash EU|0.85|4.15|0.085|not listed|
| Gemini 3.1 Flash Lite EU|0.275|1.65|0.0275|0.0825|

Examples AFTER x2 FAQ markup, no bonuses/tax/cache-writing: 1M uncached input +0.1M output: Lura EUR3.32; Sonnet5.5 EUR6.60; GPT6.1 EU EUR7.20. These are worked examples, not observations of invoices. UI catalog calls entries 'provider base rates'; this is Lurus's label, NOT a guarantee equality to upstream direct API rates. EU vs global difference is route-specific, not simple FX conversion.

Lurus costs page also documents default thinking on/high, utility and compaction model requests, budget display and costLimit not a guaranteed hard spend cap. FAQ daily workflows EUR60–100 and heavy automation EUR200+ are vendor orientation, not a measurement or guaranteed bundle.

## omp

- https://raw.githubusercontent.com/can1357/oh-my-pi/main/LICENSE : MIT, commercial use permitted, no software seat price. 'Free harness' does not mean free inference, support, or infrastructure.
- https://omp.sh/docs/providers and https://raw.githubusercontent.com/can1357/oh-my-pi/main/README.md : API keys, OAuth/subscription routes, local engines, custom endpoints. Distinguishes openai-codex ChatGPT account route from openai API key route. Technical subscription login support does not grant provider authorization. Plan reuse must be checked in provider policies (especially Anthropic).
- README: summarized reads, hashline edits, model routing to default/smol/slow/etc, isolated subagents, optional advisor, external search provider APIs and local engines. Token-saving mechanisms are plausible, not a measured whole-harness ranking. More model calls (workers/review/advisor) may consume more total tokens while reducing wall time. Self-hosted inference costs hardware/energy/admin; external search/MCP can have independent fees.
- https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/settings.md : providers.cacheWarming default idle, can be off/streaming/idle. Replays last request with 1 output token, only when estimated avoided miss exceeds refresh cost by at least USD0.05. Idle warming until 30 minutes after last real request; only caches shorter than that window, e.g. Claude 5-minute API caches, not 1-hour OAuth cache. Warming can increase processed tokens but reduce costs; no fixed savings guaranteed.
- Same settings: advisor.enabled false by default. session.warnCost/session.maxCost unset by default. Cap covers agent/subagent and side requests incl compaction, advisor, cache warm, eval completions, widgets, etc, but background memory extraction is not counted/refused; in-flight calls can finish past cap. Therefore call it a local guard, not organization hard invoice cap. No configuration changed during research.

## Benchmark: what it proves, and what not

https://blog.can.ac/2026/02/12/the-harness-problem/ redirects to https://stencil.so/blog/the-harness-problem/index.md (article canonical https://stencil.so/blog/the-harness-problem), author Can Boluk, 2026-02-12, developer/vendor's own work.

- React-file mutations, 180 tasks x3 runs per configuration, fresh sessions, 16 models, compare patch/replace/hashline edit formats in one controlled harness, compare resulting files after formatting.
- Reports Grok4 Fast output-token reduction 61%; Grok Code Fast1 pass rate6.7->68.3; not end-to-end Codex/Claude Code/Copilot vs omp and not current models/versions.
- Article's raw JSONL leakage accusation against Claude Code is author's observation, not independent/current validation. Do not repeat as established universal behavior or use for organizational projection.
- README's '-61% tokens' shorthand must be qualified as OUTPUT tokens for ONE model on edit microbenchmark, not total input+output, subscription quota, costs, or all users. No justified multiplier 'native harness burns 2x/3x omp'.

## Google direct API optional comparison

https://ai.google.dev/gemini-api/docs/pricing redirects to https://aistudio.google.com/docs/pricing . Standard synchronous paid API USD/million:
- Gemini4 Argon:2 input,10 output INCLUDING thinking,0.10 implicit cache read through Nov30 2026; becomes4/20/0.20 Dec1. Explicit cache not supported.
- Gemini3.8 Flash:0.75 input,3.75 output incl thinking,0.075 cache read through Dec31 2026; doubles Jan1 2027. Explicit cache storage0.50 USD/million tokens/hour through Dec31,1.00 after.
- Gemini3.1 Flash-Lite text:0.25 input,1.50 output incl thinking,0.025 cached read; cache storage1 USD/million token-hours.
- Paid data not used to improve products; free tier yes according to pricing table. Avoid treating free API tier as corporate zero-cost default.
- Search grounding:5k free requests/month shared across Gemini3+ then14 USD/1k (daily cap noted); extra separate tool billing, not per token alone. Batch/Flex rates not same as normal interactive coding.

## Measurement recommendation (not performed)

Compare same repository snapshot, task set and acceptance criteria, same model/version/effort/provider route where supported, tool permissions and enabled MCP, warm/cold cache separated, several repeated randomized runs. Record uncached input, cached reads, cache writes, output INCLUDING reasoning, helper/subagent tokens, compaction/warming/background activity, wall-clock, quota debit, actual bill, human corrections, accepted completed tasks. If native product cannot expose same model or raw usage, report product-level cost per successful task; do not invent token parity. Quota depletion != raw token rate != bill rate. Cached tokens can increase token count but lower cost. Subscription quota windows differ; no universal tokens/seat/month.

## Added primary benchmark and base-GitHub checks

Directly fetched Strands article https://strandsagents.com/blog/we-ran-94000-trials-to-measure-the-cost-of-harness-choice/ and raw chart sources https://strandsagents.com/embeds/anthropic-comparison.html and https://strandsagents.com/embeds/openai-comparison.html . Raw JS defines tok as mean input+output tokens/trial (thousands). Anthropic matched set: Claude Code1645k,$1.574,79.28%; omp1319k,$1.074,78.22%. OpenAI matched set: Codex789k,$.362,69.72%; omp1199k,$.492,69.73%. Calculated native/omp token ratios1.2472 and0.6580, respectively. Ratios describe these specific September17 snapshots, not token speed/hour or current subscription quota. Strands is a competing harness vendor; costs partially estimated, not all invoices; accuracy excludes errors. No Copilot or Lurus comparison in this study.

https://github.com/pricing fetched directly: GitHub Free organization $0, Team $4/user/month, Enterprise $21/user/month public displayed base prices. Specific Copilot eligibility docs override broad pricing headline: new $0 incremental access is sales-managed rollout only as of November4, and usage is separate. Existing full GitHub licenses must be added when computing all-in cost, but not bought solely for Copilot Business. GitHub-plan compute allowances are per billing entity, not per Copilot seat.
