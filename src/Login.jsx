import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (!user || !pass) {
      alert("Enter username and password");
      return;
    }
    nav("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>AgriConnect</h1>
        <p className="login-subtitle">
          Secure access to the agriculture platform
        </p>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}