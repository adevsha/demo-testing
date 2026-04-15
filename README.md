# REST API Testing Stack

Containerised BDD testing stack for REST APIs using Cucumber.js with multilingual support (English and Bahasa Indonesia).

## What's Inside

| Component | Purpose |
|-----------|---------|
| **Cucumber.js** | BDD test runner with Gherkin feature files |
| **Supertest** | HTTP assertions against Express and external APIs |
| **Nock** | HTTP mocking for external service dependencies |
| **Chai** | Assertion library |
| **Faker** | Realistic test data generation |
| **Express** | Minimal local API server with `/health` endpoint |
| **Axios** | HTTP client used by the Express server |

## Project Structure

```
├── app.js                                  # Express server (GET /health with external dep)
├── package.json
├── cucumber.js                             # Cucumber profiles (default, integration, per-language)
├── Dockerfile                              # node:20-slim test runner image
├── docker-compose.yml                      # Orchestrates demo-rest API + test runner
├── demo-rest/                              # Python FastAPI application under test
│   ├── app/
│   │   ├── main.py                         # FastAPI entry point
│   │   ├── routes/{health,user,product}.py # Endpoint definitions
│   │   ├── controllers/{user,product}.py   # Business logic
│   │   ├── models/{user,product}.py        # Pydantic schemas
│   │   └── data/store.py                   # In-memory data store
│   └── Dockerfile
└── features/
    ├── health-check.feature                # Express health (EN) — nock mock demo
    ├── health-check.id.feature             # Express health (ID)
    ├── health-check-api.feature            # API health (EN)
    ├── health-check-api.id.feature         # API health (ID)
    ├── users.feature                       # Users CRUD (EN) — 12 scenarios
    ├── users.id.feature                    # Users CRUD (ID) — 12 scenarios
    ├── products.feature                    # Products CRUD (EN) — 16 scenarios
    ├── products.id.feature                 # Products CRUD (ID) — 16 scenarios
    ├── step_definitions/
    │   ├── health-check.steps.js           # Express health steps (nock mocks)
    │   ├── health-check-api.steps.js       # API health steps
    │   ├── users.steps.js                  # Users CRUD steps (EN + ID)
    │   └── products.steps.js               # Products CRUD steps (EN + ID)
    └── support/
        ├── hooks.js                        # Before/After hooks (data isolation, nock lifecycle)
        └── world.js                        # Custom World (baseUrl, shared state)
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

## Quick Start

### Integration tests (against demo-rest API)

Build and run the full stack — API + tests in Docker Compose:

```sh
docker compose up --build --abort-on-container-exit
```

This starts the FastAPI application, waits for its health check to pass, then runs all 58 Cucumber scenarios (29 English + 29 Bahasa Indonesia) covering:

- **Health check** — `GET /health` returns 200
- **Users CRUD** — create, list, get by ID, partial update, delete
- **Products CRUD** — create, list, get by ID, partial update, delete
- **Validation errors** — missing fields (422), wrong types (422)
- **Edge cases** — non-existent IDs (404), double-delete (404), price=0, out-of-stock

### Run a specific profile

```sh
docker compose run --rm tests npm run test:users-en      # Users English only
docker compose run --rm tests npm run test:users-id      # Users Bahasa only
docker compose run --rm tests npm run test:products-en   # Products English only
docker compose run --rm tests npm run test:products-id   # Products Bahasa only
docker compose run --rm tests npm run test:api-health-en # API health English
docker compose run --rm tests npm run test:api-health-id # API health Bahasa
docker compose run --rm tests npm run test:integration   # All integration tests
```

### Unit tests (Express app with nock mocks)

Build the test runner image and run standalone:

```sh
docker build -t testing-stack:latest .
docker run --rm testing-stack:latest                     # All unit tests
docker run --rm testing-stack:latest npm run test:en     # English only
docker run --rm testing-stack:latest npm run test:id     # Bahasa Indonesia only
```

## Test Coverage

| Endpoint | Method | Scenarios | Covers |
|----------|--------|-----------|--------|
| `GET /health` | GET | 2 x 2 lang | Happy path, response fields |
| `POST /users/` | POST | 3 x 2 lang | Valid create, missing field (422), wrong type (422) |
| `GET /users/` | GET | 2 x 2 lang | List all, list includes created user |
| `GET /users/:id` | GET | 2 x 2 lang | Found (200), not found (404) |
| `PATCH /users/:id` | PATCH | 2 x 2 lang | Partial update, not found (404) |
| `DELETE /users/:id` | DELETE | 3 x 2 lang | Delete (204), not found (404), double-delete |
| `POST /products/` | POST | 5 x 2 lang | Valid create, missing field, wrong type, price=0, out-of-stock |
| `GET /products/` | GET | 2 x 2 lang | List all, list includes created product |
| `GET /products/:id` | GET | 2 x 2 lang | Found (200), not found (404) |
| `PATCH /products/:id` | PATCH | 3 x 2 lang | Partial update, not found, stock toggle |
| `DELETE /products/:id` | DELETE | 3 x 2 lang | Delete (204), not found (404), double-delete |

## Data Isolation

- **Before** hooks seed faker-generated test data and create resources via the API
- **After** hooks delete any resources created during the scenario
- Read-only scenarios use pre-populated seed data (IDs 1-10)
- Mutating scenarios always operate on freshly created test records
- Tests can be run repeatedly without restarting the API

## Adding New Tests

1. Write a `.feature` file in `features/` (add `# language: id` at the top for Bahasa Indonesia)
2. Implement matching step definitions in `features/step_definitions/`
3. Add a profile in `cucumber.js` and a corresponding npm script in `package.json`
4. Use nock in your steps to mock any external HTTP dependencies
5. Rebuild and run: `docker compose up --build --abort-on-container-exit`
