import React, { useEffect, useState } from "react";
import EventListPage from "./EventListPage";

function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token and user info in localStorage
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("user");
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Top right corner auth buttons or welcome */}
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button style={{ marginLeft: 12 }} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button style={{ marginLeft: 8 }}>Register</button>
            </a>
          </>
        )}
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 60 }}>
        <h2 style={{ textAlign: "center" }}>Events</h2>
        <EventListPage />
      </div>
    </div>
  );
}

export default DashboardPage;
