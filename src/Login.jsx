import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!user || !pass) {
      setErrorMsg("Please enter username and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });

      if (res.ok) {
        const data = await res.json();
        setErrorMsg("");
        nav("/home");
      } else {
        setErrorMsg("Invalid username or password.");
      }
    } catch (e) {
      setErrorMsg("Error connecting to backend.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>AgriConnect</h1>
        <p className="login-subtitle">
          Secure access to the agriculture platform
        </p>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

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

        <p style={{ marginTop: "20px", fontSize: "14px", cursor: "pointer", color: "#16a34a", fontWeight: "600" }} onClick={() => nav("/signup")}>
          Don't have an account? Sign up here
        </p>
      </div>
    </div>
  );
}