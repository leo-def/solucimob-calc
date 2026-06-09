# Solucimob Calc - Technical Specification

> Real estate area cost calculator microservice for the Solução Imobiliária suite.
> Calls solucimob-config to get current valorM2 and computes total cost given m² input.

## Executive Summary

Solucimob Calc is a **TypeScript + Express** microservice that computes the total cost of a real estate area given its size in m². It fetches the current price-per-m² from `solucimob-config` via HTTP (ServiceDiscovery pattern), multiplies by the input m², and returns the result. Shares the same abstract architecture as `solucimob-config` (Router/Service/Schema/DTO base classes, environment configs, Winston logging).

---

## 1. Problem Statement

### Context
Part of the "Solução Imobiliária" microservices suite. Provides real estate area cost calculation as a standalone service that can be consumed by the frontend.

### Goals
- `POST /calc` endpoint: given `m2`, return `{ m2, valor, valorM2 }`
- Fetch `valorM2` dynamically from `solucimob-config` service
- Same architectural patterns as sibling services (abstract bases, service discovery)

### Success Metrics
- [x] `POST /calc` endpoint
- [x] ServiceDiscovery + ConfigService integration
- [x] OpenAPI 3.0 spec (`api-schema.yml`)
- [x] Environment-aware config and logging
- [x] Jest test suite
- [ ] Input validation beyond null check
- [ ] Caching of valorM2 to reduce config service calls

---

## 2. Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | TypeScript | 4.x |
| Runtime | Node.js | LTS |
| Framework | Express | 4.x |
| HTTP Client | Axios | 0.x |
| Logging | Winston | 3.x |
| Testing | Jest | 26.x |
| Build | Babel | 7.x |
| CI | BitBucket Pipelines | - |

---

## 3. Architecture

```
POST /calc { m2: 100 }
         ↓
    CalcRouter (extends Router)
         ↓
    CalcService.calc(req, res)
         ↓
    ConfigService.find()       ← HTTP call to solucimob-config:3000/config
         ↓
    Compute: valor = m2 * valorM2
         ↓
    Return { m2, valor, valorM2 }
```

---

## 4. Module Structure

```
src/
  Server.ts
  routes/api/
    CalcRouter.ts              # POST /calc
  services/
    CalcService.ts             # Main calc logic (m2 × valorM2)
    ConfigService/
      ConfigService.ts         # Fetches config from solucimob-config
      Mock.ts                  # Mock config for tests
  config/
    AppLoader.ts, ErrorHandler.ts, ResponseHandler.ts, DateUtils.ts
    logger/                    # Winston per-environment configs
  commons/
    ApiClient.ts, ServiceDiscovery.ts
  abstracts/
    Router.ts, Service.ts, DTO.ts
  types/api/calc/
    CalcRequest.ts             # { m2: number }
    CalcResponse.ts            # { m2, valor, valorM2 }
  types/api/config/
    ConfigResponse.ts          # { valorM2: number }
  enums/
    Service.enum.ts            # CONFIG, CALC service names
  env/
    development.ts, production.ts, test.ts
```

---

## 5. API Endpoints

```
POST /calc    → Calculate total area cost
```

**Request:**
```json
{ "m2": 100 }
```

**Response:**
```json
{ "m2": 100, "valor": 150000.00, "valorM2": 1500.00 }
```

OpenAPI spec: `api-schema.yml`

---

## 6. Core Calculation Logic

```typescript
// CalcService.calc
const config = await configService.find()  // GET solucimob-config/config
const valor = body.m2 * config.valorM2
return { m2: body.m2, valor, valorM2: config.valorM2 }
```

---

## 7. Testing Strategy

```bash
npm test    # Jest (uses ConfigService/Mock.ts to avoid live config call)
```

Tests: `CalcRouter.spec.ts`, `CalcRequest.spec.ts`, `CalcResponse.spec.ts`, `ServiceDiscovery.spec.ts`, `ConfigResponse.spec.ts`

---

## 8. Deployment & Operations

```bash
npm run dev     # ts-node-dev hot-reload
npm run build   # Babel transpile
npm start       # node dist/Server.js
```

**Heroku:** Procfile (`web: npm start`), port 3001  
**CI:** BitBucket Pipelines

---

## 9. Issues Found

### Logic Issues
- **`CalcService.calc` logs `req.body.m2` via `console.log`** instead of using the `LoggerService` — inconsistent logging; debug output leaks to production stdout.
- **No caching of `valorM2`** — every `POST /calc` triggers an HTTP call to `solucimob-config`. Under load, this creates N network calls. Should cache with a TTL.

### Input Validation
- Only checks `!body.m2` — this rejects `m2 = 0` as invalid (which may or may not be intentional). Use `body.m2 == null` instead.
- No upper bound validation on `m2` — arbitrarily large values are accepted.
- No type validation — non-numeric `m2` (e.g., `"abc"`) will produce `NaN` in the calculation.

### Dependencies
- Same outdated dependency issues as `solucimob-config` (TypeScript 4.x, Axios 0.x, old Jest).
- `CalcService` passes raw `req`/`res` Express objects into service methods — HTTP concerns leak into service layer.
