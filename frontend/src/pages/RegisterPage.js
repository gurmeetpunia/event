import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../utils/api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiRegister(name, email, password, role);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Name</label><br />
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Role</label><br />
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: "100%", padding: 8 }}>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 16 }}>Registration successful! Redirecting to login...</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
