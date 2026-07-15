# 🧭 TrailNest — Curated Travel Experience & Tour Booking Platform

TrailNest is a full-stack MERN + TypeScript application that lets travelers discover, filter, and reserve curated tours, while allowing organizers to list and manage their own travel experiences. Built as a production-style project demonstrating authentication, role-based authorization, RESTful API design, and modern responsive UI/UX practices.

---

## 🌐 Live Links

- **Live Client (Vercel):** https://travel-tour-client-omega.vercel.app
- **Live Server (Render):** https://traveltour-server.onrender.com
- **Client Repository:** https://github.com/Nishat-Annan-Mim/TravelTour-client
- **Server Repository:** https://github.com/Nishat-Annan-Mim/TravelTour-server

---

## 🔑 Demo Credentials

| Role  | Email               | Password   |
| ----- | ------------------- | ---------- |
| User  | demo@trailnest.com  | demo12345  |
| Admin | admin@trailnest.com | admin12345 |

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4** + **DaisyUI**
- **Framer Motion** — hero slider and section animations
- **Recharts** — data visualization (stats/booking charts)
- **React Hook Form + Zod** — form handling and validation
- **Lucide React** — icon system
- **Axios** — API client with JWT interceptor
- **Google Identity Services** — Google Sign-In

### Backend

- **Node.js + Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)** — authentication
- **bcryptjs** — password hashing
- **cors, cookie-parser, dotenv** — middleware & config

### Deployment

- **Client:** Vercel
- **Server:** Render
- **Database:** MongoDB Atlas

---

## ✨ Features

### Public

- Fully responsive landing page with animated hero slider
- 8+ landing sections: Hero, Categories, Featured Tours, How It Works, Stats (with Recharts bar chart), Testimonials, FAQ, Newsletter, CTA
- Explore page with live search, multi-field filtering (category, price range, rating), sorting, and pagination
- Skeleton loaders during data fetch
- Public tour details page: image gallery, overview, key info, reviews, related tours

### Authentication & Authorization

- Email/password registration and login with validation
- Show/hide password toggle
- Google Sign-In (Google Identity Services)
- Demo login button (auto-fills and logs in with demo credentials)
- JWT-based session handling
- Role-based access control (`user` vs `admin`)

### Protected (Logged-in Users)

- **Add Tour** (`/items/add`) — create a new tour listing
- **Manage Tours** (`/items/manage`) — view, inspect, and delete your own listings (admins see and manage all listings platform-wide)
- **My Bookings** (`/bookings/my`) — view and cancel reserved tours
- Leave star ratings and written reviews on tours

### Admin-Only Capabilities

- View and manage all tours (not just their own)
- Delete or update any tour, review, or booking
- View bookings for any tour on the platform
- "Admin" badge shown in the navbar

### Additional Pages

- About
- Contact (with working form)
- FAQ

---

## 🗂️ Project Structure

trailnest/
├── client/ # Next.js frontend
│ └── src/
│ ├── app/ # App Router pages
│ ├── components/ # Reusable UI components
│ ├── context/ # Auth context (global state)
│ └── lib/ # API client, TypeScript types
└── server/ # Express backend
└── src/
├── config/ # Database connection
├── models/ # Mongoose schemas
├── controllers/ # Route logic
├── routes/ # Express routers
├── middleware/ # Auth & authorization guards
└── utils/ # JWT helper, seed script

---

## 📡 API Overview

| Method | Endpoint                     | Access                      | Description                                 |
| ------ | ---------------------------- | --------------------------- | ------------------------------------------- |
| POST   | `/api/auth/register`         | Public                      | Register new user                           |
| POST   | `/api/auth/login`            | Public                      | Login with email/password                   |
| POST   | `/api/auth/google`           | Public                      | Login/register via Google                   |
| GET    | `/api/auth/me`               | Protected                   | Get current logged-in user                  |
| GET    | `/api/tours`                 | Public                      | List tours (search, filter, sort, paginate) |
| GET    | `/api/tours/:id`             | Public                      | Get single tour                             |
| GET    | `/api/tours/:id/related`     | Public                      | Get related tours                           |
| POST   | `/api/tours`                 | Protected                   | Create a tour                               |
| PUT    | `/api/tours/:id`             | Protected (owner/admin)     | Update a tour                               |
| DELETE | `/api/tours/:id`             | Protected (owner/admin)     | Delete a tour                               |
| GET    | `/api/tours/my/listings`     | Protected                   | Get own tours (all tours if admin)          |
| POST   | `/api/bookings`              | Protected                   | Reserve a spot on a tour                    |
| GET    | `/api/bookings/my`           | Protected                   | Get own bookings                            |
| DELETE | `/api/bookings/:id`          | Protected (owner/admin)     | Cancel a booking                            |
| GET    | `/api/bookings/tour/:tourId` | Protected (organizer/admin) | View bookings for a tour                    |
| GET    | `/api/reviews/tour/:tourId`  | Public                      | Get reviews for a tour                      |
| POST   | `/api/reviews`               | Protected                   | Submit a review                             |
| DELETE | `/api/reviews/:id`           | Protected (owner/admin)     | Delete a review                             |

---

## ⚙️ Getting Started Locally

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas connection string

### 1. Clone both repositories

```bash
git clone https://github.com/Nishat-Annan-Mim/TravelTour-client.git client
git clone https://github.com/Nishat-Annan-Mim/TravelTour-server.git server
```

### 2. Server setup

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```dotenv
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
BETTER_AUTH_BASE_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

Run the server:

```bash
npm run dev
```

### 3. Seed demo data (optional but recommended)

```bash
npm run seed
```

This creates a demo user, a demo admin, and 4 sample tours.

### 4. Client setup

```bash
cd client
npm install
```

Create a `.env.local` file in `client/` with:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
MONGO_URI=your_mongodb_connection_string
```

Run the client:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`, with the API running at `http://localhost:5000`.

---

## 🎨 Design System

- **Primary Color:** Teal `#0D9488`
- **Secondary Color:** Orange `#F97316`
- **Neutral Color:** Dark Gray `#1F2937`
- Consistent card sizing, border radius, and spacing across all listing/grid views
- Fully responsive across mobile, tablet, and desktop breakpoints

---
