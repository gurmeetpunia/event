const API_BASE = "http://localhost:5000"; // Change to your backend URL

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(name, email, password, role) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${API_BASE}/api/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/api/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

export async function createEvent(event, token) {
  const res = await fetch(`${API_BASE}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event)
  });
  if (!res.ok) throw new Error("Event creation failed");
  return res.json();
}

export async function registerForEvent(eventId, userId, token) {
  const res = await fetch(`${API_BASE}/api/events/${eventId}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function unregisterFromEvent(eventId, userId, token) {
  const res = await fetch(`${API_BASE}/api/events/${eventId}/unregister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error("Unregistration failed");
  return res.json();
}

// Add more API functions as needed 