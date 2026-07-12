# AssetFlow — Enterprise Asset & Resource Management System

Continuation of your existing AssetFlow backend, now with a working React
client and deployment configs added. Architecture, tech stack, and naming
conventions follow your original codebase (Controller → Service →
Repository → Prisma, Clean Architecture folders).

**Read this whole file before assuming "done."** The honest-scope section
at the bottom tells you exactly what's real vs. what's still missing.

---

## What's real and working in this drop

### Server (`/server`)

Verified: `npm install` succeeds, all source files pass `node --check`
(syntax-valid), Prisma schema was hand-reviewed for consistency. Prisma
Client generation itself could not be run in this sandbox — the engine
binary download is blocked by network policy here (`binaries.prisma.sh` is
not on the allowed domain list). **Run `npx prisma generate` yourself
before first use** — if there's a schema error, it'll tell you immediately.

**Commits 1–4 (already existed, from your repo):**
- Express setup, PostgreSQL + Prisma, Organization/Department/Employee/
  Role/User schema, JWT auth, bcrypt, RBAC, validation

**Bugs fixed in your existing code (not rewrites — just fixes):**
1. `auth.routes.js` had `export default router;` before the `/login` and
   `/profile` route declarations — they were dead code, never registered.
2. `admin.routes.js` used an `authorize` middleware that didn't exist, and
   the router was never mounted in `app.js`.
3. JWT payload only had `roleId`, so `authorize()` had nothing to check —
   `auth.repository.js` now includes the `role` relation and the token
   carries `roleName`.
4. `.env.example` was missing `DATABASE_URL`, `JWT_SECRET`, and
   `JWT_EXPIRES_IN` entirely — the app would not have booted with it as-is.

**Commit 5 — Master Data (new, full CRUD each):**
- Asset Categories (parent/child hierarchy)
- Vendors
- Branches

**Commit 6 — Core Asset Management (new, full CRUD):**
- Locations (Building/Floor/Room/Rack/Shelf, linked to Branch)
- Assets (asset number, serial number, category, vendor, branch, location,
  purchase cost/date, warranty, depreciation rate, status, image/document
  URL fields, soft delete)
- Asset History (auto-logged CREATED / UPDATED / RETIRED entries)

Every module above follows the same layered pattern: Validator →
Controller → Service → Repository → Routes, with pagination, search, and
soft delete, RBAC-gated on mutating routes (`ADMIN` role required).

### Client (`/client`)

A real Vite + React 19 + Tailwind + Redux Toolkit + TanStack Query app —
**verified to actually build** (`npm run build` succeeds, output in
`dist/`). Not a mockup.

- Login / Register pages wired to your real `/api/v1/auth` endpoints
- JWT stored in `localStorage`, attached via axios interceptor, auto-logout
  on 401
- Protected routing (`react-router-dom`)
- Dashboard shell with sidebar, dark-mode-ready Tailwind tokens
- Dashboard page with **live** KPI cards (asset/category/vendor/branch
  counts pulled from your real APIs — not fake numbers)
- Full CRUD UI (list + search + create/edit modal + delete) for:
  Categories, Vendors, Branches, Locations, Assets — all using a shared
  `MasterDataPage` component driven by config, so it's not four copies of
  near-identical code

**Known frontend gap:** the Branch/Location/Asset forms ask for raw IDs
(`organizationId`, `categoryId`, `vendorId`, etc.) as plain text inputs,
not searchable dropdowns — because there's no Organization list endpoint
yet and no dedicated "pick a category" UI. Functional, not polished.

### Deployment

- `server/Dockerfile` — multi-stage, runs `prisma migrate deploy` on boot
- `client/Dockerfile` + `client/nginx.conf` — builds the Vite app, serves
  via nginx with SPA fallback routing
- `docker-compose.yml` at the repo root — spins up Postgres + server +
  client together for local full-stack testing
- `render.yaml` — Render blueprint for the backend (swap the `DATABASE_URL`
  block for your Neon connection string if you're not using Render's
  managed Postgres)
- `client/vercel.json` — Vercel SPA rewrite config
- `.github/workflows/ci.yml` — installs deps, generates Prisma client,
  smoke-loads the Express app module, and builds the client on every push/PR

---

## Run locally (without Docker)

```bash
# Server
cd server
npm install
cp .env.example .env      # fill in DATABASE_URL, JWT_SECRET
npx prisma migrate dev
npm run dev                # http://localhost:5000

# Client (separate terminal)
cd client
npm install
cp .env.example .env       # VITE_API_BASE_URL, defaults to localhost:5000
npm run dev                 # http://localhost:5173
```

## Run locally (with Docker)

```bash
docker compose up --build
# server → http://localhost:5000
# client → http://localhost:8080
```

## API reference (new endpoints in this drop)

All require `Authorization: Bearer <token>`; mutating routes also require
`ADMIN` role.

| Method | Route | Notes |
|---|---|---|
| POST/GET/PUT/DELETE | `/api/v1/asset-categories[/:id]` | supports `parentId` for hierarchy |
| POST/GET/PUT/DELETE | `/api/v1/vendors[/:id]` | |
| POST/GET/PUT/DELETE | `/api/v1/branches[/:id]` | requires `organizationId` |
| POST/GET/PUT/DELETE | `/api/v1/locations[/:id]` | requires `branchId` |
| POST/GET/PUT/DELETE | `/api/v1/assets[/:id]` | full asset lifecycle, auto history log |

List endpoints accept `?page=&limit=&search=&status=` query params.

---

## ⚠️ Honest scope — what's still NOT built

Your original spec asked for all 20 modules, finished, in one response.
That's genuinely weeks of engineering. Here's exactly what's outstanding:

- **Employee module** (search/filter/pagination UI — schema already exists)
- **Asset Allocation** (assign/return/transfer, approval flow)
- **Maintenance** (requests, AMC, service history, cost tracking)
- **Meeting Room / Vehicle / Equipment Booking** with conflict detection
- **Reports** (CSV/PDF export, analytics charts)
- **Notifications** (email via Nodemailer, in-app, activity logs)
- **Audit module** (inventory audit, QR/barcode)
- **Admin Settings** (roles/permissions UI, system settings)
- **Swagger/OpenAPI docs**
- **Database seeder**
- **Cloudinary image upload** (Asset model has `imageUrl`/`documentUrl`
  fields ready, but no Multer/Cloudinary upload endpoint yet)
- **Socket.io real-time features**
- Organization CRUD API (needed to make the Branch form's org picker a
  real dropdown instead of a raw ID field)

Tell me which one to build next and I'll continue in the same
fully-real, no-placeholder style — one solid module at a time.
