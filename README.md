# Event Management Dashboard

A full-stack event management platform where organizers can create and manage events, and users can browse and register for events. Features role-based dashboards, authentication, and real-time registration updates.

---

## Features

- **Role-based authentication** (organizer/user)
- **Organizer dashboard:**
  - Create, view, and manage your events
  - See registration counts for each event
- **User dashboard:**
  - Browse all events
  - Register/unregister for events
- **Protected routes** and role-based navigation
- **Real-time registration updates** (if backend supports it)
- **Clean, minimal UI**

---

## Project Structure

```
.
├── backend/
│   ├── controllers/      # Route handler logic
│   ├── middleware/       # Auth and other middleware
│   ├── models/           # Mongoose models (User, Event)
│   ├── routes/           # Express route definitions
│   └── server.js         # Express app entry point
│
├── frontend/
│   └── src/
│       ├── components/   # Navbar, EventCard, etc.
│       ├── pages/        # Login, Register, Dashboard, etc.
│       ├── contexts/     # AuthContext for global user state
│       ├── utils/        # API utility functions
│       ├── App.js        # Main app and routing
│       └── index.js      # Entry point
│
└── README.md             # This file
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### 1. Backend Setup

```bash
cd backend
npm install
# or
yarn install
```

- Create a `.env` file in `backend/` with:
  ```env
  JWT_SECRET=your_jwt_secret
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Start the backend:
  ```bash
  npm start
  # or
  yarn start
  ```

### 2. Frontend Setup

```bash
cd frontend
npm install
# or
yarn install
npm start
# or
yarn start
```

- The frontend runs at [http://localhost:3000](http://localhost:3000)
- The backend runs at [http://localhost:5000](http://localhost:5000)

---

## API Endpoints Used

- `POST /api/auth/login` — Login
- `POST /api/auth/register` — Register
- `GET /api/events` — List all events
- `POST /api/events` — Create event (organizer)
- `POST /api/events/:id/register` — Register for event (user)
- `POST /api/events/:id/unregister` — Unregister from event (user)

---

## User Journey

| User Type | Actions                                                                |
| --------- | ---------------------------------------------------------------------- |
| Organizer | Login → See own events → Create/Edit/Delete events → See registrations |
| User      | Login → Browse all events → View event details → Register/Unregister   |

---

## License

MIT
