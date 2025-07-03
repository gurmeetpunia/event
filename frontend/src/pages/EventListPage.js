import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { getEvents, registerForEvent, unregisterFromEvent } from "../utils/api";

const EventListPage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registeringId, setRegisteringId] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    setRegisteringId(eventId);
    try {
      await registerForEvent(eventId, user.id, user.token);
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === eventId
            ? { ...ev, registrations: [...ev.registrations, user.id] }
            : ev
        )
      );
    } catch (err) {
      alert("Registration failed");
    } finally {
      setRegisteringId(null);
    }
  };
  const handleUnregister = async (eventId) => {
    setRegisteringId(eventId);
    try {
      await unregisterFromEvent(eventId, user.id, user.token);
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === eventId
            ? {
                ...ev,
                registrations: ev.registrations.filter((id) => id !== user.id),
              }
            : ev
        )
      );
    } catch (err) {
      alert("Unregistration failed");
    } finally {
      setRegisteringId(null);
    }
  };

  if (loading) return <div className="container">Loading events...</div>;
  if (error)
    return (
      <div className="container" style={{ color: "red" }}>
        {error}
      </div>
    );

  return (
    <div className="container">
      <h2>All Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event) => {
            const isRegistered =
              user &&
              event.registrations &&
              event.registrations.includes(user.id);
            return (
              <li
                key={event._id}
                style={{
                  marginBottom: 24,
                  padding: 16,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 1px 4px #eee",
                }}
              >
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <b>Date:</b> {new Date(event.date).toLocaleString()}
                </p>
                <p>
                  <b>Registrations:</b>{" "}
                  {event.registrations ? event.registrations.length : 0}
                </p>
                {user &&
                  user.role === "user" &&
                  (isRegistered ? (
                    <>
                      <span style={{ color: "green" }}>Registered</span>
                      <button
                        style={{ marginLeft: 16 }}
                        onClick={() => handleUnregister(event._id)}
                        disabled={registeringId === event._id}
                      >
                        {registeringId === event._id
                          ? "Unregistering..."
                          : "Unregister"}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRegister(event._id)}
                      disabled={registeringId === event._id}
                    >
                      {registeringId === event._id
                        ? "Registering..."
                        : "Register"}
                    </button>
                  ))}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EventListPage;
