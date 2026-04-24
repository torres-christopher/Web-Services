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
├── .env
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .prettierrc
├── README.md
├── eslint.config.mjs
├── git-flow.bash
├── package.json
├── package-lock.json
├── tsconfig.json
├── vitest.config.ts
│
├── src/                                  # TypeScript source
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── env.ts
│   ├── middleware/
│   │   ├── error-handler.ts
│   │   ├── locals.ts
│   │   └── not-found.ts
│   ├── modules/
│   │   ├── core/
│   │   │   ├── core.routes.ts
│   │   │   ├── health/
│   │   │   │   ├── health.controller.ts
│   │   │   │   ├── health.routes.ts
│   │   │   │   └── health.routes.test.ts
│   │   │   ├── home/
│   │   │   │   ├── home.controller.ts
│   │   │   │   └── home.routes.ts
│   │   │   └── legal/
│   │   │       ├── legal.controller.ts
│   │   │       └── legal.routes.ts
│   │   └── tools/
│   │       └── text/
│   │           ├── text.routes.ts
│   │           ├── pocet-znaku/
│   │           │   ├── pocet-znaku.controller.ts
│   │           │   ├── pocet-znaku.faq.ts
│   │           │   ├── pocet-znaku.routes.ts
│   │           │   ├── pocet-znaku.routes.test.ts
│   │           │   ├── pocet-znaku.schema.ts
│   │           │   ├── pocet-znaku.service.ts
│   │           │   └── pocet-znaku.service.test.ts
│   │           └── prevod-velikosti-znaku/
│   │               ├── prevod-velikosti-znaku.controller.ts
│   │               ├── prevod-velikosti-znaku.faq.ts
│   │               ├── prevod-velikosti-znaku.routes.ts
│   │               ├── prevod-velikosti-znaku.routes.test.ts
│   │               ├── prevod-velikosti-znaku.schema.ts
│   │               ├── prevod-velikosti-znaku.service.ts
│   │               └── prevod-velikosti-znaku.service.test.ts
│   └── shared/
│       ├── data/
│       │   └── tools.ts
│       ├── types/
│       │   ├── errors.ts
│       │   ├── faq.ts
│       │   ├── seo.ts
│       │   └── toolDetails.ts
│       └── utils/
│           ├── catchAsync.ts
│           ├── seoMeta.ts
│           └── seoMeta.test.ts
│
├── dist/                                 # Compiled JS output (mirrors src/)
│
├── public/                               # Static assets
│   ├── css/
│   │   └── main.css
│   ├── images/
│   │   └── favicon.ico
│   ├── js/
│   │   ├── main.js
│   │   └── tools/
│   │       ├── pocet-znaku.js
│   │       └── prevod-velikosti-znaku.js
│   ├── robots.txt
│   └── sitemap.xml
│
└── views/                                # Pug templates
    ├── errors/
    │   └── error.pug
    ├── layouts/
    │   └── main.pug
    ├── pages/
    │   ├── core/
    │   │   ├── home.pug
    │   │   ├── info/
    │   │   │   └── faq.pug
    │   │   └── legal/
    │   │       ├── contact.pug
    │   │       ├── privacy.pug
    │   │       └── terms.pug
    │   └── tools/
    │       └── text/
    │           ├── text.pug
    │           ├── pocet-znaku.pug
    │           └── prevod-velikosti-znaku.pug
    └── partials/
        ├── ad-slot.pug
        ├── nav.pug
        ├── tool-faq.pug
        ├── tool-header.pug
        └── tool-related.pug
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
| Character count | `/pocet-znaku` | Live |
| Uppercase / lowercase / title case converter | `/prevod-velikosti-znaku` | Live |

### In Progress

| Tool | Route | Status |
|---|---|---|
| JSON validator | `/json-validator` | Pending |

### Planned

#### Text Tools

| Tool | Route |
|---|---|
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
