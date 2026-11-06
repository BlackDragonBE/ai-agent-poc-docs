# GitHub Copilot organization cost research

Research as of 2026-11-04. English evidence notes. All sources below were fetched/read directly, not merely search snippets. Public list prices in USD; contract, region, tax and negotiated terms may differ. No checks or tests run; research only.

## Executive conclusions

1. **For an ordinary self-service GitHub Free/Team organization, Copilot Business remains the cheapest centrally administered plan: $19 per assigned user per month, billed monthly, with 1,900 AI credits ($19 metered value) per user pooled at the billing entity. A GitHub Enterprise subscription is NOT required.** Copilot Enterprise costs $39/user/month and requires GitHub Enterprise Cloud; 3,900 pooled credits per user.
2. **Important October 28 change:** eligible sales/account-team-managed enterprises can voluntarily use the new **Copilot access** billing model: $0 incremental Copilot seat charge for users already licensed for GitHub Enterprise Cloud, or **Copilot Standalone $10/user/month** without a GHE Cloud user license. Both have **zero included AI credits**, metered from first use. As of this research date, self-service customers, Free/Team organizations and self-service Enterprise trials are NOT eligible. Thus don't call $19 the universally cheapest organization seat, and don't call the new $0 seat a free all-in Copilot subscription. Existing enterprises do not automatically migrate; sales-confirmed transition dates are first-of-month. An enterprise cannot mix Business/Enterprise seats with this new model.
3. Since **June 1, 2026**, ordinary organizational usage is token-priced **AI credits**, not 300/1,000 premium requests or a fixed token budget. **1 credit = $0.01**; input/output/cache token prices vary by model. Inline completions and next-edit suggestions remain unlimited on paid plans and do not consume credits.
4. Editor Chat/agent, CLI and cloud agent share the credit-billed usage framework. Cloud execution additionally costs infrastructure; not all cloud sessions now run on Actions. Current default is cloud sandboxes; Actions remains an alternative. Code review still consumes Actions compute plus credits.
5. omp supports Copilot OAuth technically, but **no fetched GitHub source explicitly authorizes or supports omp's specific direct-proxy/shared-client-ID implementation**. GitHub does document third-party OAuth through its official Copilot SDK. Do not equate these facts. Expect authenticated omp use to debit upstream Copilot entitlements [INFERENCE]; no demonstrated free/unlimited billing exemption or provider guarantee. GitHub's upstream billing records, not omp's local legacy request counter, are authoritative.
6. No evidence establishes a fixed Copilot:omp total-token ratio. omp's advertised 61% fewer **output** tokens is a narrow Grok 4 Fast edit-format benchmark, not a Copilot comparison.

## Primary source register and excerpts

### A. Standard organizational seats and requirement

https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles

Fetched excerpts:
- “Copilot Business at $19 USD per user per month, includes 1,900 AI credits per user”
- “Copilot Enterprise at $39 USD per user per month, includes 3,900 AI credits per user (GitHub Enterprise Cloud only)”
- “Copilot access ... $0 incremental charge through GitHub Enterprise Cloud ... or $10 USD per user per month as Copilot Standalone ... no included usage allowance.”
- “Data-resident and FedRAMP-compliant Copilot requests include a 10% model multiplier increase.”
- “A Copilot seat is a license for one user.” Same enterprise user assigned via multiple organizations billed once. Seats can be added/removed; additions prorated, removals billed through cycle end. Suspended/removed users lose access immediately but seat remains billed through end.
- Credit card/PayPal payment: assigned licenses charged at calendar-month start, prorated new seats upfront, outside-allowance usage in next cycle / additional payments when needed to continue.

https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-organization

Explicit prerequisite excerpt: “Owners of organizations on GitHub Free or GitHub Team can purchase Copilot Business for their organization.” Therefore Enterprise and Team are not compulsory add-on purchases for this route. Organization owner grants selected/all members seats and policies; normal account/network requirements apply. Custom certificate and firewall guidance is present.

https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses

Explicit excerpt: Organizations: “Copilot Business: $19 USD per user per month (billed monthly).” Personal plans are tied to one account and cannot include additional seats. Individual Free is “intended for individual use only (not suitable for organizations or enterprises).” Personal subscription automatically cancels with prorated refund when organizational seat assigned.

Minimum seats: these current pricing/setup/license docs do NOT publish a numeric organizational minimum. Do NOT assert a verified universal one-seat minimum or universal ten-seat minimum. A historical third-party/community discussion at https://github.com/orgs/community/discussions/199346 (fetched) contains June–August 2026 customer reports that sales required ten licenses, alongside a counterexample below ten and no official resolution. This is NOT a vendor policy source; it occurred during paused self-service signups. Current public self-service purchase docs omit a minimum, and September reopening supersedes the global pause. For sales-only Copilot Standalone, account-specific minimum commitments remain unknown; obtain actual quote/checkout terms before asserting team total.

### B. New Copilot access eligibility, effective date and limitations

https://docs.github.com/en/copilot/get-started/whats-changing-with-github-enterprise-and-copilot

Fetched excerpts:
- “If you already use Copilot Business or Copilot Enterprise, you can retain your current plan. Transitioning is voluntary.”
- “If you work with a GitHub or Microsoft account team: Available starting October 28, 2026.”
- “If you manage your own subscription: Currently unavailable. We are opening this to self-serve customers in stages and will share dates in the coming weeks.”
- Unavailable to “Organizations on GitHub Free or GitHub Team” and “Self-service GitHub Enterprise Cloud trials.”
- “Copilot access provides the same feature and model eligibility as Copilot Enterprise” subject to policy/spend controls.
- “You cannot combine Copilot access with Copilot Business or Copilot Enterprise seats in the same enterprise, including in individual organizations.”
- “Transitions take effect on the first day of a month. Confirm the effective date with your account team.”

The $10 Standalone charge covers identity/access/policy/security/admin, not inference. A GHE Cloud license's cost is a separate underlying prerequisite for the $0 incremental access option, not included by that $0 figure. No public general annual discounted rate was established for Standalone.

### C. Credits, pooling, overage and surfaces

https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing

Fetched excerpts:
- “Each token is priced based on the model used, and the total is converted into AI credits, where 1 AI credit = $0.01 USD.”
- Credit consuming: Copilot Chat, CLI, cloud agent, Spaces, Spark, third-party coding agents. Inline completion and next-edit not credit billed, including at $0 user budget or hard stop.
- “Copilot Business and Copilot Enterprise include credits that are pooled across the organization or enterprise.” 100 Business seats = 190,000 shared credits, not 100 separate buckets.
- “AI credits paid usage policy is enabled by default” for Business/Enterprise/access. To prohibit overages an admin must disable it; merely assuming a fixed seat price caps use is wrong.
- Pooled credits first; afterward paid usage at published token/credit rates or usage blocked if not allowed. Additional paid usage may be capped until accrued usage is paid.
- Included credits reset at 00:00 UTC first of calendar month; no rollover. Added licenses increase pool immediately; removed seats don't shrink it mid-cycle (change next cycle). Seat-linked credits may be prorated with midmonth paid seats.
- User budget limits TOTAL usage including pool, hard stop; spending limits act after included pool (from first use for access). Budgets set in dollars, usage shown credits. $10 = 1,000 credits.
- GitHub App installation token: organization that owns installation pays; organization policies apply, no per-app budget, and the CLI-specific allow-billing policy isn't required for this distinct path.

https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/copilot-cli-in-github-actions

PAT authentication uses creator's seat entitlement. Organization-repo GITHUB_TOKEN use meters organization directly and needs **Allow use of Copilot CLI billed to the organization** policy. No individual user attribution means user-level budgets not considered. Working organization doesn't need seat licensing enabled if enterprise licenses users through a dedicated org; policy still needed. Actions compute is a separate charge/allowance.

### D. Token rates, no current request multipliers

https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing

All following prices USD / 1 million tokens as observed. Order: input / cached input / cache write / output.

| Model | Default token rates | Long context |
|---|---|---|
| GPT-5.3-Codex | 1.75 / .175 / n/a / 14 | no tier shown |
| GPT-6.1 Sol | 2 / .10 / 2.50 / 10 | >272K input: 4 / .20 / 5 / 15 |
| GPT-6.1 Terra | 1 / .05 / 1.25 / 5 | >272K: 2 / .10 / 2.50 / 7.50 |
| GPT-6 Sol | 2 / .20 / 2.50 / 10 | >272K: 4 / .40 / 5 / 15 |
| Claude Sonnet 4.6 | 3 / .30 / 3.75 / 15 | no tier shown |
| Claude Sonnet 5.5 | 2 / .10 / 2.50 / 10 | no tier shown |
| Claude Opus 5.5 | 4 / .20 / 5 / 20 | no tier shown |
| Claude Fable 5.1 | 10 / .25 / 12.50 / 50 | no tier shown |
| Claude Haiku 4.5 | 1 / .10 / 1.25 / 5 | no tier shown |
| Gemini 3.8 Flash | .75 / .075 / n/a / 3.75 | promotion through Dec 31, 2026 |
| Gemini 4 Argon | 2 / .10 / n/a / 10 | promotion until Dec 1, 2026 |
| Grok 4.7 | 2 / .50 / n/a / 6 | >200K: 4 / 1 / n/a / 12 |

This is an illustrative selected-model table, not exhaustive catalog; source has full current matrix. Current rates and thresholds must be checked when estimating a specific workload. Actual credits = dollar-valued model token charges / .01, with applicable surface discounts/surcharges. No fixed number of tasks or tokens follows from 1,900 credits, because input, output, cache reads/writes and chosen models differ.

Code review model is automatically selected and undisclosed. Published planning estimates (EXCLUDING Actions): Lite $0.05–$1 typical, average $.25; Balanced $.25–$5 typical, avg $1.50; Max $1.50–$25 typical, avg $10. Actual can exceed ranges. Balanced became default for Default configuration September 28 per source G below; explicitly configured Lite stays Lite.

https://docs.github.com/en/copilot/reference/copilot-billing/request-based-billing-legacy/model-multipliers-for-annual-plans

Explicit: “Model multipliers are a concept specific to the legacy premium request-based billing system, and do not apply to GitHub's new usage-based billing model.” Legacy annual-only table includes Haiku4.5 .33x, Opus4.8 27x, Sonnet4.6 9x, GPT5.3Codex 6x, MAI1.1Flash .25x; code review 13x. These must NOT be applied to current Business credit pricing.

https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/

Fusion GA October 28. Bills **each model it uses at standard rates**; paid-plan users temporarily receive 30% model-cost discount. https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing explicitly dates that discount through November 30, 2026, and documents 10% auto-selection discount in Chat/cloud agent. Do not automatically stack discounts or assume omp direct model routing qualifies for Fusion discounts. Fusion article cites about half tokens vs Claude Code Opus5.5 Max in Artificial Analysis Coding Agent Index, but it is a specific vendor-reported benchmark, not an omp comparison or universal multiplier.

### E. Cloud infrastructure and Actions are separate from AI credits

https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes

Current cloud session default is **Cloud** sandbox, with **Actions** alternative for setup steps/larger or self-hosted runners/Windows. CLI runs locally by default; `copilot --cloud` chooses sandbox. Local sessions do not create sandbox charges. Cloud sandbox authentication uses existing Copilot account; policy is Copilot in the cloud.

https://docs.github.com/en/billing/concepts/product-billing/cloud-and-local-sandboxes

Fetched rates:
- Compute $0.000024 per running compute-second.
- Allocated memory $0.000003 per GiB-second while running.
- Snapshot storage for stopped sessions $0.005 per GiB-month, until deleted.
- Local sandboxing included with no additional cost.
- Example 600 sec, 4 GiB = $.0144 compute + $.0072 memory = $.0216.
- Repository owner pays; for no-repository sessions selected personal/org owner pays, personal first choice.
- Cloud compute and memory draw from the GitHub plan's included compute value, shared with eligible Actions use. Storage isn't listed as drawing from that included compute.
- Cloud sandbox budgets **not** part of Bundled AI credits; separate product/SKU budget required.

**Documentation unit discrepancy:** sandbox concepts page labels compute unit **vCPU second**, but dedicated billing page labels **Compute second** and describes elapsed running time without vCPU multiplier. Both give $.000024. Preserve discrepancy; dedicated billing reference and example establish stated observed time/memory example, but precise multi-vCPU accounting requires vendor clarification.

https://docs.github.com/en/billing/concepts/product-billing/github-actions

Code review Actions compute plus credits; standard public repo runner use free, private/internal draws shared included compute then standard rates. Review default Ubuntu; larger/self-hosted configurable.

Observed baseline per-minute rates: Linux slim 1core $.002; Linux x64 2core $.006; Linux ARM2 $.005; Windows2 $.010; macOS3/4 $.062. GitHub-billed self-hosted runners free (your own infrastructure still costs); standard public runners free; larger public runners billed.

https://docs.github.com/en/billing/reference/product-usage-included

Included monthly compute value: GitHub Free org **$12**, GitHub Team **$18**, Enterprise Cloud **$300** (shared account/org allowances, NOT per Copilot seat; also shared with Actions and sandbox compute/memory). Current docs express value rather than old 2,000/3,000/50,000 minute counts. $12 covers 2,000 baseline Linux minutes only if no other eligible usage draws on it. Do not present as additional AI model credits.

### F. Personal subscriptions (not organization seats)

https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing
https://github.com/features/copilot/plans

| Personal plan | Subscription / month | Base credits | Variable flex | Total observed monthly credit value |
|---|---:|---:|---:|---:|
| Free | $0 | unspecified numeric allowance | n/a | limited chat/agent; 2,000 completions |
| Pro | $10 | 1,000 ($10) | 500 ($5) | 1,500 ($15) |
| Pro+ | $39 | 3,900 ($39) | 3,100 ($31) | 7,000 ($70) |
| Max | $100 | 10,000 ($100) | 10,000 ($100) | 20,000 ($200) |

Base never changes according to docs; flex explicitly variable. Paid personal plans unlimited completion/next-edit. Free and Student auto model only; Free credit amount not numerically published in fetched current table. Personal use isn't pooled/org-managed. Paid overage at same model prices with budget; caps/payment may restrict. Org seat assignment automatically cancels personal plan with prorated remaining refund.

Annual: Current organization product docs explicitly monthly, no discounted self-service annual offer established. Do not label 12*$19=$228 as an annual-plan price; it is merely arithmetic annual run rate. Existing **personal** annual Pro/Pro+ subscriptions may remain legacy request based until expiry; then transition to Free, with option to choose current monthly paid plan. Their legacy annual prices/allowances are not a current new-organization offer.

### G. Effective-date chronology and stale-source hazards

https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/ (published April 27, 2026)
https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/ (June 1, 2026)

April announcement and June release confirm new usage-based credit billing active June 1. Base Business19/Enterprise39 unchanged. Initial extra Business $30/Enterprise $70 usage promotion was **June, July and August ONLY** for existing customers, not current November 1900/3900 allowance. Annual personal legacy exception makes headline “all plans” non-literal.

https://github.blog/changelog/2026-09-03-reopening-copilot-business-and-enterprise-signups/ (Sept 3)
https://github.blog/changelog/2026-08-28-upcoming-changes-to-github-copilot-policies-and-billing/ (Aug 28)

September gradual reopening over subsequent weeks supersedes April pause on new Business self-service. Current setup docs now offer purchase. Updated vetting; credit-card/PayPal seats need upfront payment; existing customers switched October 1; midmonth seats/credits prorated; may require overage payment before continuation. Older broad “billed at cycle end” language in billing-cycle page coexists with more specific new upfront schedule; use current seat-pricing page + dated September release for cashflow, not old one-line summary.

August source: code review Default becomes Balanced **September 28**, explicit Lite preserved. Unified cloud/mobile/chat experience planned “no earlier than September 28”; use fetched current sandbox docs for actual now-supported execution, not infer an exact launch day from that earliest-date announcement.

### H. BYOK: separate local versus centrally configured paths

https://docs.github.com/en/copilot/concepts/models/bring-your-own-key

Current explicit local/user BYOK: client sends directly to provider using user credentials, **“BYOK allows you to use models without a Copilot subscription.”** Supported clients VS Code, JetBrains, Xcode, CLI, Copilot app, SDK. Compatible local/cloud model endpoint required; local endpoint for air-gap use. Business/Enterprise IDE user-BYOK can be disabled by admin policy. This is not included model usage; provider billing / local hardware cost separate.

Centrally configured BYOK/custom models: public preview. Enterprise owner configures keys or delegates organization permission using Enable custom models. Users on enterprise's Business/Enterprise plan need Copilot license AND internet; models route via Copilot API. Not evidence that bare Free/Team org gets centrally configured BYOK with no enterprise context; source says enterprise/organization eligible users, setup entry is enterprise settings.

https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/enable-custom-models

Supports keys for Anthropic, AWS Bedrock, Google AI Studio, Microsoft Foundry, OpenAI, OpenAI-compatible and xAI. Provider dashboard billing and negotiated provider rates/credits used. Do not conflate corporate Anthropic/OpenAI subscription OAuth with supplying a paid provider API key.

https://github.blog/changelog/2026-11-03-byok-and-enterprise-custom-models-in-the-copilot-usage-api/ (Nov 3; modified Nov 4)

Vendor says metrics now separate Copilot-hosted from BYOK “usage billed by your own provider or run on free local models.” Enterprise-custom usage server-observed; local BYOK telemetry undercounts when disabled/provider lacks token reporting. No backfill for older reports. This is visibility change, not new November BYOK price. No GitHub surcharge/credit consumption amount for BYOK was stated in fetched pages; don't invent one. License prerequisites remain for centralized path.

### I. omp authentication, billing and authorization caveat

Pinned repository commit already used in comparison: 0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0.

https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/README.md

Coding plans: “Subscription-routed. /login attaches the session.” Lists GitHub Copilot oauth. Technical integration claim only.

https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/providers.md

Provider namespace github-copilot, credential env COPILOT_GITHUB_TOKEN. `/login <provider>` or `omp login [provider]`; login provider-scoped. This backs `omp login github-copilot` technical usage.

https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/provider-quirks.md (sections near lines 918–967)

Specific integration evidence:
- Direct multi-vendor proxy `https://api.githubcopilot.com` or enterprise endpoint, dispatches Chat Completions/Responses/Anthropic Messages.
- Uses headers claiming `User-Agent: copilot/1.0.82`, `Copilot-Integration-Id: copilot-developer-cli`, `Copilot-Harness-Id: copilot-sdk`, API version2026-08-01.
- Device Flow described as **opencode OAuth app**, client ID Ov23li8tweQw6odWQebz, scope read:user.
- Discovery uses `/copilot_internal/user`; model enablement policy requests.
- Usage counters in this document still describe premium_requests, quota_snapshots/premium_interactions and zero counted premium requests on agent turns. These local counters do **not** override the vendor's June1 credit-based organization billing. No evidence of zero cost for agent followup tokens.

GitHub primary official integration/auth source:
https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate

Explicit support for third-party apps using official SDK: “Use an OAuth GitHub App to authenticate users through your application and pass their credentials to the SDK. This enables your application to make Copilot API requests on behalf of users who authorize your app.” Requires user subscription for user/OAuth authentication; BYOK not. Server-to-server org policy path also documented.

**Conclusion precisely:** GitHub supports a public third-party SDK/OAuth mechanism in general. We found no GitHub document naming omp or confirming its direct proxy, reused OAuth app identity, header impersonation, or private endpoint usage is approved/supported. Don't claim explicit permission OR a proven prohibition absent terms evidence; mark vendor authorization/support for omp path **unconfirmed**. For production org use prefer documented official path or get vendor confirmation for this specific client. [INFERENCE] successful authenticated calls reach account's Copilot billing/policies and can consume credits/overage like other calls, not a separate omp token subscription; exact classification/discount eligibility unconfirmed. No live billing probe performed.

### J. Token efficiency evidence boundaries

Pinned omp README source above advertises Grok4Fast “−61% tokens” and elsewhere explicitly “61% fewer output tokens” from hashline versus other edit representations. Linked first-party benchmark: https://blog.can.ac/2026/02/12/the-harness-problem/ (link identified; not independently fetched in this slice). This cannot establish Copilot vs omp total tokens or money saved. GitHub Fusion source D above offers a separate Copilot-versus-Claude-Code index result, likewise not omp and not a fixed generalized ratio. No controlled same-model/task/cache/quality Copilot-omp benchmark was obtained.

A defensible future comparison must measure equal tasks/model/reasoning/quality success, full agent calls (including failed/retried), input/output/cache writes/reads, subagents, compression, and separate compute. No proposed fixed ratio in these findings.

### K. Tax/currency

https://docs.github.com/en/site-policy/github-terms/github-terms-of-service (fetched/target searched)

Terms: “You are responsible for all fees, including taxes, associated with your use of the Service.” Invoiced users pay USD up front per terms. Listed Copilot/docs prices above explicitly USD. Do not silently convert to EUR or present tax-inclusive Netherlands amounts: applicable VAT, invoice jurisdiction, FX/card charges and negotiated enterprise agreement require account invoice/contract. No public localized EUR price established in this research.

## Remaining unresolved points to preserve in final report

- Public universal minimum-seat number not documented in fetched official pages. Historical sales customers reported ten, but not authoritative/current universal requirement.
- omp direct implementation authorization and exact billing classification not publicly confirmed; official SDK support cannot be stretched into blanket approval of all proxy clients.
- Multi-vCPU sandbox meter wording differs between concept/billing docs.
- Seat cycle-end summary vs specific updated credit-card/PayPal upfront billing; rely on dated release and current detailed seat page.
- Numeric Free credit allowance not disclosed; flex allotments/promo model prices variable.
- Enterprise-access migrations, Standalone minimum commitments and negotiated annual contracts depend on quote/account team; current self-service pricing not sufficient to infer them.

## Addendum: exact October 28 enterprise launch source

https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/ — release October 28, 2026; fetched directly.

Exact observed excerpts:
- “Enterprises working with a GitHub or Microsoft account team can now get Copilot included with GitHub Enterprise for every licensed user.”
- “Users in your enterprise account who do not hold a GitHub Enterprise license get the same Copilot access through Copilot Standalone, at $10 per user per month.”
- “Copilot access through GitHub Enterprise and Copilot Standalone has the same features and models as Copilot Enterprise but does not include monthly AI credits per seat.”
- Availability: “Available now for GitHub Enterprise Cloud” if working with GitHub/Microsoft account team; self-managed subscription “Currently unavailable.”
- “AI usage is metered from the first request against your enterprise budget”; completion and next-edit keep working without budget, Chat/review/cloud require available budget.

Eligibility restriction supplement is the directly fetched https://docs.github.com/en/copilot/get-started/whats-changing-with-github-enterprise-and-copilot (section B): excludes Free/Team organizations and self-service GHE Cloud trials, specifies voluntary whole-enterprise transition, first-of-month effective date agreed with sales, and inability to mix old Business/Enterprise seats with new access model.

Thus distinguish three cost structures: ordinary self-service Business $19 with $19 pooled usage; sales-managed Standalone $10 plus all usage; existing eligible GHE Cloud user $0 incremental Copilot seat plus all usage (underlying GHE Cloud license is not free). A paid GitHub Enterprise **user license** is not required for each Standalone user, but an eligible sales-managed **enterprise account/model** is the documented context.

## Addendum: platform combinations, annual billing and administration

Research date: November 4, 2026. Findings below distinguish the GitHub platform subscription from the Copilot subscription. All prices are public USD list prices, excluding tax, usage overages, infrastructure and negotiated terms.

### Platform scope and price evidence

Primary sources fetched:

- https://github.com/pricing — Free $0, Team $4 per user/month, Enterprise $21 per user/month. The Team purchase link explicitly selects `plan_duration=month`. No separately labelled annual price or annual discount was found on the current public page.
- https://docs.github.com/en/get-started/learning-about-github/githubs-plans — Free organizations support unlimited collaborators and unlimited public/private repositories, with limited private-repository features and team access controls. Team adds private-repository review/protection/workflow capabilities. Enterprise Cloud adds enterprise-wide administration, SAML SSO, SCIM, the Enterprise Managed Users option and audit-log streaming.
- https://docs.github.com/en/get-started/learning-about-github/faq-about-changes-to-githubs-plans — corroborates Free private-repository limitations and the historical availability of annual Team billing. This FAQ concerns changes announced April 14, 2020: it is not evidence for a discounted new annual price in November 2026.
- https://docs.github.com/en/billing/reference/github-license-users — platform license counts include organization members, owners and certain private-repository outside collaborators; they are not limited to users assigned Copilot.
- https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses — Copilot Free is for individual use, not an organization-managed substitute. Organization Copilot Business is explicitly $19/user/month, billed monthly.

Free organizations are centrally administered organizations, not merely collections of personal subscriptions. Copilot Business can be purchased on Free or Team; Enterprise Cloud is not mandatory. Conversely, Copilot Enterprise requires Enterprise Cloud. A platform subscription does not itself increase Copilot Business's model allowance.

### Valid combinations and arithmetic

Assuming each person also needs the stated paid platform license:

| Combination | Fixed USD/person/month | Included metered AI usage/person/month |
| --- | ---: | --- |
| Free + Business | 0 + 19 = 19 | $19 pooled |
| Team + Business | 4 + 19 = 23 | $19 pooled |
| Enterprise Cloud + Business | 21 + 19 = 40 | $19 pooled |
| Enterprise Cloud + Copilot Enterprise | 21 + 39 = 60 | $39 pooled |
| Enterprise Cloud + eligible Copilot access | 21 + 0 = 21 | None; all metered usage extra |
| Eligible Copilot Standalone | 10 | None; all metered usage extra |

Free/Team + Copilot Enterprise is not available. Access/Standalone eligibility and whole-enterprise migration restrictions remain as documented in the preceding addendum. Standalone does not require a paid Enterprise Cloud user license and does not confer paid Enterprise Cloud repository rights. The access FAQ explicitly says its $10 charge covers identity, access, policy, security and administration. Do not mechanically add a $21 platform seat to every Standalone user.

Twelve-month fixed-price budgeting, not an annual purchase offer: $228 / $276 / $480 / $720 / $252 / $120 respectively, assuming unchanged full-month seats. The final two amounts exclude all metered AI usage.

For G billable platform users and C Copilot seats: Team + Business = 4G + 19C; Enterprise Cloud + Business = 21G + 19C; Enterprise Cloud + Copilot Enterprise = 21G + 39C. Ten Team users and five Business seats cost $135/month. Existing platform spend should not be counted twice when discussing incremental Copilot costs.

### Annual billing: what the current sources actually establish

- https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses and https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles — Business/Enterprise seats use monthly billing cycles. No separate public annual organizational Copilot discount established.
- https://docs.github.com/en/billing/how-tos/manage-plan-and-licenses/change-billing-cycle — exact eligibility: “a volume-based plan that supports both monthly and annual billing.” This is not a universal promise of annual billing for every product/account.
- https://docs.github.com/en/billing/concepts/billing-cycles — distinguishes monthly metered licenses from traditional volume-based plans.
- https://docs.github.com/en/billing/concepts/enterprise-billing/usage-based-licenses — new Enterprise Cloud trials created on or after August 1, 2024 use usage-based monthly licensing. Existing prepaid/volume contracts may continue on their contractual terms.
- https://github.com/pricing/calculator — also fetched; no separately established annual platform discount in its public reader output.

The public organization-plan purchase route redirected to login. No authenticated checkout, purchase or account change was performed. Therefore retain the public $4/$21 monthly basis and qualify annual options by account/contract. Do not import historical $44/year Team pricing or a $24-monthly/$21-annual Enterprise distinction without current evidence. Sales-managed annual discounts, commitments and eligibility require the actual quote.

### Business versus Enterprise: avoid invented feature gates

https://docs.github.com/en/copilot/get-started/plans — current organization comparison includes chat, inline suggestions, IDE agent, CLI, cloud agent, code review, custom instructions, MCP, policy management, content exclusion and audit logs for both Business and Enterprise. Enterprise contributes more included credits and priority access to new models/features. Do not claim agents, MCP or basic central administration are Enterprise-only. Preview, interface and model availability can still differ; content exclusion must not be described as universal protection across all agent surfaces.

### Administration and identity boundaries

Primary sources fetched:

- https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access — organization owners use Settings > Copilot > Access; all members or selected people/teams; CSV and REST API assignment are documented. Assigned seats cost money even if unused.
- https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies — Policies/Models settings; enforced enterprise policies cannot be overridden by organizations.
- https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access — enterprise Billing & licensing > Licensing > Copilot > Access. Business/access supports direct individual/enterprise-team assignment. Business/Enterprise can be enabled for organizations and assigned there; do not assert that the direct Business team-assignment route also applies to Copilot Enterprise. EMU enterprise teams can sync to IdP groups.
- https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets — organization owners have organization budgets. Enterprise admins additionally have user/cost-center/enterprise budget scopes. User budgets include included credits and always enforce a stop. Organization/cost-center/enterprise spend limits require “Stop usage when budget limit is reached,” which is off by default. Budget limits do not stop seat charges. Paid extra usage is enabled by default.
- https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users — IdP-managed account creation, authentication and lifecycle; optional architecture, not automatically enabled by buying Enterprise Cloud. Managed accounts face restrictions on outside-enterprise collaboration. SAML SSO with personal accounts is a different identity model and does not transfer ownership of those accounts to the employer.
- https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization — organization owners can require 2FA. This is not SAML SSO, SCIM provisioning or company ownership of personal accounts.

Practical procurement distinction: Free + Business offers central Copilot seat/policy/budget control at $19; Team adds repository collaboration controls, not enterprise identity; Enterprise Cloud + Business adds the enterprise identity/governance layer at $40 if the platform license is also newly needed. Copilot Enterprise is not a prerequisite for those identity controls. New access/Standalone is enterprise-administered but currently sales-managed and bills all metered AI usage separately.

### Explicit CLI and VS Code completion entitlement

The six valid combinations in the cost table all provide Copilot CLI and VS Code inline completions, subject to assigned seats, correct authentication, client setup and administrator policy. Access/Standalone still require eligibility for the enterprise rollout.

Primary sources fetched for this clarification:

- https://docs.github.com/en/copilot/get-started/plans — explicit statement: “All plans include Copilot CLI and the Copilot app.”
- https://docs.github.com/en/copilot/get-started/whats-changing-with-github-enterprise-and-copilot — access/Standalone has the same feature and model eligibility as Copilot Enterprise, subject to policy and spending controls.
- https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing — Copilot CLI, Chat and agents consume AI credits. Business/Enterprise draw from included pooled credits first; access/Standalone bills metered usage from first use. Inline completions and next edit suggestions are unlimited, consume no AI credits, and remain available at a $0 user budget or after an enforced spending limit.
- https://code.visualstudio.com/docs/editing/ai-powered-suggestions — VS Code supports ghost-text inline completions and next edit suggestions; prerequisites include Copilot access and client setup. These are distinct from Chat and agent sessions.
- https://docs.github.com/en/copilot/get-started/cli-quickstart — current standalone `copilot` CLI installation and `/login` instructions, not the legacy `gh copilot` extension.

“CLI included” means no separate CLI subscription, not unlimited free agent usage. Free + Business is sufficient for both CLI and VS Code completion; neither Team nor Enterprise is required just to unlock these clients. A Free platform account without the Business seat is a different offering.

### Feature-first selector: confirmed capability boundaries

The interactive comparison now starts with required capabilities and uses a logical AND: every checked requirement must be confirmed for a combination to remain visible. Shared Copilot administration, CLI access and VS Code completions are explained once rather than offered as non-distinguishing filters.

Primary sources rechecked for the capability matrix:

- https://docs.github.com/en/get-started/learning-about-github/githubs-plans — Free organizations include private repositories with limited features. Team adds required reviews, protected branches and CODEOWNERS for private repositories. Enterprise Cloud adds enterprise identity and cross-organization governance. These are platform entitlements, not Copilot Business versus Enterprise differences.
- https://docs.github.com/en/copilot/get-started/plans — Enterprise and access have priority access to premium models. Do not incorrectly reserve this flag for the $39 Copilot Enterprise subscription.
- https://docs.github.com/en/copilot/get-started/whats-changing-with-github-enterprise-and-copilot — both access variants retain Copilot Enterprise feature and model eligibility, subject to policy and spending controls. Neither includes an AI allowance. Standalone's $10 charge covers identity, policy, security and administration in the enterprise context, not paid GitHub repository entitlements. Sales-managed rollout eligibility remains a prerequisite.

The sources reviewed do not explicitly establish SAML/SCIM entitlement for Standalone. A targeted documentation search did not resolve that protocol-specific question. The matrix therefore stores this capability as unknown, not false. Unknown does not satisfy a required SSO filter; procurement must confirm it with the account team. Lack of repository entitlement in the Standalone bundle does not mean the CLI cannot edit private code.

The calculator intentionally uses one user count for a full-price comparison: each counted person gets Copilot and any platform license in that combination. This UI simplification does not alter GitHub's real billing populations. Organizations with additional platform-only users or existing platform licenses must use the documented separate-population formulas and avoid buying or counting an existing license twice. All combinations are compared at the same assumed AI spend, with included credits deducted before overage; the assumption is not a token-use forecast. Restricted access/Standalone routes are hidden until explicitly requested.
