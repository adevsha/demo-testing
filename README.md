# REST API Testing Stack

Containerised BDD testing stack for REST APIs using Cucumber.js with multilingual support (English and Bahasa Indonesia).

## What's Inside

| Component | Purpose |
|-----------|---------|
| **Express** | Minimal API server with a `/health` endpoint |
| **Cucumber.js** | BDD test runner with Gherkin feature files |
| **Supertest** | HTTP assertions against the Express app |
| **Nock** | HTTP mocking for external service dependencies |
| **Chai** | Assertion library |
| **Faker** | Realistic test data generation |
| **Axios** | HTTP client used by the API server |

## Project Structure

```
├── app.js                              # Express server (GET /health)
├── package.json
├── cucumber.js                         # Cucumber profiles (default, en, id)
├── Dockerfile                          # node:20-slim based image
└── features/
    ├── health-check.feature            # English scenarios
    ├── health-check.id.feature         # Bahasa Indonesia scenarios
    ├── step_definitions/
    │   └── health-check.steps.js       # Step implementations (both languages)
    └── support/
        └── hooks.js                    # Before/After hooks (test data, nock lifecycle)
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

## Quick Start

Build the image:

```sh
docker build -t testing-stack:latest .
```

Run all tests:

```sh
docker run --rm testing-stack:latest
```

Run tests for a specific language:

```sh
docker run --rm testing-stack:latest npm run test:en   # English only
docker run --rm testing-stack:latest npm run test:id   # Bahasa Indonesia only
```

## How It Works

The `/health` endpoint calls an external upstream service. During tests, **nock** intercepts all outbound HTTP and simulates the upstream responses. This means:

- No real network calls are made during testing
- Two scenarios per language verify behaviour when the external service is **available** vs **unavailable**
- **Before** hooks seed faker-generated test data (UUID, name, email, timestamp) into each scenario's world context
- **After** hooks clean up nock interceptors and reset state

## Running Locally (Without Docker)

```sh
npm install
npm test            # all tests
npm run test:en     # English only
npm run test:id     # Bahasa Indonesia only
```

## Adding New Tests

1. Write a `.feature` file in `features/` using Gherkin syntax (add `# language: id` at the top for Bahasa Indonesia)
2. Implement matching step definitions in `features/step_definitions/`
3. Use nock in your steps to mock any external HTTP dependencies
4. Rebuild the Docker image and run
