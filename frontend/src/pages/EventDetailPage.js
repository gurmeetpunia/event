import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

const API_BASE = "http://localhost:5000"; // Should match your backend

const EventDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const data = await getEventById(id);
        setEvent(data);
        if (
          user &&
          data.registrations &&
          data.registrations.includes(user._id)
        ) {
          setRegistered(true);
        } else {
          setRegistered(false);
        }
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id, user]);

  const handleRegister = async () => {
    setRegistering(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user ? `Bearer ${user.token}` : undefined,
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!res.ok) throw new Error("Registration failed");
      setRegistered(true);
      setEvent((prev) => ({
        ...prev,
        registrations: [...prev.registrations, user._id],
      }));
    } catch (err) {
      setError("Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    setRegistering(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}/unregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user ? `Bearer ${user.token}` : undefined,
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!res.ok) throw new Error("Unregistration failed");
      setRegistered(false);
      setEvent((prev) => ({
        ...prev,
        registrations: prev.registrations.filter((uid) => uid !== user._id),
      }));
    } catch (err) {
      setError("Unregistration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="container">Loading event...</div>;
  if (error)
    return (
      <div className="container" style={{ color: "red" }}>
        {error}
      </div>
    );
  if (!event) return null;

  return (
    <div className="container">
      <h2>{event.title}</h2>
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
        (registered ? (
          <>
            <span style={{ color: "green" }}>Registered</span>
            <button
              style={{ marginLeft: 16 }}
              onClick={handleUnregister}
              disabled={registering}
            >
              {registering ? "Unregistering..." : "Unregister"}
            </button>
          </>
        ) : (
          <button onClick={handleRegister} disabled={registering}>
            {registering ? "Registering..." : "Register for this event"}
          </button>
        ))}
    </div>
  );
};

export default EventDetailPage;
