# OpenAI / Codex cost evidence — observed 2026-11-04

English research notes. All prices below are USD public list prices unless explicitly stated. Primary pages were fetched/read live, not inferred from search snippets. No repository edits or tests. There is no justified universal token-efficiency ranking between Codex and omp.

## Executive conclusions

1. **New centrally managed self-serve organization:** ChatGPT Business Standard is $25/user/month on monthly billing, or $20/user/month billed annually ($240/seat/year). Requires **2 paid Standard/Premium seats total**. Cheapest new workspace therefore $50/month, or $480/year ($40/month equivalent), before any jurisdiction/currency/tax differences and extra usage. Premium is $125 monthly or $100/month annually ($1,200/year per seat). Both include Codex, ChatGPT Work, and ChatGPT. Source: https://help.openai.com/en/articles/8792828-chatgpt-business-overview and https://openai.com/business/pricing/ .
2. **Standalone Codex-only organizational seats exist, but not as a universally available new Business offer.** The April 2 no-fixed-fee announcement was curtailed June 24. Business can add/retain them only if it already had a Codex seat or pending Codex invitation by June 24. Such eligible legacy-only workspaces have no paid-seat minimum and no recurring Codex seat fee, but every task consumes purchased/shared credits. Enterprise offers no-fixed-fee Codex-only seats under applicable credit-based agreements, with all commercial commitments/minimums contract-specific. Do not present this as a free new self-serve team plan.
3. **API-only organizational route:** local Codex CLI/SDK/IDE (and current authentication guide says desktop app) can use an API key without buying a ChatGPT seat; meter at API prices. This is not the same governance/entitlement product as a managed ChatGPT workspace. No Codex Cloud or workspace-dependent cloud integrations on the API-key route. New API prepaid minimum purchase $5, not a recurring seat price.
4. **Personal floor, kept separate:** Free $0 and Go $8/month offer GPT-6 Luna desktop access, subject to rollout; **Plus $20/month** is the useful full local CLI/IDE/web/cloud personal floor in the current Codex table. Pro $100/$200/$500 monthly tiers. These are not organization-administered seats.
5. **Fresh exception to old 'ChatGPT never includes API credits' wording:** eligible Pro and Business subscriptions can now activate a separately held promotional API grant (Business announcement Oct 28). Business Standard contributes $20/seat/month, Premium $100, pooled cap $500/workspace/month; annual prepaid gets year upfront, cap $6,000/year. **The help page expressly excludes Codex use through API keys from this grant.** It also does not enlarge signed-in Codex allowance. Subscription/API billing remain separate.
6. Current API cached writes are **not free** on GPT-5.6 and later, but signed-in Codex credit/USD rate cards explicitly say **no cache-write charge**. API context above 272K input has higher rates; Enterprise Codex signed in with ChatGPT has no such long-context multiplier. These differences invalidate simple 'same model means same billed dollars' assumptions.

## A. Seats, minimums, included usage, overage, and effective dates

### Business — authoritative current overview

https://help.openai.com/en/articles/8792828-chatgpt-business-overview (shown updated 18 hours ago)

Excerpts:
- "Standard seat | Monthly plan: $25 per user per month Annual plan: $20 per user per month, billed annually".
- "Premium seat | Monthly plan: $125 per user per month Annual plan: $100 per user per month, billed annually".
- "A Business workspace requires at least 2 Standard or Premium seats in total: 2 of either type, or 1 of each."
- "For most countries, pricing (USD) is ... Note that pricing may vary depending on your country and currency type".
- "A ChatGPT Business subscription does not include API usage - API usage is billed separately."

The last generic sentence requires the separate promotional-grant qualification below, not silent deletion of that newly documented benefit.

Both paid seat types include baseline Codex usage; credits are optional add-on capacity after included limits, not the baseline seat itself. Premium has higher Work/Codex limits and no five-hour limit. Standard and Premium seats can be mixed, assigned, reassigned centrally. Seat capacity is paid separately from the member occupying it. A vacated paid seat is still billed until scheduled removal at renewal (legacy-seat article).

https://openai.com/business/pricing/ currently says Business for teams of 2–200 employees; Standard $20 annual/$25 monthly, Premium $100 annual/$125 monthly. Enterprise is "Custom pricing". In this fetch the prominent localized cards displayed **€21/month Standard and €105/month Premium** while body text stated USD prices. This is a locale/currency presentation conflict: do not use these EUR cards as a currency conversion or a Belgian tax-exclusive quote. Obtain actual local checkout/invoice for tax and currency totals; the sources do not establish a universal VAT treatment.

### Codex-only legacy Business and Enterprise

https://openai.com/index/codex-flexible-pricing-for-teams/ dated **April 2, 2026**, now explicitly updated:
> "Update on June 24, 2026: Starting today, new Codex pay-as-you-go seats will no longer be available for Business plans. Existing pay-as-you-go seats are not affected."
Original text promises no fixed seat fee, token-based usage, and announces annual Business reduction $25 -> $20. Its $100/new Codex member (max $500/team) offer is **limited time and legacy**, not a safe currently available startup credit claim.

https://help.openai.com/en/articles/20001492-managing-legacy-codex-seats-in-chatgpt-business (updated 7 days ago):
> "Starting June 24, 2026, Codex seats are no longer available to new ChatGPT Business workspaces or to existing workspaces that had never added a Codex seat."
Eligibility requires at least one pre-June-24 seat **or pending invitation on June 24**. Simply creating a workspace before that date is insufficient.
> "A workspace with only legacy Codex seats has no minimum seat requirement. Adding a paid subscription requires at least 2 Standard seats."
No minimum number of legacy Codex seats; they do not count toward the two-paid-seat minimum. No included usage for such seats: shared workspace credits from first task; no balance => blocked. No ChatGPT chat access in that workspace. Purchased credits valid 12 months.

https://help.openai.com/en/articles/8265053-what-is-chatgpt-enterprise (updated 2 days ago):
> "Under credit-based Enterprise agreements that offer Codex seats, these are usage-based seats, with no fixed cost per user per month."
> "The seat types available to your organization and their billing terms depend on your agreement."
Enterprise purchased at organization level via sales, not individually; standard seats include ChatGPT+Codex. Eligible token-based Enterprise agreements bill USD instead of credits; any seat fees follow agreement. **No public universal minimum Enterprise seat count or commitment found. Do not invent 50/100/150 seats or a fixed monthly cost.**

https://help.openai.com/en/articles/8266401-managing-members-workspace-roles-and-seats-in-chatgpt-enterprise-and-edu : Enterprise can have Codex-only, standard ChatGPT, or a mix. Roles do not override seat type. API Platform membership remains separate.

### Included usage is not a fixed token bundle

https://learn.chatgpt.com/docs/pricing (redirect target of https://developers.openai.com/codex/pricing/):
> "API token prices are separate from subscription usage; don’t use them to estimate included tasks."
> "The number of messages ... depends on the model used, size and complexity ... locally or in the cloud."
Current Standard Business/Plus approximate local messages per five-hour period: GPT-6 Astra 5–45; GPT-6.1 Sol 15–160; GPT-6 Luna 350–3,000. These are estimates, **not guaranteed fixed message allowances**; cloud may consume more, weekly limits may apply, Work shares usage. Current dashboard is authority. Pro plans have no five-hour cap. Premium higher allowance/no five-hour limit confirmed by Business overview.
Fast consumes included allowance 2.5x Standard; Ultrafast 8x. Purchased credits/Enterprise PAYG instead Fast 2x, Ultrafast 6x. These are usage multipliers, not claimed speedups.

https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans :
- Business included limits first, then optional shared paid credits. Without credits, blocked at included limit.
- Business purchased credits expire 12 months.
- Credit-based Enterprise/Edu shared pool under contract, no per-seat usage caps by default; spend/RBAC controls possible. Enterprise overage default "No limit"; owners can set zero/positive cap. In-flight usage can settle after limit.
- Credit purchase prices/discounts are agreement-dependent; no universally confirmed cash-to-credit pack price in fetched public sources. **Do not assume 1 credit=$0.04 just because API/credit tables have matching arithmetic.**
https://help.openai.com/en/articles/20001155-managing-credits-and-spend-controls-in-chatgpt-business gives auto-reload, per-seat-type/per-user monthly limits, owners buying credits; default user/seat limits unspecified. Plugin promotional credits are distinct from API credits and may expire 30 days.

### Current personal prices (not managed organization seats)

https://learn.chatgpt.com/docs/pricing : Free $0; Go $8/month, each Luna Standard desktop subject to rollout. Plus $20/month includes CLI, IDE, web, iOS, cloud integrations, Sol/Luna, optional extra credits. Pro $100/$200/$500/month. No annual-equivalent personal discount established here. https://help.openai.com/en/articles/12642688 says included personal usage first, extra credits afterwards; purchases valid 12 months; account/region/plan-specific purchase prices; Free/Go credit purchase only limited cohort. No fixed universal credit-pack rate established.

### Future announcement, not currently effective

https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits (updated 3 days ago):
> "Starting in December, Plus, Pro, and Business plans’ usage allowance will be shared across ChatGPT and Codex ... Instant chat will not draw from your usage."
Do **not** treat the December 2026 broad pooling change as effective on November 4. Work/Codex agentic usage is already shared; broad ChatGPT/Codex pooling is future. https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes records Premium introduction Aug 24 and usage increase Oct 29; Terra launch Oct 26.

## B. API credits benefit — separate, conditional and excluded from Codex API-key use

https://help.openai.com/en/articles/20001626-api-credits-benefit-for-eligible-chatgpt-subscriptions (updated 6 days ago), plus Oct 28 Business release note above.

Excerpts:
> "The grant funds one linked API organization. It does not increase your ChatGPT or signed-in Codex usage allowance ... or Business workspace credit balance."
> "Business Standard seats | $20 per paid Standard seat, pooled for the workspace"
> "Business Premium seats | $100 per paid Premium seat, pooled for the workspace"
> "Business workspace cap | $500 total per monthly billing period"
> "This benefit does not cover Codex usage through API keys."

Pro full monthly allowances $100/$200/$500 respective tiers. Eligible paid subscription active 7 days; Pro owner/API-org owner; Business activation by owner of both workspace and API organization, same email. Explicit activation needed; eligibility != issued grant. Availability depends enabled cohort/country. Annual prepaid Business full-year grant upfront, cap $6,000/year; first grant prorated, expires at billing-cycle end. Monthly no rollover. Can change/remove in future. Plus/Enterprise/Edu/legacy Codex not established eligible. Seats do not grant API org/project access. No payment method needed for active promo grant; purchased credits/auto-recharge separate. Grant covers general paid API Platform usage but not the quoted Codex API-key exclusion. Do not equate this grant with a Codex overage allowance or guaranteed recurring discount to subtract blindly from seat price.

API setup https://help.openai.com/en/articles/8264644-setting-up-and-managing-prepaid-api-billing : new accounts prepaid; $5 minimum initial purchase ($10 default), purchased credits expire one year, auto-reload enabled by default during setup unless turned off. Recharge limit is not an instantaneous usage cutoff; billing can briefly go negative.

## C. Current OpenAI API model prices relevant to coding

Source https://developers.openai.com/api/docs/pricing.md (https://openai.com/api/pricing/ redirects to business page and is less precise). **USD per 1 million tokens, Standard, short context <=272K input.** Columns below reorder source into input / cache-read / output / cache-write 30m / cache-write 12h.

| Model | Input | Cached input | Output | 30m write | 12h write |
|---|---:|---:|---:|---:|---:|
| GPT-6 Astra | 10 | 1 | 50 | 12.50 | 25 |
| GPT-6.1 Sol | 2 | 0.10 | 10 | 2.50 | 5 |
| GPT-6.1 Terra | 1 | 0.05 | 5 | 1.25 | 2.50 |
| GPT-6 Luna | 0.10 | 0.01 | 0.50 | 0.125 | 0.25 |
| GPT-6 Sol | 2 | 0.20 | 10 | 2.50 | 5 |
| GPT-5.6 Sol | 4 | 0.40 | 20 | 5 | 10 |
| GPT-5.6 Terra | 2 | 0.20 | 12 | 2.50 | 5 |
| GPT-5.6 Luna | 0.20 | 0.02 | 1.20 | 0.25 | 0.50 |
| GPT-5.5 | 5 | 0.50 | 30 | — | — |
| GPT-5.4 | 2.50 | 0.25 | 15 | — | — |
| GPT-5.4 mini | 0.75 | 0.075 | 4.50 | — | — |
| GPT-5.3 Codex | 1.75 | 0.175 | 14 | — | — |
| GPT-5.2 | 1.75 | 0.175 | 14 | — | — |
| GPT-5.1 | 1.25 | 0.125 | 10 | — | — |

For listed long-context flagship models >272K input: input/cache/read/write rates 2x, output 1.5x (e.g. Sol 4/0.20/15). API Fast for current GPT-6/5.6 generally 2x Standard; API Ultrafast Astra/Sol 6x Standard. Batch/Flex tables often half Standard, but do not assume live interactive harness uses these modes. GPT-5.6 Sol price described as promotional at least through **November 21, 2026**; don't invent subsequent rate. Regional processing endpoint uplift 10% for qualifying models released on/after March 5 2026; FedRAMP 10% effective **Nov 1, 2026**. Azure/Bedrock billed by those platforms, not automatically these public rates.

API cost formula needs **non-overlapping categories**: uncached input*rate + cached reads*rate + cache-written input*applicable write rate + all output (including reasoning)*output rate, each /1M, then tools/compute/tax as applicable. Cache-write rate replaces ordinary input on that portion, it is not additive.

### Signed-in Codex paid rates are distinct billing path

https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu-credit-based-pricing current Standard credits/1M input/cached/output:
- Sol 6.1: 50 / 2.5 / 250;
- Terra 6.1: 25 / 1.25 / 125;
- Astra: 250 / 25 / 1,250;
- Luna 6: 2.5 / 0.25 / 12.5;
- Sol 5.6: 100 / 10 / 500;
- Terra 5.6: 50 / 5 / 300;
- Luna 5.6: 5 / 0.5 / 30;
- GPT-5.3 Codex: 43.75 / 4.375 / 350.
These cover local/cloud/automations/code review/delegated workers. Typical Sol 6.1 task 2–15 credits is an illustrative range, not guaranteed. Source also says average Codex spend approx $100–$200/developer/month, varying strongly; this is vendor workload estimate, **not a compulsory minimum or a seat price**.
> "Codex does not charge for cache writes."
> "For Enterprise Codex usage when you sign in with ChatGPT, there is no 272K-input-token pricing threshold and no additional context-length charge."
API-key flow separately follows API prices. Small subset of legacy Enterprise customers still has legacy message-average card until migrated; do not average/mix cards.

https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing : eligible Enterprise USD contracts have same current Standard dollar model rates as short-context API examples, but no Codex cache-write charge, no signed-in Codex long-context uplift. Applicable contract, discounts and billing migration govern. Fast 2x/Ultrafast 6x; regional/FedRAMP 1.1x; web search $10/1k web runs plus tokens, voice $0.05/min plus backend model; feature availability applies.

## D. Technical consumption behavior, auth, cloud/compute

### Authentication / prerequisites

https://learn.chatgpt.com/docs/auth.md :
> "Sign in with ChatGPT for subscription access" vs "Sign in with an API key for usage-based access".
Desktop/CLI/IDE support both local methods; **Codex Cloud requires ChatGPT sign-in**. API usage follows API organization's retention/data policy; signed-in follows workspace/RBAC/Enterprise policy. API key path doesn't consume included ChatGPT credits. Email/password Codex Cloud requires MFA; SSO admins should enforce MFA. https://learn.chatgpt.com/docs/enterprise/admin-setup.md says Enterprise Cloud off by default unless previously enabled; workspace permissions, repository permissions, integrations, secrets must each be configured; a seat doesn't grant source-system access. API organization/project access separate from ChatGPT membership.

### Caching

https://developers.openai.com/api/docs/guides/prompt-caching.md :
> "Cache-write pricing is not an additive fee: input tokens use the uncached-input, cached-input, or cache-write rate."
> "For GPT-5.6 and later, cache writes cost 1.25x ... default 30-minute lifetime"; 12h 2.5x; read 0.1x usually, **0.05x Sol/Terra 6.1**.
Default supported API caching, exact rendered prefix match, >=1,024 visible input tokens for 5.6+; stable instructions/tools/history improve reuse. Changes to tool definitions, model, reasoning, old messages can break prefix. Org/region caches separate; hit not guaranteed. Explicit mode can avoid writes for volatile content. Contrast signed-in Codex free cache writes above.

### Compaction

https://developers.openai.com/api/docs/guides/compaction.md : replaces long history with opaque encrypted item carrying key state/reasoning, lowers subsequent context tokens, automatic threshold or standalone compact endpoint. Does **not** publish universal reduction ratio or claim compaction is free. https://developers.openai.com/api/docs/guides/prompt-caching.md explicitly warns compaction changes prefix and can reset cache reuse. Thus net savings depend on history, cache rebuild, task and compaction overhead; don't assert all shorter raw context equals cheaper successful task.

### Reasoning and subagents

https://developers.openai.com/api/docs/guides/reasoning.md :
> "While reasoning tokens are not visible via the API ... [they] are billed as output tokens."
Few hundred to tens of thousands possible; higher effort tends to more time/tokens; Pro reasoning mode aggregates more model work billed at same selected per-token rates. Output limits can be hit before any visible answer, still incur reasoning/input cost. `output_tokens` already includes reasoning; don't double-add reasoning when calculating cost.
https://learn.chatgpt.com/docs/agent-configuration/subagents.md :
> "Because each subagent does its own model and tool work, subagent workflows consume more tokens than comparable single-agent runs."
Agent model/effort can be selected separately, else inherit. Delegation can reduce main-thread pollution/time but no universal overall cost win. Token categories and success must be measured, not fixed harness multipliers.

### Cloud and compute extras

https://learn.chatgpt.com/docs/environments/cloud-environments.md : Plus VM 2 vCPU/8GiB RAM/8GiB disk; Pro/Business/Enterprise default 4vCPU/16GiB/32GiB. Larger/custom Enterprise VMs: **contact account team for configurations/pricing**. No public separate fixed standard Codex Cloud VM fee found; cloud activity consumes plan allowance or applicable token/credits. Do not import API container fees into signed-in Codex Cloud as if identical product. Connected services, VPN, private dependencies, CI/self-hosted local VM may have their own costs; no standardized published total found.

API pricing https://developers.openai.com/api/docs/pricing.md separately lists Hosted Shell/Code Interpreter containers: 1GB $0.03, 4GB $0.12, 16GB $0.48, 64GB $1.92 per 20-minute session/container, plus a note eligible sessions bill by minute with five-minute minimum. This is a billing-granularity caveat, not evidence local shell execution in Codex/omp costs that fee. Web search $10/1k calls plus content tokens; file search $0.10/GB/day (first GB free) and $2.50/1k calls. API tokens for built-in tools additionally model-billed. Ordinary local tool execution uses customer compute; no OpenAI hosted-container charge automatically implied.

## E. Direct omp vs Codex evidence (do not extrapolate)

### Strands primary benchmark, Oct 13 2026; snapshot Sept 17

https://strandsagents.com/blog/we-ran-94000-trials-to-measure-the-cost-of-harness-choice/ and embedded primary data https://strandsagents.com/embeds/openai-comparison.html (raw HTML read).
Vendor-performed research (Strands competitor), ~94,000 total trials, matched subset 82,400 across 9 models, high reasoning, matched model/benchmark combinations. OpenAI set GPT-5.6 Luna/Sol/Terra, 24 shared model/benchmark combinations, **6,180 trials per harness** across eight benchmark families including coding and noncoding. Raw chart:
- Codex **$0.362 estimated/trial; 69.72% accuracy; 789k input+output tokens/trial**.
- omp **$0.492 estimated/trial; 69.73%; 1,199k tokens/trial**.
Excerpts:
> "Billed cost data ... was not consistently available ... estimated ... using actual token usage and per-model rate derived from trials that did report costs."
Accuracy excludes errored trials; cost denominator total trials. Thus credible direct observation under this setup, not actual invoice guarantee or current 6.1 model ranking. Aggregate data don't isolate cache/tools/context causes. **Do not assert omp cheaper than Codex from available evidence.**

### Composio primary study gives different ordering

https://composio.dev/content/best-ai-agent-harnesses dated **Aug 4 2026**: same Kimi K3/OpenRouter/max reasoning/Composio MCP, 25 business-app tasks (24-task usage slice), list price estimate July 30. omp 22/25 (88%), cost/success $0.52; Codex 17/25 (68%), $0.66. Business-app tooling, not representative native OpenAI coding workload, external model, small sample. This and Strands are not mutually exclusive; model/workload/config changes outcome. No fixed Codex-vs-omp token ratio defensible.

## F. Subscription OAuth authorization in third-party tools — critical distinction

Official OpenAI now documents a supported route; blanket 'all third-party subscriptions forbidden' is inaccurate.

https://developers.openai.com/siwc/token-sharing-open-source.md :
> "your open-source app can request permission to use the user’s ChatGPT plan for eligible Responses API requests".
Requires user-defined dynamic OAuth client registration, account/workspace-bound client ID, stable per-host `ext_agent_host_id`, explicit granted plan-use permission, credentials managed correctly. Paid/remotely hosted apps directed to partner interest process.
https://developers.openai.com/siwc/token-sharing-open-source/models-and-inference.md :
> "Use the public Responses API endpoint ... do not point it at ChatGPT's backend-api endpoints."
Must use `store:false`, `stream:true`, available account model. Preview limitations https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations.md restrict endpoints/tools/features; this is not unrestricted normal API access.

https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites : supported commercial sharing Go/Plus/Pro; OSS integrations available all ChatGPT users; signing in and permission to consume plan are separate. App weekly cap; app credits use off by default, explicit opt-in; no added allowance; app can charge independent infrastructure/service fee.
Official directory https://learn.chatgpt.com/docs/sign-in-with-chatgpt.md lists OSS **Pi, OpenCode, OpenClaw, T3**, **not omp**. Names Pi and omp must not be conflated. Documentation here establishes a permissible integration mechanism, **not verification that omp implements it or that organization-seat subscription sharing works for omp**. README advertising OAuth alone is insufficient. Need actual supported integration/registration/endpoint evidence to claim authorized omp subscription consumption. Business/Enterprise managed-seat sharing entitlement not conclusively established by this public directory/help pair; retain uncertainty. API-key billing remains the clearly documented separate route.

## Uncertainty and conflict log for the final report

- April no-seat-fee Business announcement vs June24 restriction: use current legacy eligibility, not initial announcement.
- Generic 'Business excludes API usage' vs Oct28 conditional API promotional grant: explain separate conditional grant and **Codex API-key exclusion**.
- Localized € cards vs USD body: preserve currency, do not convert or assume tax treatment; checkout/contract needed.
- Signed-in no cache-write/no Enterprise long-context uplift vs paid API writes/uplift: separate authentication/billing routes.
- Credit cash purchase rate and Enterprise minimum/commitment not publicly established; don't manufacture.
- 'Typical 2–15 credits' and '$100–$200 developer/month' are vendor workload examples, not bill floors or guaranteed allowance.
- December shared-limit change is announced but future as of date.
- Direct benchmarks disagree in ordering across different models/tasks: neither implies universal cost ranking.
- Compaction guide doesn't establish a universal savings ratio or free compaction; don't invent one.
- OAuth support claimed by tool != documented vendor authorization for its actual implementation; OpenAI supports explicit registered OSS sharing, but omp not in directory.
