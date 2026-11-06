# Anthropic / Claude Code organization cost evidence

Research cut-off and retrieval date: 2026-11-04. English working evidence for a Dutch report. All pages below were fetched and read, not only search-result snippets. Prices are public USD web/list prices, generally excluding tax; regional currency, VAT and mobile-store differences must be checked at checkout. No benchmark, build, or test was run by this researcher.

## 1. Decision summary

- **Cheapest currently published centrally administered subscription including Claude Code: Team Standard, $25 per named user/month month-to-month, or $20/user/month annual equivalent ($240/user/year billed annually), minimum TWO members, maximum 150.** Premium is not required to obtain Code. Minimum total: $50/month on monthly billing, or $480/year ($40/month equivalent) on annual billing. Team provides central billing/admin and SSO. [Official pricing](https://claude.com/pricing), [Team definition](https://support.claude.com/en/articles/9266767-what-is-the-team-plan), [seat types](https://support.claude.com/en/articles/12004354-purchase-and-manage-seats-on-team-plans).
- Team Premium is $125/user/month monthly or $100/user/month annual equivalent ($1,200/user/year), for higher allowance, not a Code entitlement upgrade. Mix Standard and Premium. No additional minimum Premium-seat quantity is stated. The two-member minimum is plan-wide. Same sources.
- A separate **Claude Console organization/API usage route** can centrally manage Claude Code without buying Team subscriptions: create/fund a Console organization, invite users and assign Claude Code or Developer roles. The documented route does not list a per-seat subscription charge or Team minimum. It is per-token billing, **not an included-usage subscription**. This means Team is the cheapest *seat subscription*, not necessarily the cheapest way to buy occasional organizational Code usage. [Authentication](https://code.claude.com/docs/en/authentication), [API payments](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage).
- **Direct omp inference is not authorized merely because a subscription OAuth connector works.** Anthropic's current official legal/authentication page confines subscription OAuth to ordinary Claude Code/native Anthropic applications and prohibits third-party apps offering Claude.ai login or collecting/intermediating those credentials/tokens. Use an organization-owned Anthropic API key or supported cloud-provider credentials for omp unless Anthropic grants a specific agreement. The exception is an end user logging into the **unmodified Claude Code binary**, even when that binary is hosted by another platform; that is not the same thing as omp directly making model requests. [Legal and compliance](https://code.claude.com/docs/en/legal-and-compliance).
- **Important October 2026 change:** Team now includes claimable, separately metered **Claude Platform API credits**: $20/month per Standard seat plus $100/month per Premium seat, pooled across the linked Console organization, capped at $500/month. These can fund users' own API apps/agents, including API-key-based omp by application of the general API eligibility; they do **not** fund interactive Claude Code or Claude-app extra usage. Treat API billing separately, but do not incorrectly say that *all* Team API usage necessarily costs extra from dollar one. [Credits rules](https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans), [October 7 announcement](https://www.anthropic.com/claude-haiku-5-5).

## 2. Current subscription table and prerequisites

| Product | Monthly billed monthly | Annual-equivalent monthly | Upfront annual amount | Organization status / included Code |
|---|---:|---:|---:|---|
| Pro personal | $20 | $200/12 = $16.67, marketed as $17 | $200 | Individual consumer, not centrally managed; Code included |
| Max personal | $100 | No annual offer documented | Not offered | Individual consumer; Code; 5x Pro usage each 5 hours and week |
| Ultra personal | $200 | No annual offer documented | Not offered | Individual consumer; Code; 10x Pro weekly allowance; verified accounts have no 5-hour limit |
| Team Standard | $25/seat | $20/seat | $240/seat | Named managed seats; Code included; 2–150 members |
| Team Premium | $125/seat | $100/seat | $1,200/seat | Same entitlement plus higher allowance; mixed seats permitted |
| Enterprise current new contracts | No monthly seat-billing offer shown | $20/seat plus ALL usage at API rates | $240/seat, 20-seat minimum = $4,800/year base | Single Enterprise seat includes Code, chat and Cowork; seat fee buys access, no token allowance |
| Console/API organization | No seat-subscription fee listed in documented setup | Not a subscription | Prepaid/invoiced API consumption | Organization API billing, users/roles/workspaces; no Team subscription prerequisite |

Sources: [pricing](https://claude.com/pricing), [Pro](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan), [Max](https://support.claude.com/en/articles/11049741-what-is-the-max-plan), [Team](https://support.claude.com/en/articles/9266767-what-is-the-team-plan), [Enterprise billing](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan), [Code authentication](https://code.claude.com/docs/en/authentication).

Primary excerpts:

- Team help: **“Team plans require a minimum of two members.”** Standard: **“$25 per member per month, billed monthly”** and **“$20 per member per month, billed annually.”** Premium: **“$125 … billed monthly”** and **“$100 … billed annually.”** Page says “Updated this week”; no exact effective date supplied.
- Seat-management table: **“Standard | Base features, usage limits, and Claude Code access.”** **“Each seat on a Team plan is assigned to one named individual, and only that person may use it.”** No rotating one seat through several active developers or transferring unused usage to others. Page says “Updated over 2 weeks ago.”
- Pricing page: Pro **“$200 billed up front”**, **“$20 if billed monthly”**; Max $100 and Ultra $200/month. Max and Ultra billing cycle is monthly. It explicitly marks central billing and administration “No” for personal plans.
- Pricing page Enterprise: **“US$20/seat/month, billed annually, 20 seat minimum. Usage cost scales with model and task.”** Enterprise billing: **“The seat fee … doesn't include any usage. Every token your team consumes is billed separately at standard API rates.”**

Illustrative total subscription arithmetic, before tax (calculated from the cited prices):

- 2 Standard: $50 monthly, or $480/year ($40/month equivalent).
- 5 Standard: $125 monthly, or $1,200/year ($100/month equivalent).
- 10 Standard: $250 monthly, or $2,400/year ($200/month equivalent).
- 1 Standard + 1 Premium: $150 monthly, or $1,440/year ($120/month equivalent).
- Premium upgrade difference: +$100/month on monthly billing, or +$80/month annual equivalent. This is a rational comparison against recurring overage spend, but it is not a guaranteed dollar-equivalent token allowance.

### Operational and billing prerequisites

Team: an Owner/Primary Owner purchases seats, invites each developer; developers install Code or use Code in Claude Desktop, then authenticate with the invited claude.ai account and select the organization. Every Team seat already includes Code. Only Owners/Primary Owners can purchase; Admins and above can reassign tiers. Team availability is restricted to supported locations. [Team Code setup](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan), [seat management](https://support.claude.com/en/articles/12004354-purchase-and-manage-seats-on-team-plans).

Seat additions/upgrades are prorated immediately. Removing a member does not refund the seat: it becomes assignable. Reducing total allocation takes effect at renewal, including annual renewal for an annual subscription; no immediate prorated refund. [Team billing](https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated), [seat management](https://support.claude.com/en/articles/12004354-purchase-and-manage-seats-on-team-plans).

Console route: invite users and assign **Claude Code** role (only Code API keys) or **Developer** role (general API keys). Fund the Console organization, or claim qualifying included API credits. Workspace controls provide centralized usage/spend management. Purchased API credits expire one year after purchase and are non-refundable. Auto-reload is optional. Some sales accounts invoice monthly in arrears. The public payment help page read here does not state a fixed minimum purchase, so do not invent a $5 minimum. [Authentication](https://code.claude.com/docs/en/authentication), [getting started](https://support.claude.com/en/articles/8114531-i-created-a-claude-console-organization-how-do-i-start-using-the-claude-api), [payment rules](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage).

## 3. Included subscription use, shared allowance, and overage

Team limits are per named member, not a shared org-wide token pool. **Standard has 1.25x Pro per-session allowance; Premium 6.25x Pro**, i.e. 5x Standard. Each has a weekly all-model limit too. These relative session figures do not establish fixed monthly tokens or developer-hours. Usage varies with model, context, attachments and agent behavior. [Team definition](https://support.claude.com/en/articles/9266767-what-is-the-team-plan).

Official Code costs page: **“The allowance is shared with Claude chat and Cowork”** and resets in five-hour and weekly windows. Chat and terminal/IDE Code are not two independent budgets. Personal Pro/Max/Ultra similarly share Claude and Code limits. [Costs](https://code.claude.com/docs/en/costs), [personal Code](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan).

For Team, owners can enable prepaid **usage credits** for selected users or everyone, set organization and user monthly limits and optional auto-reload. Once the seat allowance is exhausted, continued use draws paid usage credits at **standard API rates**, within the same Claude/Code subscription flow. Owners can disable this completely. A limit can be slightly exceeded by a final request because allowance is checked before the request and cost computed afterward. The overage article has an explicit date **September 4, 2026**. [Organization usage-credit rules](https://support.claude.com/en/articles/12005970-manage-usage-credits-for-team-and-seat-based-enterprise-plans).

Separately, developers can explicitly switch to Console/API or cloud-provider billing. Authentication affects which bill receives the charge. Current authentication docs place an approved `ANTHROPIC_API_KEY` above subscription login (always used in non-interactive `-p` when set). Thus a developer with a paid subscription can still generate API charges unintentionally if configured to use a key. `/status` identifies the active method; subscription users should not interpret the locally displayed list-price session estimate as an extra invoice. [Authentication precedence](https://code.claude.com/docs/en/authentication), [cost estimates](https://code.claude.com/docs/en/costs).

### NEW separate monthly API credit balance (not usage credits)

The October 7, 2026 Haiku announcement says **“this week, we'll roll out a new monthly API credit to all Max, Ultra, and Team subscribers”**. The current dedicated help page provides the full rules:

| Plan | Monthly included API credits |
|---|---:|
| Pro | None |
| Max | $100 |
| Ultra | $200 |
| Team Standard | $20 per seat |
| Team Premium | $100 per seat |
| All Team seats combined | Pooled, capped $500/month |
| Enterprise | Not eligible |

[Credits help](https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans).

Requirements/caveats:

1. Subscription active/good standing; new subscribers wait **seven days** before claiming. Offer rollout caveat remains on current help page.
2. Subscriber (personal) or Team Owner/Primary Owner links one Console organization; must also hold Console Owner/Admin/Billing role. A card is not required just to claim/use these credits.
3. Each plan links one Console organization, and each organization receives credits from only one plan. Changing link requires support.
4. Credits arrive monthly even for annual plans, expire each billing cycle, do not roll over, and are consumed before purchased credits. Everyone with an API key in the linked Console org draws from the same pool.
5. Cover Claude API Messages/Batch, Playground, Managed Agents and Agent SDK; any available Claude model. **Do not cover interactive Claude Code terminal/IDE/desktop/web, Claude-app extra usage, or Bedrock/Vertex/Foundry.**
6. If no purchased credit/auto-reload remains after the grant, API requests stop; **“Usage is never charged to your Claude plan.”** An invoiced API organization pays overage as usual.
7. Narrow `claude -p` nuance: eligible when run directly by you using a linked-org API key, because classified as Agent SDK usage; not covered merely by using `-p` from GitHub Action, IDE extension or desktop. Subscription-authenticated SDK/headless use still draws subscription limits.

Application to omp: **[INFERENCE]** own omp requests made with an API key in the linked organization should qualify as ordinary Messages API calls, unlike trying to reuse subscription OAuth. This follows the general “Claude API (Messages API and Message Batches API)” coverage; the help page does not name omp. No special omp-specific authorization claim is made.

Cost accounting example **[INFERENCE / arithmetic]**: two annual Standard seats cost $480/year and can claim $40/month API credits alongside their ordinary native Code allowance. For eligible API consumption A in a month, additional API purchases are approximately max(0, A−40), subject to other organization spending, model/tool rates and credit expiry. Do not count credits as a cash rebate or subtract them from the subscription invoice. At 25 Standard seats the $500 cap is reached; at 50 Standard seats effective pooled grant is $10/seat, not $20/seat.

## 4. Subscription OAuth versus omp: precise permission boundary

Primary authoritative source: [Claude Code legal and compliance](https://code.claude.com/docs/en/legal-and-compliance), live documentation, no explicit update date.

Excerpts:

> “OAuth authentication is intended exclusively for purchasers of Claude Free, Pro, Max, Ultra, Team, and Enterprise subscription plans and is designed to support ordinary use of Claude Code and other native Anthropic applications.”

> “Developers building products or services that interact with Claude's capabilities … should use API key authentication through Claude Console or a supported cloud provider.”

> “Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, Max, or Ultra plan credentials on behalf of their users.”

> “developers may not collect, store, or intermediate Claude.ai credentials or session tokens — sign-in to a Claude account must complete through Anthropic's own flow.”

Exception:

> “Nor does it prevent an end user from signing in to the unmodified Claude Code binary with their own Claude subscription, including where a platform hosts Claude Code …”

The OAuth definition includes Team/Enterprise even though one sentence enumerating prohibited credential routing lists consumer plans. This is not affirmative permission for third-party Team OAuth. No omp-specific grant was found. Report **API/cloud billing is the documented supported route for direct omp Anthropic use; subscription OAuth compatibility is not vendor permission**, with the unmodified-Code and negotiated-agreement caveats. New API credits make API-key usage potentially included in the subscription's separate credit benefit; do not describe that as subscription OAuth access.

Team/Enterprise/API use Commercial Terms; personal Free/Pro/Max/Ultra use Consumer Terms. Hosted Code must remain unmodified; platform providers cannot pay for/resell/intermediate users' Claude usage. Each end user supplies their own credential under their own agreement. Same legal source.

## 5. Current coding-relevant Anthropic API token/cache prices

Primary complete table: [Claude Platform API pricing](https://platform.claude.com/docs/en/about-claude/pricing). USD per **million tokens** (MTok), standard/global routing, non-Batch, non-fast mode.

| Model | Uncached input | Output | 5-minute cache write | 1-hour cache write | Cache read/hit + refresh |
|---|---:|---:|---:|---:|---:|
| Opus 5.5 | $4 | $20 | $5 | $8 | $0.20 |
| Sonnet 5.5 | $2 | $10 | $2.50 | $4 | $0.10 |
| Haiku 5.5, prompt ≤100k | $0.10 | $0.50 | $0.125 | $0.20 | $0.01 |
| Haiku 5.5, prompt >100k | $0.50 | $2.50 | $0.625 | $1 | $0.05 |
| Opus 5 / 4.8 / 4.7 / 4.6 / 4.5 | $5 | $25 | $6.25 | $10 | $0.50 |
| Sonnet 5 | $2 | $10 | $2.50 | $4 | $0.20 |
| Sonnet 4.6 / 4.5 | $3 | $15 | $3.75 | $6 | $0.30 |
| Haiku 4.5 | $1 | $5 | $1.25 | $2 | $0.10 |

The latest 5.5 launches predate the research cut-off: [Opus 5.5 September 22, 2026](https://www.anthropic.com/claude-opus-5-5), [Sonnet 5.5 September 28, 2026](https://www.anthropic.com/claude-sonnet-5-5), [Haiku 5.5 October 7, 2026](https://www.anthropic.com/claude-haiku-5-5). Haiku announcement explicitly confirms Sonnet cache-read cut to $0.10 effective **October 7**, although the currently edited Sonnet launch page also shows $0.10. Use the dated Haiku announcement for historical effective-date evidence.

Additional current considerations from API pricing:

- Haiku 5.5 threshold counts **all prompt input including cache reads/writes**; over 100k means the whole request uses higher pricing, not just excess tokens. Requests are priced individually.
- Other 4.6+ models include full 1M context at standard per-token rates (not a blanket old >200k premium). Do not apply obsolete Sonnet long-context rates to current 5.5 models.
- 5-minute writes = 1.25× base input, 1-hour writes = 2×. Most cache reads = 0.1×; Opus/Sonnet 5.5 = 0.05×. Cache writes cost more than ordinary input; savings require reuse.
- Fast Opus 5.5 is **$8 input/$40 output**, twice standard; caching multipliers still apply.
- US-only `inference_geo` for 4.6+ applies **1.1× to every token category**. Default global uses table rates. Partner-operated Bedrock/Google endpoints have their own regional pricing (commonly +10%); cloud contracts may differ.
- Batch gives 50% discount on input/output for asynchronous jobs, not an assumption applicable to an interactive coding session.
- Tool definitions, tool-call content and tool results count as tokens. Server-side tools may add fees, e.g. search. Do not equate all token counts to uncached input.
- Current docs say 4.7+ use a newer tokenizer producing approximately 30% more tokens for the same text, depending on content; it is **not** a universal harness-efficiency ratio.
- Sonnet 5's originally scheduled September 1, 2026 increase to $3/$15 **did not occur**. Current $2/$10 is standard, not an expired introductory price. Explicit pricing footnote confirms.
- Opus 4.0/4.1 and Sonnet 4 appear retired on first-party API, with some partner availability. Do not recommend their historical prices as current first-party choices.

Illustrative metered-cost formula (before extra tools, regional modifiers/discounts): sum across every main/subagent/helper request and model of `(uncached_input×input_rate + cache_write_5m×write5_rate + cache_write_1h×write1h_rate + cached_input×read_rate + output×output_rate)/1,000,000`. Then apply eligible remaining API credits once at organization balance level. This is accounting, not an assumed token-efficiency multiplier.

## 6. Per-developer guidance and context/subagent overhead

[Official Code costs page](https://code.claude.com/docs/en/costs) currently reports:

> “Across enterprise deployments, the average cost is around $13 per developer per active day and $150-250 per developer per month, with costs remaining below $30 per active day for 90% of users.”

It immediately recommends a small pilot to establish a local baseline. Treat this as Anthropic's observed planning reference, not a promised fixed price, included Team allowance, omp estimate, or tariff. The $13/day and monthly range should not be mechanically multiplied into a 20-day estimate because active days/population are unspecified. Older figures such as $6/day and $100–200/month should not replace the current page.

For a practical organization budget:

1. Native Code: fixed Team seat cost + optional capped extra-usage credits; do not convert seat allowance into guaranteed monthly API dollars.
2. omp with Anthropic: API token cost under actual model mix minus separately eligible remaining API grant, plus seat subscription only if the organization actually buys one. Console API alone does not need Team.
3. Enterprise: $20 annual-equivalent seat fee **plus all usage**, no included allowance; governance can justify Enterprise but it is not automatically cheapest inference.
4. Measure total cost per **accepted task**, quality and human rework, model mix, cache hit/write counts, compaction/helper/subagent tokens, failures/retries and concurrency in a representative pilot.

[How Code uses caching](https://code.claude.com/docs/en/prompt-caching): every request resends history; exact-prefix cache avoids recomputing unchanged material. Model switching invalidates full cache; changing tools/system prefix can invalidate subsequent content. Main interactive subscription turns within allowance default to 1h cache, but API/cloud/usage-credit main requests default to 5m; subagents default 5m. A comparison that leaves TTL unmatched may measure configuration as much as harness design.

Compaction is not free: a separate request reads history and generates a summary; with warm cache the prefix can be read cheaply, after a long idle the history is uncached. Following turn writes the shorter conversation cache. Compaction can reduce subsequent cost, but has immediate summarization/output and rebuild overhead. **No fixed compaction savings percentage** can be assumed.

Subagents have their own conversation, system prompt and tools; first ordinary subagent request doesn't share parent cache because prefixes differ, then warms its own. Parent cache remains intact. Forks with identical inherited prefixes can share cache. [Exact subagent caching rules](https://code.claude.com/docs/en/prompt-caching#subagents-and-the-cache).

Official costs page says separate active agent-team instances each have a context window; usage grows with active count and run duration. Routine work on Sonnet/Haiku and Opus for harder review/planning can change model mix, but cheaper models can take more steps. Token cost includes schemas, file/log results, thinking/output and helper requests; more agents can reduce elapsed time without reducing spend. None of this establishes that omp is inherently X% cheaper or more expensive.

## 7. Real comparisons involving omp: evidence, limits and reproducibility

### A. Strands research, published October 13, 2026 (research author's primary source)

[Study](https://strandsagents.com/blog/we-ran-94000-trials-to-measure-the-cost-of-harness-choice/), [public Anthropic chart with raw JS data](https://strandsagents.com/embeds/anthropic-comparison.html).

Study reports ~94,000 total trials; 82,400 in matched comparisons, eight benchmarks, 12 models overall, six harnesses. Snapshot **September 17, 2026**, before current 5.5 launches. Anthropic matched comparison: 32 model×benchmark combinations, **8,240 trials per harness**, models Fable 5, Opus 5, Opus 4.8, Sonnet 5. High reasoning effort. Harbor platform and public Strands adapter are linked.

Raw chart source explicitly defines cost as estimated cost/trial and accuracy as mean score excluding errored trials. Its points:

| Harness | Estimated cost/trial | Accuracy excluding errors | Total input+output tokens/trial |
|---|---:|---:|---:|
| Strands | $0.739 | 80.41% | 835k |
| OpenCode | $0.868 | 79.78% | 961k |
| DeepSeek Harness | $0.888 | 77.66% | 1,098k |
| omp | $1.074 | 78.22% | 1,319k |
| Claude Code | $1.574 | 79.28% | 1,645k |

Thus **[calculated from published matched aggregates]** omp estimated cost is about 31.8% below Claude Code, total tokens about 19.8% lower, with accuracy 1.06 percentage points lower in this particular matched set. Do not turn these into a fixed token ratio, current 5.5 monthly budget or guaranteed quality equivalence.

Important excerpt: **“Billed cost data … was not consistently available.”** Missing dollar costs were estimated with actual token usage and per-model rates derived from runs with reported costs. Therefore these are not universally observed invoices, and no exact causal contribution of caching versus tool loop versus context is isolated. Research author is a competing harness vendor. Public chart aggregates/methodology permit checking the quoted figures, but this researcher did not locate raw per-trial workbook download or rerun the study; **not independently reproduced here**.

### B. Looming Tech one-ticket report, October 1, 2026 (experimenter's primary source)

[Report](https://www.looming.tech/post/agentic-coding-harness-benchmark).

One private fintech ticket, six headless runs, same account, Opus 5.5 orchestrator and same workflow. Representative pair: omp **$12.51**, Claude Code **$14.52**, 19.8 vs 21.7 minutes, output 167k vs 165k, requests 212 vs 194. Main driver: omp delegated more output to Sonnet (**23% output Opus**) vs Claude Code (**88% Opus**). Both green on build/tests, checklist **13/14 vs 12/14**, so not literally identical completion. One omp failure cost **$34.84**, 43.7 minutes.

All reported costs: CC $15.78/$14.52; omp $12.45/$34.84/$15.19/$12.51. The author's headline “14% cheaper” fits the chosen pair (~13.8%), but reported clean-run averages $13.40 vs $15.15 imply about **11.6%**, not 14%. **[calculated]** including all four omp runs gives $18.7475 average, approximately **23.7% more** than CC $15.15. The article says “four clean runs” despite listing two CC and three non-outlier omp runs, an internal counting/averaging inconsistency.

Further caveats: single private task, no linked full repo/task/transcripts, no independent reproduction possible from page alone; configuration and model mix differ. The article claims Claude Code lacks per-agent model overrides, but current Anthropic docs explicitly support per-subagent model configuration, so that claim is stale/incorrect as a general current capability comparison. Its statement that omp uses Anthropic subscriptions is technical/user testimony, **not permission** overriding Anthropic's legal restrictions.

### C. Composio Pi vs omp, September 1, 2026 (experimenter's primary source)

[Report](https://composio.dev/content/pi-vs-omp).

30 real-app tool tasks, DeepSeek V4 Flash, not Anthropic. Pi 20/30, omp 17/30, Claude Code 16/30 in the wider run. Pi/omp average tokens 558,885/742,283; $0.56/$1.75 total. But Pi used high reasoning rather than max and 24/30 Pi tasks hit direct DeepSeek API rather than OpenRouter; report warns cost comparison is confounded. **Not evidence of an Anthropic subscription price or coding-repo universal omp saving.** Shows that harness rankings vary with task/model/config. Included only as boundary against universal efficiency claims.

Recommended defensible report wording: published evidence shows harness choice can materially alter costs; there is a matched September Anthropic comparison favoring omp on estimated cost with a small accuracy tradeoff, but no reliable fixed conversion ratio for this organization's workloads, current models, subscription allowance or €/developer/month. Run a same-task/model/effort/provider/cache/config acceptance-gated pilot and include failed runs.

## 8. Conflicts, dates and uncertainty to preserve in final report

- Current official sources agree Team Standard includes Code and minimum **two**, not older “Premium only / five seats” advice. No need to buy Premium simply for Code.
- Current personal tiers are Pro/Max/Ultra. Do not present old Max 20x $200 naming/limits as current; current $200 Ultra has 10x weekly Pro allowance, no 5h limit only for verified accounts.
- Pro advertised $17 is rounded from $200/year = $16.67, not $17×12=$204.
- Team usage allowance is per person and cannot pool; **monthly API credits do pool**. These are different budgets.
- Monthly API credits are new October 7 rollout benefit; current generic “API billed separately” advice must retain this exception while keeping API authentication/metering distinct.
- Interactive Code cannot spend included API grants, but some directly run API-key `claude -p`/Agent SDK calls can. Avoid flattening those cases.
- Current Enterprise single seat buys no included usage. Official Code cost docs still generically describe Teams/Enterprise per-seat allowance in places; use Enterprise billing help's explicit current-vs-legacy distinction to resolve this. Legacy Standard/Premium or Chat/Chat+Code are not new-contract options.
- Current Team Code setup contains stale step wording “your premium seat subscription” despite its own explicit statement Code is included in **every** Team seat. Repeated current Team definition and seat table resolve it in favor of Standard entitlement.
- Team definition mentions “200k context window” under inherited features, while main pricing says up to 1M varying by model. This research does not rely on the generic Team 200k statement to price current models; current API pricing explicitly says 1M standard rates for supported 4.6+ models (except Haiku length pricing).
- Prices lack a full changelog/effective date on many help pages, which often say “Updated this week.” Findings are **observed current public terms on 2026-11-04**, not a claim these exact seat prices began on a particular date.
- Launch/credit effective dates above are before the cut-off. Nothing announced for after 2026-11-04 was treated as already effective.
- Enterprise contracts, discounts, VAT, EUR conversion, payment region and dedicated cloud contracts can change actual procurement price; no EUR conversion or VAT assumption was invented.
