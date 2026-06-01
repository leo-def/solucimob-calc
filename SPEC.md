# Solucimob Calc - Technical Specification

> Technical specification for the Solucimob Calculation Microservice.
> Reference for understanding real estate evaluation and metrics calculation.

## Executive Summary

- **Project**: Solucimob Calc (Calculation Microservice)
- **Type**: Node.js REST Microservice
- **Language**: JavaScript (Node.js 18+)
- **Framework**: Express.js
- **Status**: Active Development
- **Owner**: Development team

---

## 1. Problem Statement

### Context
Solucimob Calc executes business logic for real estate calculations, evaluations, and metrics. It depends on the Configuration Service for global parameters and provides APIs for calculation operations.

### Goals
- **Primary**: Perform accurate real estate calculations and valuations
- **Secondary**: Integrate with Configuration Service for rule management
- **Tertiary**: Provide REST API for calculation operations

### Success Metrics
- [x] REST API for calculation operations
- [x] Integration with solucimob-config service
- [x] Docker containerization
- [x] Environment variable configuration
- [x] Health check endpoint
- [ ] >85% test coverage
- [ ] Sub-100ms calculation response time

---

## 2. Technology Stack

| Component | Technology | Version | Rationale |
|-----------|-----------|---------|-----------|
| Runtime | Node.js | 18.0+ | Server-side JavaScript |
| Framework | Express.js | 4.18+ | Lightweight web framework |
| Database | MongoDB Atlas | Latest | Cloud database via connection string |
| Testing | Jest | 27.0+ | Testing framework |
| Linting | ESLint | 8.0+ | Code quality |
| Transpiler | Babel | 7.0+ | ES6+ support |
| Docs | Swagger/JSDoc | 3.0 | API documentation |

### Key Dependencies
- `express`: HTTP server framework
- `dotenv`: Environment variable management
- `axios` or `node-fetch`: HTTP client for config service calls
- `jest`: Testing framework (dev)

---

## 3. Architecture

### Service Architecture

```
┌────────────────────────────────────────────┐
│       Express HTTP Layer                   │
│  (GET /health, POST /api/calculate)        │
└────────────────────┬─────────────────────────┘
                     │
┌────────────────────▼─────────────────────────┐
│     Controller Layer                         │
│  (Request validation, response formatting)   │
└────────────────────┬─────────────────────────┘
                     │
┌────────────────────▼─────────────────────────┐
│     Service Layer                            │
│  (Business logic, calculations)              │
└────────────────────┬─────────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
    ▼                ▼                ▼
┌────────────┐  ┌────────────┐  ┌──────────────┐
│ Repository │  │ Helpers    │  │ Config Client│
│ (MongoDB)  │  │ (Calculat.)│  │ (Remote API) │
└────────────┘  └────────────┘  └──────────────┘
    │                                │
    ▼                                ▼
  MongoDB              solucimob-config:3002
  Atlas                (Rules & Parameters)
```

### Request Flow - Property Valuation

```
Client Request
  ↓
POST /api/property/valuation
  { property: {...} }
  ↓
Controller validates input
  ↓
Service calls config service: GET /api/rules
  ↓
Service performs calculation with rules
  ↓
Service saves result to MongoDB
  ↓
Return calculated valuation { value, breakdown, ... }
```

---

## 4. Project Structure

```
src/
├── index.js                  # Entry point
├── config/
│   └── database.js          # MongoDB connection
├── routes/
│   ├── health.js            # Health check endpoint
│   └── calculations.js      # Calculation endpoints
├── controllers/
│   ├── calculationController.js
│   └── propertyController.js
├── services/
│   ├── calculationService.js      # Business logic
│   ├── configService.js            # Config API client
│   └── propertyService.js
├── models/
│   ├── Calculation.js       # MongoDB schema
│   └── Property.js
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
└── utils/
    └── helpers.js           # Calculation helpers

test/
├── unit/
│   └── calculationService.test.js
└── integration/
    └── calculationAPI.test.js

.env.example
.eslintrc.json
jest.config.js
package.json
```

---

## 5. Key Endpoints

### Health & Status
```
GET /health
  Response: { status: 'ok' }

GET /api/status
  Response: { service: 'calc', version: '1.0.0' }
```

### Calculations
```
POST /api/property/valuation
  Body: { property: {...}, method: 'comparable|cost|income' }
  Response: { valuation: {...}, breakdown: {...} }

POST /api/metrics/analyze
  Body: { data: {...} }
  Response: { metrics: {...} }

GET /api/calculations/:id
  Response: { id: '...', result: {...}, status: 'completed' }
```

---

## 6. Configuration Service Integration

### Fetching Global Rules

```javascript
// In calculationService.js
async function getValuationRules() {
  const response = await axios.get(
    `http://solucimob-config:3002/api/rules/valuation`
  );
  return response.data;
}

// In calculation logic
const rules = await getValuationRules();
const valuation = calculateProperty(property, rules);
```

---

## 7. Error Handling

### Response Format

```json
// Success
{
  "success": true,
  "data": { "valuation": 500000 }
}

// Error
{
  "success": false,
  "error": "Invalid property data",
  "code": "VALIDATION_ERROR"
}
```

