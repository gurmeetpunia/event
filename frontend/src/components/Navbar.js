import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #eee",
        marginBottom: "2rem",
      }}
    >
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard" style={{ marginLeft: 16 }}>
            Dashboard
          </Link>
          {user.role === "organizer" && (
            <Link to="/create" style={{ marginLeft: 16 }}>
              Create Event
            </Link>
          )}
          <span style={{ marginLeft: 16 }}>
            {user.name} ({user.role})
          </span>
          <button onClick={handleLogout} style={{ marginLeft: 16 }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: 16 }}>
            Login
          </Link>
          <Link to="/register" style={{ marginLeft: 16 }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
