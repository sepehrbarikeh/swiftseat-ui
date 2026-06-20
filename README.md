# SwiftSeat UI

A polished event ticketing UI built with Next.js, React Query, Tailwind CSS, and Axios. This frontend connects to a backend API to support public browsing, seat selection, ticket validation, and a complete admin workflow for event management.

## What’s Included

- Public event discovery with filtering, infinite scrolling, and responsive cards
- Seat picker for selecting multiple seats and reserving them
- Authentication flows: register and login
- Ticket history page for authenticated users
- Admin portal to create, update, delete, and manage events
- Ticket validation and role management for admins
- Shared API layer with authenticated requests via cookies
- React Query for client-side caching and mutation handling

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- @tanstack/react-query v5
- Axios
- Formik + Yup
- react-toastify
- universal-cookie

## Project Structure

- `app/`
  - `page.tsx` — homepage
  - `events/page.tsx` — public event listing with infinite loading and filters
  - `events/[id]/page.tsx` — seat picker / reservation flow
  - `events/[id]/[code]/page.tsx` — ticket confirmation page
  - `auth/login/page.tsx` — login form
  - `auth/register/page.tsx` — sign-up form
  - `admin/page.tsx` — admin dashboard
  - `my-tickets/page.tsx` — ticket history
- `src/components/` — reusable UI components
- `src/helper/callApi.tsx` — Axios instance with auth token interceptor and 401 handling
- `src/service/` — API service wrappers for public and admin endpoints
- `src/types/` — typed data models for events, seats, users, tickets

## Setup

### Requirements

- Node.js 20+
- npm (or yarn / pnpm)
- Backend server running at `http://localhost:8080/api`

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`

## Important Routes

- `/` — Home page
- `/events` — Browse events
- `/events/[id]` — Seat reservation
- `/events/[id]/[code]` — Ticket confirmation
- `/auth/login` — Login
- `/auth/register` — Register
- `/my-tickets` — Ticket history
- `/admin` — Admin dashboard

## Backend API Expectations

The frontend is built against a backend API mounted at `http://localhost:8080/api`.
Key endpoints:

- `GET /` — fetch homepage concerts
- `GET /events` — list events with pagination and filters
- `GET /events/:id/seats` — load seat map
- `POST /seats/reserve` — reserve seats
- `POST /seats/confirm-payment` — confirm payment
- `GET /tickets/validate/:ref` — validate a ticket reference
- `GET /events/all` — admin events list
- `POST /events` — create event (multipart/form-data)
- `PUT /events/:id` — update event (multipart/form-data)
- `DELETE /events/:id` — delete event
- `POST /users/:id/role` — change user role

## Admin Workflow

The admin dashboard supports:

- pagination for events
- create / update event form
- delete event
- ticket validation
- change user role

### Payload requirements for event creation/update

- `title`
- `description`
- `location`
- `start_time` — ISO timestamp
- `rows`
- `seats_per_row`
- `total_seats`
- `image` — optional file upload

## Authentication

- `/auth/login` — login page
- `/auth/register` — registration page
- Auth token is stored in cookies and added to Axios requests automatically
- 401 responses remove the token and redirect to `/auth/login`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Troubleshooting

- If `invalid data format` appears during create/update, verify the backend accepts `multipart/form-data` and `start_time` is a valid ISO timestamp.
- If login redirects fail, confirm the backend returns a token and role field.
- If events don’t load, make sure the backend is reachable at `http://localhost:8080/api`.

## Recommended Improvements

- add better admin auth gating
- add server-side validation error display
- add React Query DevTools for development
- support image preview before upload

## Contribution

1. Fork the repo
2. Create a branch
3. Add a feature or fix
4. Submit a pull request

---

Built for modern event ticketing with a strong admin backend workflow.
