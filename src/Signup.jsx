import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("farmer"); // default
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    if (!user || !email || !pass) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, email: email, password: pass, role: role })
      });

      if (res.ok) {
        alert("Account created successfully!");
        nav("/");
      } else {
        setErrorMsg("Username already exists.");
      }
    } catch (e) {
      setErrorMsg("Error connecting to backend");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>
        <p className="login-subtitle">Join the AgriConnect community</p>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc", outline: "none", cursor: "pointer" }}>
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSignup}>Sign Up</button>

        <p style={{ marginTop: "20px", fontSize: "14px", cursor: "pointer", color: "#16a34a", fontWeight: "600" }} onClick={() => nav("/")}>
          Already have an account? Log in here
        </p>
      </div>
    </div>
  );
}
