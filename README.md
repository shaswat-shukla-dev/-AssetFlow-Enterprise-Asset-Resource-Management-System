# AssetFlow

**Enterprise Asset & Resource Management System**

A full-stack ERP module for tracking organizational assets — from
procurement and categorization to allocation, maintenance, and retirement —
built with a clean, layered backend architecture and a modern React
dashboard.

---

## Tech Stack

**Backend**
Node.js · Express.js · PostgreSQL · Prisma ORM · JWT · bcrypt ·
Express Validator · Helmet · Compression

**Frontend**
React 19 · Vite · TailwindCSS · Redux Toolkit · TanStack Query ·
React Hook Form · React Router

**Infrastructure**
Docker · Docker Compose · Nginx · GitHub Actions (CI) · Render (API) ·
Vercel (client) · Neon / PostgreSQL

---

## Architecture

The backend follows **Clean Architecture** with a strict one-way data
flow — no business logic ever lives in a controller:

```
Route → Controller → Service → Repository → Prisma → PostgreSQL
```

```
server/
  src/
    config/         # DB connection, environment setup
    controllers/     # HTTP layer — request/response only
    services/         # Business logic and validation rules
    repositories/    # All Prisma/DB queries live here
    routes/           # Route definitions per module
    middlewares/     # Auth, RBAC, error handling
    validators/       # express-validator schemas
    utils/            # JWT, password hashing, response helpers
  prisma/
    schema.prisma
    migrations/       # One migration per schema change, never deleted
```

Every module — Asset Categories, Vendors, Branches, Locations, Assets —
follows the exact same five-file pattern, so once you understand one
module you understand all of them.

---

## Features

- **JWT authentication** with bcrypt password hashing and role-based
  access control (RBAC) enforced via middleware
- **Master data management** — Asset Categories (with parent/child
  hierarchy), Vendors, Branches, Locations (Building → Floor → Room →
  Rack → Shelf)
- **Asset lifecycle tracking** — asset number, serial number, purchase
  cost/date, vendor, warranty, depreciation rate, status
  (Available / Allocated / Under Maintenance / Retired / Lost)
- **Automatic audit trail** — every create/update/retire action on an
  asset is logged to an `AssetHistory` table
- **Soft delete everywhere** — records are deactivated, not destroyed
- **Pagination, search, and status filtering** built into every list
  endpoint
- **React dashboard** — protected routing, live KPI cards pulled from
  real API data, and a shared, config-driven CRUD table/modal component
  used across every module (no copy-pasted screens)

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL (local, Neon, or via Docker Compose below)

### Local development

```bash
# 1. Backend
cd server
npm install
cp .env.example .env        # set DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN
npx prisma migrate dev
npm run dev                  # → http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
cp .env.example .env         # VITE_API_BASE_URL
npm run dev                  # → http://localhost:5173
```

### With Docker

```bash
docker compose up --build
# API      → http://localhost:5000
# Frontend → http://localhost:8080
```

### Deployment

- **API** → Render, via `render.yaml` (or swap `DATABASE_URL` for a
  Neon connection string)
- **Frontend** → Vercel, via `client/vercel.json`
- **CI** → GitHub Actions (`.github/workflows/ci.yml`) installs
  dependencies, generates the Prisma client, and builds both apps on
  every push and pull request

---

## API Overview

All endpoints are versioned under `/api/v1`. Authenticated routes require
`Authorization: Bearer <token>`; mutating routes additionally require the
`ADMIN` role.

| Module | Base Route |
|---|---|
| Auth | `/api/v1/auth` — register, login, profile |
| Asset Categories | `/api/v1/asset-categories` |
| Vendors | `/api/v1/vendors` |
| Branches | `/api/v1/branches` |
| Locations | `/api/v1/locations` |
| Assets | `/api/v1/assets` |

List endpoints support `?page=&limit=&search=&status=` query parameters.

---

## Project Status

Actively in development. Auth, RBAC, and the core master-data + asset
management modules are complete and tested. Upcoming: allocation &
approval workflows, maintenance tracking, room/equipment booking with
conflict detection, reporting/export, notifications, and inventory audit
with QR/barcode support.

---

## License

MIT