# Web Services [final name tbd]

Free Czech-language online utility tools — text, PDF, images, calculators and Czech local data.

> **Project status:** Active development. First tool in progress.

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Tools](#tools)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Contributing](#contributing)

---

## About

Web Services is a Czech-language website providing free online utility tools. The goal is to offer a quality alternative to foreign tools with a focus on Czech local data (Czech National Bank rates, ARES company registry, public holidays) and user privacy.

Data entered into tools is never stored or shared with third parties. Files uploaded for processing are handled in server memory and deleted immediately after the result is returned.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express 4 |
| Language | TypeScript 5 (NodeNext modules) |
| Templates | Pug |
| Validation | Zod |
| Unit / integration tests | Vitest + Supertest |
| E2E tests | Playwright |
| Linting | ESLint 9 |
| Formatting | Prettier |
| CI | GitHub Actions |
| Hosting | — |

---

## Project Structure

```
Web-Services/
├── src/
│   ├── app.ts                    # Express app — middleware stack, router registration
│   ├── server.ts                 # HTTP server, graceful shutdown, process handlers
│   ├── config/
│   │   └── env.ts                # Environment variable validation via Zod
│   ├── middleware/
│   │   ├── error-handler.ts      # Global error handler (4-param Express middleware)
│   │   ├── locals.ts             # res.locals defaults for all views
│   │   └── not-found.ts          # 404 handler
│   ├── modules/
│   │   ├── core/
│   │   │   ├── health/           # Health-check endpoint
│   │   │   │   ├── health.controller.ts
│   │   │   │   └── health.routes.ts
│   │   │   ├── home/             # Homepage controller and routes
│   │   │   │   ├── home.controller.ts
│   │   │   │   └── home.routes.ts
│   │   │   └── legal/            # Legal pages (privacy, terms, contact, FAQ)
│   │   │       ├── legal.controller.ts
│   │   │       └── legal.routes.ts
│   │   └── text/
│   │       └── pocet-znaku/      # Tool: character counter
│   │           ├── pocet-znaku.controller.ts
│   │           ├── pocet-znaku.routes.ts
│   │           ├── pocet-znaku.schema.ts
│   │           ├── pocet-znaku.service.ts
│   │           └── pocet-znaku.service.test.ts
│   └── shared/
│       ├── types/
│       │   └── errors.ts         # AppError class, HttpStatus constants, isAppError guard
│       └── utils/
│           ├── catchAsync.ts     # Wrapper for async Express handlers
│           ├── seo.ts            # buildSeoMeta() — builds meta/OG/JSON-LD per page
│           └── seo.test.ts
├── views/
│   ├── layouts/
│   │   └── main.pug              # Shared layout — header, footer, GA tag, cookie banner
│   ├── partials/
│   │   ├── ad-slot.pug
│   │   ├── cookie-banner.pug
│   │   ├── nav.pug
│   │   ├── tool-faq.pug
│   │   ├── tool-header.pug
│   │   ├── tool-related.pug
│   │   └── tool-result.pug
│   ├── pages/
│   │   ├── home.pug
│   │   ├── info/
│   │   │   └── faq.pug
│   │   └── legal/
│   │       ├── privacy.pug
│   │       ├── terms.pug
│   │       └── contact.pug
│   └── errors/
│       └── error.pug
├── public/
│   ├── css/
│   │   └── main.css              # Monochrome design system
│   ├── images/
│   │   └── favicon.ico
│   ├── js/
│   │   └── main.js               # Vanilla JS — mobile nav, cookie banner, copy button
│   ├── robots.txt
│   └── sitemap.xml
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI pipeline
├── .env.example
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Getting Started

### Requirements

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/torres-christopher/Web-Services.git
cd Web-Services

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env as needed

# Start the development server
npm run dev
```

The server runs at `http://localhost:3000`.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server with auto-restart (tsx watch) |
| `npm run build` | Compile TypeScript → dist/ |
| `npm start` | Run the compiled production build |
| `npm run typecheck` | Type-check without emitting files |
| `npm test` | Run all unit and integration tests |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier formatting |
| `npm run format:check` | Prettier check without writing |

---

## Configuration

All environment variables are validated at startup via Zod. If a required variable is missing the app crashes immediately with a clear error message rather than failing silently later.

See `.env.example` for the full list:

```bash
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
SITE_NAME=Web Services
GA_MEASUREMENT_ID=        # Google Analytics — leave empty for local dev
ADSENSE_CLIENT_ID=        # Google AdSense — leave empty for local dev
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

Environment variables in CI are stored as GitHub Actions secrets and variables — never hardcoded in the workflow YAML.

---

## Tools

### Live

| Tool | Route | Status |
|---|---|---|
| — | — | — |

### In Progress

| Tool | Route | Status |
|---|---|---|
| Character counter | `/pocet-znaku` | Service + tests complete, controller pending |

### Planned

#### Text Tools

| Tool | Route |
|---|---|
| Uppercase / lowercase / title case converter | `/prevod-velkych-malych-pismen` |
| Whitespace and line break cleaner | `/cisteni-textu` |
| Duplicate line remover | `/odstranit-duplicitni-radky` |
| Prefix / suffix per line | `/pridat-prefix-suffix` |
| Delimited column extractor | `/vybrat-sloupec-z-textu` |
| URL slug generator | `/slug-generator` |

#### Developer Tools

<!-- Add tools here as they are planned -->

#### Converters & Encodings

<!-- Add tools here as they are planned -->

#### Czech-Specific Tools

<!-- Add tools here as they are planned -->

#### Date & Time Calculators

<!-- Add tools here as they are planned -->

#### Health & Fitness Calculators

<!-- Add tools here as they are planned -->

#### Image Tools

<!-- Add tools here as they are planned -->

#### PDF Tools

<!-- Add tools here as they are planned -->

---

## Testing

The project uses a three-layer testing approach:

| Type | Tool | Location |
|---|---|---|
| Unit tests | Vitest | Co-located next to the file under test (`*.test.ts`) |
| Integration tests | Vitest + Supertest | Co-located next to the route file (`*.routes.test.ts`) |
| E2E tests | Playwright | `tests/e2e/` |

Unit and integration tests live alongside the code they test inside `src/`. Playwright tests live in `tests/e2e/` and are excluded from Vitest.

### Running Tests

```bash
# All unit and integration tests
npm test

# Watch mode during development
npm run test:watch

# End-to-end tests
npm run test:e2e
```

### Current Coverage

| Module | Unit tests | Integration tests |
|---|---|---|
| `shared/utils/seo.ts` | ✓ | — |
| `pocet-znaku` service | ✓ | — |
| Other modules | — | — |

---

## CI/CD

GitHub Actions runs on every pull request and push to `main`.

### CI Pipeline (`.github/workflows/ci.yml`)

Steps in order:

1. Checkout repository
2. Setup Node 24
3. `npm ci` — clean install from lockfile
4. `npm run lint` — ESLint check
5. `npm run typecheck` — TypeScript type check
6. `npm test` — all unit and integration tests
7. `npm run build` — confirm production build compiles

Environment variables are injected from GitHub Actions secrets and variables.

### Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable code, protected, only accepts PRs |
| `feature/*` | New functionality |
| `fix/*` | Bug fixes |
| `chore/*` | Config, tooling, non-code changes |

Direct pushes to `main` are blocked by branch protection rules. Every change goes through a pull request and CI must be green before merging.

### Deployment

<!-- Fill in after deployment is configured -->

---

## Contributing

This is a personal portfolio project and is not currently open to external contributions.

---

## Licence

<!-- Add licence -->
