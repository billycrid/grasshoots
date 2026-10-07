# Grasshoots
## Product & Technical Specification — v0.4

**Working tagline:**  
**Making noise for grassroots sport**

---

# 1. Product and Brand

## 1.1 Parent Product

The sport-agnostic platform is called:

# Grasshoots

Grasshoots is a media-management platform for grassroots sports organisations.

It should act as a **virtual media manager for grassroots clubs**, using structured sporting data, club information and AI-assisted content generation to help clubs maintain a professional and consistent online presence without requiring a dedicated volunteer to manually create every post.

The name intentionally supports the idea of clubs **making more noise** about what is happening within their organisation, with the "hoot" element allowing an owl-inspired brand direction.

The current working tagline is:

> **Making noise for grassroots sport**

This tagline is not necessarily final but should be used as the working product caption throughout early design and demo work.

---

# 2. Official Brand and Contact Channels

The initial registered Grasshoots brand/contact channels are:

```text
Primary domain:
grasshoots.co.uk

Current support email:
grasshootssupport@gmail.com

Instagram:
@grasshootsuk

X / Twitter:
@grasshoots
```

These should be treated as the current official Grasshoots channels during early development.

## 2.1 Future Domain Email

The Gmail address should be considered temporary.

Longer term, public-facing Grasshoots email should use the Grasshoots domain.

Expected examples include:

```text
support@grasshoots.co.uk
hello@grasshoots.co.uk
```

Potential future addresses may also include:

```text
billing@grasshoots.co.uk
privacy@grasshoots.co.uk
```

The exact mailbox structure can be decided later.

The application must therefore **not hard-code `grasshootssupport@gmail.com` throughout the product**.

It should be possible to change the public support/contact address centrally without changing application code.

---

# 3. Brand Configuration

Grasshoots brand/contact information should be represented as configurable platform settings.

Examples include:

```text
brand.name
brand.tagline
brand.primaryDomain

contact.supportEmail
contact.generalEmail

social.instagramHandle
social.xHandle

urls.marketingSite
urls.application
```

Equivalent strongly typed configuration may be used.

These values should have appropriate environment/configuration defaults rather than appearing as string literals throughout:

- frontend components;
- email templates;
- transactional messages;
- footer content;
- support links;
- metadata;
- demo pages.

For example, changing:

```text
grasshootssupport@gmail.com
```

to:

```text
support@grasshoots.co.uk
```

should require a configuration change rather than searching the codebase for references.

Do not over-engineer this into a customer-editable configuration system during MVP.

These are **Grasshoots platform-level settings**, not individual club settings.

---

# 4. Brand Architecture

Grasshoots is one platform supporting multiple sports.

Individual sports must remain underneath the Grasshoots brand rather than becoming independent products.

Examples:

- **Grasshoots Cricket**
- **Grasshoots Rugby**
- **Grasshoots Football**
- **Grasshoots Hockey**
- **Grasshoots Netball**

The product should not be architected as:

```text
Cricket Product
Rugby Product
Football Product
```

Instead:

```text
                    Grasshoots
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Cricket        Rugby        Football
          │             │             │
       Adapter        Adapter        Adapter
          └─────────────┼─────────────┘
                        │
               Grasshoots Platform
```

The majority of functionality should therefore belong to the shared Grasshoots platform.

Sport-specific implementations should primarily handle:

- sporting terminology;
- external sporting data sources;
- statistical interpretation;
- sport-specific facts;
- sport-specific content/templates where appropriate.

---

# 5. Domains and Product Surfaces

Primary public domain:

```text
grasshoots.co.uk
```

Conceptual public sport pages:

```text
grasshoots.co.uk/cricket
grasshoots.co.uk/rugby
grasshoots.co.uk/football
```

Potential authenticated application:

```text
app.grasshoots.co.uk
```

The sport paths on the public website should communicate the value proposition for that particular sport while remaining visibly part of Grasshoots.

Example:

```text
Grasshoots Cricket
Making noise for grassroots sport

Automatically turn your fixtures, results,
performances and sponsors into content.
```

Avoid creating independent domains/products for each sport unless a future commercial reason strongly justifies doing so.

---

# 6. Product Vision

Grasshoots should:

1. Ingest sporting data.
2. Understand what happened.
3. Identify noteworthy facts.
4. Understand relevant club context.
5. Decide what is worth communicating.
6. Generate appropriate media content.
7. Present content for review.
8. Eventually distribute approved content automatically.

The initial implementation should target:

# Grasshoots Cricket

Play-Cricket should be the first officially supported external sports-data integration.

The underlying platform must remain sport-agnostic.

The architectural distinction is:

> **Data connectors determine where data comes from.**

> **Sports adapters determine what sporting data means.**

> **The facts engine determines what happened and what is noteworthy.**

> **Grasshoots determines what should be communicated and how.**

---

# 7. Core Product Proposition

A club should be able to:

1. Create a Grasshoots account.
2. Create or join a club.
3. Configure the club's brand.
4. Create a sporting season.
5. Configure teams.
6. Connect a supported sports-data source or import data.
7. Configure sponsors.
8. Choose content preferences/templates.
9. Tell Grasshoots which social platforms it uses.
10. Allow Grasshoots to ingest fixtures/results.
11. Receive ready-made content.
12. Review, edit, regenerate and download that content.
13. Eventually allow Grasshoots to publish approved content automatically.

The customer should not continually have to tell AI what happened.

Grasshoots should proactively determine:

- what happened;
- what is noteworthy;
- what upcoming fixtures matter;
- whether teams are on streaks;
- whether players crossed milestones;
- which performances stand out;
- which sponsors are relevant;
- which content should be created.

The desired experience is:

> **A media volunteer that already follows every team.**

---

# 8. Authentication

Support high-quality modern SSO.

Initial providers:

- Google
- Facebook

Use standard OAuth/OIDC abstractions wherever practical.

Do not build custom username/password authentication unless there is a later requirement.

Users may eventually:

- belong to multiple clubs;
- administer more than one club;
- manage billing for organisations;
- have different permissions in different clubs.

Authentication and club membership must therefore remain separate concepts.

---

# 9. Multi-Tenancy

Multi-tenancy is a first-class requirement.

Primary organisational boundary:

```text
Club / Organisation
```

Club-owned entities include:

- seasons;
- teams;
- players;
- fixtures;
- sponsors;
- integrations;
- content;
- templates;
- publications.

A user must never access another club's data unless explicitly authorised.

Initial roles should anticipate:

- Owner
- Administrator
- Content Editor
- Reviewer

Backend authorization must enforce these boundaries.

UI visibility alone must never be treated as authorization.

---

# 10. Club Onboarding

Onboarding should collect:

## Identity

- Club name
- Sport
- Club logo
- Primary colour
- Secondary colour
- Optional accent colour

## Season

- Current season
- Competition information where known

## Teams

Teams may be:

- discovered through an integration;
- imported;
- manually created.

## Content preferences

Examples:

- Professional
- Community-focused
- Enthusiastic
- Traditional
- Informal

Also capture:

- channels used;
- types of desired content;
- preferred templates;
- preferred posting cadence.

## Sponsors

Allow configuration of:

- club sponsors;
- team sponsors;
- player sponsors;
- campaign/event sponsors.

## Sports data

For Grasshoots Cricket initially:

- Play-Cricket Sync
- CSV Import
- Manual entry where appropriate

---

# 11. Data Ingestion Architecture

Data ingestion and sport interpretation must remain separate.

Conceptually:

```text
External Source
      ↓
Data Connector
      ↓
Source-specific representation
      ↓
Sport mapping / normalisation
      ↓
Canonical Grasshoots sports model
      ↓
Facts Engine
      ↓
Grasshoots Media Engine
```

The application must not depend directly on:

- Play-Cricket JSON;
- CSV column names;
- future rugby API formats;
- future football API formats.

---

# 12. Connector Types

Conceptual connector abstraction:

```ts
interface DataConnector {
  fetchOrImport(): Promise<SourceDataset>;
}
```

Potential connector types:

```text
ScheduledApiConnector
CsvUploadConnector
ManualEntryConnector
WebhookConnector
```

Not every sport needs every type.

---

# 13. Supported Integrations

Grasshoots can provide officially supported integrations where commercial demand justifies them.

For Grasshoots Cricket the initial integration is:

## Play-Cricket Sync

The customer supplies the required configuration such as:

- API token;
- Play-Cricket site/club identifier;
- relevant team mapping.

Grasshoots owns the translation.

The customer should not need to understand Play-Cricket API responses.

Conceptually:

```text
Play-Cricket
     ↓
PlayCricketConnector
     ↓
PlayCricketMapper
     ↓
Canonical Cricket Model
```

Synchronisation should support scheduled background operation.

---

# 14. Generic CSV Import

CSV provides a fallback when:

- no integration exists;
- a customer does not want an API connection;
- another platform can export data;
- a sport is being validated before a dedicated integration exists.

Grasshoots must publish a **defined CSV contract**.

Users should not upload arbitrary spreadsheets and expect AI to infer their structure.

Example fixture schema:

```text
external_id
season
competition
team
opponent
home_or_away
venue
match_date
start_time
```

The exact schemas should be:

- versioned;
- documented;
- downloadable;
- validated.

The principle is:

> **Grasshoots integrations translate source data for you.**

> **Generic imports require you to supply data in the Grasshoots format.**

---

# 15. CSV User Experience

The application should provide:

- Download template
- Download populated example
- Schema documentation
- Upload
- Validation
- Import preview
- Human-readable errors
- Created/updated/skipped totals
- Import history

Example:

```text
Row 12
match_date is required.

Row 19
home_or_away must be HOME or AWAY.

Row 24
Team "Thirds" could not be mapped.
```

Malformed sports data must not silently enter the canonical domain.

---

# 16. Canonical Sports Contract

Every data source should ultimately produce the canonical domain for that sport.

Example:

```text
Play-Cricket ──┐
               │
CSV ───────────┼──→ Canonical Cricket Model
               │
Manual ────────┘
```

The facts engine should not care where a fixture originated.

Core concepts should include:

```text
Club
Season
Sport
Competition
Team
Player
Fixture
Match
Performance
Standing
Milestone
Fact
```

---

# 17. Source Provenance

Canonical records should retain appropriate source information.

Example:

```text
sourceType: PLAY_CRICKET
sourceExternalId: ...
sourceImportedAt: ...
sourceConnectorId: ...
```

or:

```text
sourceType: CSV
sourceFileId: ...
sourceImportedAt: ...
```

This supports:

- debugging;
- duplicate detection;
- re-syncing;
- corrections;
- traceability.

---

# 18. Sports Adapter Architecture

Sport-specific knowledge belongs behind sport adapters.

Conceptually:

```ts
interface SportsAdapter {
  normalise(sourceData: SourceDataset): Promise<SportsDataset>;
  deriveSportSpecificFacts(dataset: SportsDataset): Promise<Fact[]>;
}
```

Implementations may eventually include:

```text
CricketAdapter
RugbyAdapter
FootballAdapter
```

Example:

```text
PlayCricketConnector ─┐
                     ├─→ CricketAdapter
CricketCsvConnector ──┘
```

The Grasshoots media engine should not require knowledge of Play-Cricket.

---

# 19. Facts Engine

Authoritative sporting facts must be determined deterministically wherever possible.

AI should not calculate these facts.

Example:

```text
Previous match = WIN
Current match = WIN

WINNING_STREAK = 2
```

Example:

```text
Season runs before match = 472
Runs this match = 41
New total = 513

PLAYER_MILESTONE = 500 runs
```

The facts engine should support concepts including:

- results;
- streaks;
- season totals;
- milestones;
- personal bests;
- standout performances;
- team records;
- standings;
- sponsor relationships.

Each useful fact should ideally have a stable ID.

Example:

```text
FACT_12872

type: PLAYER_MILESTONE
player: Billy Criddle
description: Passed 500 runs this season
value: 513
```

---

# 20. AI Context Strategy

The AI model must never simply receive access to the entire Grasshoots database.

Core principle:

> **Store broadly. Retrieve narrowly.**

For a match report, context might contain:

```text
Current match
Previous 3–5 results
Current season record
Relevant player performances
Relevant milestones
Relevant sponsors
Small amount of recent generated/published content
```

Historical information should only enter context when relevant.

For example:

A player crossing 3,000 career runs may justify historic aggregate retrieval.

A player sitting on 1,732 career runs does not.

---

# 21. AI Architecture

AI providers must remain replaceable.

Conceptually:

```ts
interface AIProvider {
  generate<TInput, TOutput>(
    request: AIRequest<TInput>
  ): Promise<TOutput>;
}
```

Possible providers:

```text
FakeAIProvider
AWSBedrockProvider
AzureAIFoundryProvider
OpenAIProvider
LocalProvider
```

Changing AI provider must not require changes to:

- sport logic;
- facts;
- persistence;
- frontend;
- media orchestration.

Example configuration:

```text
AI_PROVIDER=fake
AI_PROVIDER=bedrock
AI_PROVIDER=azure
```

Prefer structured model outputs.

---

# 22. AI Responsibility Boundary

AI may determine:

- language;
- tone;
- storytelling;
- headlines;
- channel-specific presentation.

AI must not independently determine authoritative facts such as:

- who won;
- player totals;
- streak length;
- milestones;
- standings;
- sponsor relationships.

Core rule:

> **Software determines what happened. AI determines how to talk about it.**

---

# 23. Grasshoots Media Engine

The media-management layer should remain independent from individual sports.

Primary concepts may include:

```text
ContentPlan
ContentItem
ContentTemplate
ContentCampaign
MediaAsset
Publication
SocialChannel
Sponsor
SponsorAssociation
```

Content types can include:

- Fixture preview
- Matchday
- Match result
- Match report
- Weekend roundup
- Player performance
- Milestone
- Team achievement
- Sponsor feature
- Recruitment post
- Club event
- General announcement

---

# 24. Content Inbox

The initial product does not require automatic social publishing.

The central early experience should be the **Grasshoots Content Inbox**.

Example:

```text
Your content this week

✓ Weekend roundup
✓ 1st XI match report
✓ Player of the weekend
✓ Sponsor feature
✓ Weekend preview
```

Actions:

- Preview
- Edit
- Copy
- Download
- Regenerate
- Change tone
- Shorten
- Mark published
- Archive

Generate variants appropriate to channels such as:

- Facebook
- Instagram
- X
- Website

---

# 25. Content Calendar

Future calendar functionality should display:

- planned content;
- generated content;
- approved content;
- published content;
- sponsor obligations;
- upcoming sporting events.

This should eventually drive publishing automation.

---

# 26. Social Publishing

Publishing should remain a later capability.

Potential channels:

- Facebook
- Instagram
- X

Conceptual abstraction:

```ts
interface SocialPublisher {
  publish(content: PublicationRequest): Promise<PublicationResult>;
}
```

Support progression through:

```text
Manual download
↓
Approval + publish
↓
Scheduled publishing
↓
Autopilot
```

Store publishing history and failures.

---

# 27. Sponsors

Sponsor support is a core Grasshoots domain.

Support:

```text
ClubSponsor
TeamSponsor
PlayerSponsor
CampaignSponsor
```

Example:

```text
Player milestone
+
Player sponsor exists

→ Sponsor acknowledgement may be included
```

Future sponsor obligations might include:

```text
Main Sponsor
Required social appearances: 40 per season
```

Future reporting might show:

- sponsor appearances;
- posts;
- impressions;
- clicks;
- campaign exposure.

This can allow Grasshoots to help clubs demonstrate sponsorship value rather than simply save volunteer time.

---

# 28. Season Model

`Season` is a first-class domain concept.

Commercial access should primarily be purchased **per season**.

Example:

```text
Create season
↓
Configure teams
↓
Configure sponsors
↓
Configure data
↓
Purchase/activate
↓
Active season
↓
Archive
↓
Renew
```

Historical seasons remain accessible according to applicable retention and commercial policies.

---

# 29. Billing Model

Billing must not be attached directly to a user identity.

Users may:

- administer multiple clubs;
- leave clubs;
- manage billing without creating content;
- join organisations owned by somebody else.

Introduce:

```text
BillingAccount
```

A Billing Account represents the party responsible for payment.

Conceptually:

```text
User
 ↓ authorised administrator
BillingAccount
 ↓
Season Purchase
 ↓
Entitlements
```

---

# 30. Payment Abstraction

Payments must be provider-independent.

Conceptually:

```ts
interface PaymentProvider {
  createPayment(...): Promise<PaymentResult>;
  getPayment(...): Promise<PaymentResult>;
  refundPayment(...): Promise<RefundResult>;
}
```

Potential implementations:

```text
StripePaymentProvider
ManualPaymentProvider
FuturePaymentProvider
```

A manually-recorded payment must be capable of purchasing exactly the same product access as Stripe.

---

# 31. Transactions

Financial transactions should remain auditable records.

Examples:

```text
PaymentTransaction
RefundTransaction
AdjustmentTransaction
```

Transactions may capture:

- Billing Account
- Provider
- External provider reference
- Amount
- Currency
- Status
- Timestamp
- Description
- Associated purchase

A payment does **not directly grant application access**.

Instead:

```text
Transaction
    ↓
Purchase
    ↓
Entitlement
```

---

# 32. Season Purchases

The primary commercial unit should initially be a:

# Club Season Purchase

Example:

```text
Grasshoots Cricket
Paignton Cricket Club
2027 Season
```

A base package may include:

```text
1 club
2 active teams
Defined Grasshoots features
```

Additional teams may be purchased.

Conceptually:

```text
Season Base Package
£X

Includes:
1 club
2 teams

Additional Team
£Y per season
```

Exact numbers must be commercial configuration, not application logic.

---

# 33. Team Entitlements

A club may contain more teams than it has paid to manage.

Example:

```text
Paignton CC — 2027

1st XI        ENTITLED
2nd XI        ENTITLED

3rd XI        NOT ENTITLED
4th XI        NOT ENTITLED
Women         NOT ENTITLED
Softball      NOT ENTITLED
Colts         NOT ENTITLED
```

These teams may still exist for discovery/configuration purposes.

Paid Grasshoots functionality must only operate against entitled teams.

---

# 34. Entitlement Enforcement

Backend entitlement checks must protect paid functionality.

Examples:

```text
Generate report
→ Team entitled?

Generate graphic
→ Team entitled?

Generate scheduled content
→ Team entitled?

Auto-publish
→ AUTO_PUBLISH entitlement present?
```

Do not rely on buttons being hidden in the UI.

---

# 35. Feature Entitlements

Avoid logic such as:

```ts
if (plan === "PRO")
```

Prefer explicit capabilities:

```text
CONTENT_GENERATION
GRAPHIC_GENERATION
MATCH_REPORTS
SPONSOR_CONTENT
CONTENT_CALENDAR
AUTO_PUBLISH
MULTI_CHANNEL
```

Quota-like values may include:

```text
MAX_ACTIVE_CLUBS
MAX_ACTIVE_TEAMS
MAX_AI_GENERATIONS
```

This allows commercial packaging to evolve without rewriting product rules.

---

# 36. Play-Cricket and Entitlements

Play-Cricket onboarding should help users discover available teams.

Example:

```text
We found 8 teams.

Your Grasshoots package includes 2 teams.

☑ 1st XI
☑ 2nd XI
☐ 3rd XI
☐ 4th XI
☐ Women's XI
☐ Softball
☐ U15
☐ U13
```

Only selected/entitled teams should receive Grasshoots processing.

Where Play-Cricket allows filtering, synchronise only required teams.

Where upstream APIs require broader retrieval:

1. request the minimum available dataset;
2. identify entitled teams;
3. ignore irrelevant records;
4. avoid persisting unnecessary detailed information.

Grasshoots must never automatically generate media content for non-entitled teams.

---

# 37. Trials

Trials and free access should use the same entitlement architecture.

Example:

```text
TRIAL

MAX_ACTIVE_CLUBS = 1
MAX_ACTIVE_TEAMS = 2
CONTENT_GENERATION = true
AUTO_PUBLISH = false
```

Do not build separate product-authorisation behaviour specifically for trials.

---

# 38. Renewals

Entitlements belong to a season.

Example:

```text
2027
1st XI ✓
2nd XI ✓

2028
No entitlement until renewed
```

Grasshoots should offer easy renewal:

> Renew your 2027 setup for the 2028 season.

Previous:

- teams;
- sponsors;
- branding;
- preferences

may be copied forward for convenience.

Payment must still establish the new entitlement.

---

# 39. Data Retention and Historical Context

Historical data may remain stored without being supplied to AI.

Current-season detail can include:

- fixtures;
- scorecards;
- performances;
- standings.

Historic seasons may later be reduced into compact summaries:

```text
PlayerSeasonSummary
TeamSeasonSummary
SeasonMilestones
BasicResultHistory
```

Generated content can remain available as a useful club media archive.

Data retention decisions should be driven by:

- usefulness;
- privacy;
- AI context requirements;
- regulatory obligations.

Not simply storage cost.

Special consideration is required for junior-player data.

---

# 40. Persistence Architecture

Local development:

# PostgreSQL via Docker

Production should initially favour PostgreSQL-compatible hosting.

Potential implementations include:

- AWS Aurora PostgreSQL
- Azure PostgreSQL
- other managed PostgreSQL
- DynamoDB where genuinely suitable later

Business logic should use repositories.

Example:

```ts
interface ClubRepository {}
interface FixtureRepository {}
interface ContentRepository {}
interface PlayerRepository {}
```

PostgreSQL and DynamoDB must not be falsely treated as interchangeable through one environment variable.

The repository boundary should permit future implementation change without compromising the domain model.

---

# 41. Backend Architecture

Use a **modular monolith** initially.

Suggested logical modules:

```text
/auth
/users
/clubs
/seasons

/billing
/payments
/entitlements

/ingestion
  /core
  /csv
  /manual
  /scheduled-api

/integrations
  /play-cricket

/sports
  /core
  /cricket
  /rugby
  /football

/facts

/content
/media
/sponsors

/ai

/publishing
/audit
```

Conceptual responsibilities:

```text
ingestion/integrations
= where data comes from

sports
= what sporting data means

facts
= what happened

content/media
= how Grasshoots communicates it

billing/entitlements
= what the customer is allowed to use
```

---

# 42. Frontend Stack

Required frontend technology:

- React
- TypeScript
- Vite
- MUI
- React Router
- Vitest
- Playwright

The application must support:

- desktop;
- tablet;
- mobile.

Use Grasshoots branding throughout rather than generic internal product naming.

---

# 43. Core UI

Likely application navigation:

```text
Dashboard
Content
Calendar
Fixtures
Teams
Players
Sponsors
Seasons
Integrations
Settings
```

Organisation/admin areas may include:

```text
Members
Billing
Audit
```

---

# 44. Integrations UI

The current sports-data source should be obvious.

Example:

```text
Sports Data

Play-Cricket
✓ Connected

Last sync: 10 minutes ago
Next sync: ...

Teams managed: 4
```

or:

```text
CSV Import

Download template
Upload data
View import history
```

---

# 45. Demo Experience

A polished public demo is an explicit product requirement.

The Grasshoots website should be capable of demonstrating how the product works without requiring setup.

Example:

```text
grasshoots.co.uk/cricket
```

could include a synthetic:

# Grasshoots Cricket Demo Club

with:

- teams;
- fixtures;
- results;
- players;
- sponsors;
- generated media.

Potential proposition:

> **See what Grasshoots could have created for your club this week.**

Demo data should be synthetic or intentionally authorised.

---

# 46. Authentication and Security

Requirements include:

- OAuth/OIDC
- secure sessions
- secure cookies
- CSRF protection where appropriate
- tenant isolation
- role enforcement
- secrets management
- encrypted integration credentials where appropriate

Never expose third-party API credentials unnecessarily to the client.

---

# 47. Auditability

Audit important actions including:

```text
Content generated
Content edited
Content regenerated
Content approved
Content published

Integration connected
Sports data synchronised
CSV imported

Sponsor changed

Payment recorded
Payment refunded
Season purchased
Entitlement granted
Entitlement changed
Team activated
Team deactivated

User invited
Role changed
```

---

# 48. Content Provenance

Generated content should retain metadata such as:

- AI provider
- AI model
- prompt/template version
- fact IDs
- generation time
- content version

This should enable Grasshoots to answer:

> Why did this post say this?

without necessarily retaining enormous prompt payloads forever.

---

# 49. Testing Strategy

## Unit Tests

Use Vitest extensively for:

- facts;
- streaks;
- milestones;
- sponsor rules;
- entitlements;
- billing rules;
- imports;
- connector mapping;
- domain logic.

No live AI calls.

## Connector Contract Tests

Example:

```text
Play-Cricket API fixture
        ↓
Mapper
        ↓
Expected canonical Fixture
```

and:

```text
CSV fixture
        ↓
CSV Connector
        ↓
Expected canonical Fixture
```

Different sources should be capable of producing equivalent canonical sporting data.

## AI Context Tests

Test exactly what reaches the model.

Example:

```ts
expect(context.previousMatches).toHaveLength(5);
```

Also test:

- historical exclusion;
- sponsor selection;
- fact selection;
- context/token budgets.

## AI Contract Tests

Mock providers and validate structured responses.

## AI Evaluations

Real model calls belong in a separate explicit suite.

Example:

```text
npm run eval:ai
```

Scenarios should eventually include:

- normal win;
- defeat;
- abandoned match;
- milestone;
- sponsor mention;
- streak;
- tie;
- unusual result.

Evaluate:

- factuality;
- tone;
- relevance;
- unsupported claims;
- repetition.

## End-to-End Tests

Use Playwright.

Normal E2E tests should run with:

```text
AI_PROVIDER=fake
```

No paid AI dependency should be required.

---

# 50. Local Development

Target experience:

```bash
git clone ...
docker compose up
npm install
npm run dev
```

Local environment should provide:

```text
Grasshoots React UI
Grasshoots API
PostgreSQL
Fake AI provider
Synthetic sporting data
CSV import
```

No AWS, Azure, Play-Cricket or paid AI service should be required to exercise the core application.

External integrations are opt-in.

---

# 51. Background Processing

Scheduled/long-running activity must not depend on HTTP requests.

Examples:

- Play-Cricket sync;
- results sync;
- weekly content preparation;
- image rendering;
- publication;
- retries.

Introduce an internal jobs abstraction.

Production implementations may eventually use:

- AWS scheduling/queues;
- Azure equivalents;
- other appropriate infrastructure.

Cloud-specific scheduling must remain an implementation detail.

---

# 52. Idempotency

Imports, synchronisation and jobs must be rerunnable.

Examples:

Synchronising the same Play-Cricket fixture repeatedly must produce one fixture.

Uploading a CSV twice must not silently duplicate records where identity can be established.

Repeating a content-generation job must not accidentally publish duplicate posts.

---

# 53. Observability

Do not use Google Analytics.

Grasshoots still requires technical observability.

Include:

- structured logs;
- errors;
- correlation IDs;
- job monitoring;
- connector health;
- last successful sync;
- import failures;
- AI usage;
- token usage;
- AI cost;
- publishing errors.

Any future product analytics should remain privacy-conscious and separate from Google Analytics.

---

# 54. Advertising

Grasshoots should support Google advertising where commercially useful.

Current assumption:

**Google AdSense / advertising units**, not Google Analytics.

Ads should be isolated from application business logic.

Recommended direction:

- paying club workspaces remain ad-free;
- public/free/demo surfaces may support advertising.

Advertising strategy can evolve independently of core Grasshoots functionality.

---

# 55. Graphic Generation

Routine Grasshoots graphics should be deterministic templates, not AI-generated images.

Templates should support:

- club branding;
- colours;
- badges;
- sponsor logos;
- content type;
- channel-specific aspect ratios.

Potential outputs:

```text
Square social post
Portrait social post
Story
Website banner
```

Keep rendering behind an implementation abstraction.

---

# 56. Accessibility

Accessibility is an explicit requirement.

Include:

- keyboard support;
- semantic HTML;
- usable focus states;
- accessible forms;
- screen-reader labelling;
- appropriate contrast.

Club-selected colour schemes must not silently create unusable designs.

---

# 57. Privacy and Data Management

Grasshoots should eventually support:

- export;
- account closure;
- club deletion;
- integration disconnection;
- personal-data deletion;
- retention policies.

Minimise personal information passed to external AI services.

Do not retain unnecessary information simply because storage is inexpensive.

---

# 58. Feature Flags

Use lightweight feature flags for:

- new sports;
- new connectors;
- AI-provider experiments;
- publishing;
- generation changes;
- beta functionality.

Avoid hard-coding experiments to individual customer IDs.

---

# 59. MVP — Grasshoots Cricket

The first credible paid product should contain:

## Account and Club

- Google/Facebook SSO
- Create club
- Branding
- Season
- Team configuration
- Multi-tenancy
- Roles

## Billing

- Billing Account
- Payment abstraction
- Manual payment support
- Stripe-ready provider boundary
- Seasonal purchase
- Team entitlements
- Feature entitlements

## Ingestion

- Connector abstraction
- Play-Cricket integration
- Scheduled Play-Cricket sync
- CSV import
- Published CSV templates
- Source provenance
- Idempotent processing

## Cricket

- Canonical cricket model
- Fixtures/results
- Player performances
- Facts engine
- Streaks
- Season totals
- Milestones

## Content

- Result content
- Match report
- Fixture preview
- Weekend roundup
- Player performance
- Milestones
- Sponsor acknowledgement
- Channel-specific versions

## Media

- Branded templates
- Content Inbox
- Copy/download/edit/regenerate

## Platform

- PostgreSQL
- Fake AI
- Real AI provider abstraction
- Centralised Grasshoots brand/contact configuration
- Audit history
- Docker development environment
- Vitest
- Playwright
- AI evaluation suite

---

# 60. Explicitly Out of MVP

Unless trivial to add:

- automatic social publishing;
- live match posting;
- full sponsor analytics;
- rugby;
- football;
- other sports;
- arbitrary API mapping UI;
- mobile apps;
- complex workflow builder;
- AI image generation;
- video generation;
- social engagement monitoring;
- vector database/RAG platform;
- microservices.

Architecture should allow these later without requiring them today.

---

# 61. Engineering Principles

1. **Grasshoots is the platform; sports are capabilities underneath it.**
2. **Use one Grasshoots brand rather than independent sport products.**
3. **Brand/contact information must be centrally configurable, not hard-coded.**
4. **Connectors understand where data comes from.**
5. **Sports adapters understand what sporting data means.**
6. **The facts engine determines what happened.**
7. **Grasshoots determines what should be communicated.**
8. **Official integrations translate source data for customers.**
9. **Generic imports conform to published Grasshoots contracts.**
10. **External source formats must not leak into the core domain.**
11. **Software determines facts; AI writes prose.**
12. **Store broadly, retrieve narrowly.**
13. **The AI model never receives the entire database.**
14. **AI providers are replaceable infrastructure.**
15. **Sports-data providers are replaceable connectors.**
16. **Persistence is hidden behind repositories.**
17. **Billing is separate from payments.**
18. **Payments are separate from entitlements.**
19. **Team-level paid access is enforced by the backend.**
20. **Local development requires no cloud services.**
21. **Most tests must make no real AI calls.**
22. **Sync and imports must be idempotent.**
23. **Important data has understandable provenance.**
24. **Automated publishing must be explainable and auditable.**
25. **Build a modular monolith before considering microservices.**
26. **Do not build abstractions without realistic future implementations.**
27. **Prefer deterministic behaviour whenever possible.**
28. **Optimise for reducing volunteer workload, not demonstrating AI technology.**

---

# 62. Initial Product Validation

The first meaningful validation for **Grasshoots Cricket** is:

> Can a real cricket club connect Play-Cricket — or import the Grasshoots CSV format — select the teams it wants Grasshoots to manage, and open the product after a weekend to find genuinely useful, accurate and professionally branded content that would otherwise have taken a volunteer significant time to create?

If that experience is excellent, Grasshoots has something worth selling.

The next strategic question then becomes:

> Can the same Grasshoots platform deliver that experience for another sport by introducing a new connector, sports adapter and appropriate templates rather than rebuilding the product?

That is the long-term platform thesis.