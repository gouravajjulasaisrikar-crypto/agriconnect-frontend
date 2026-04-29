import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async () => {
    if (!user || !pass) {
      setErrorMsg("Please enter username and password.");
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      setErrorMsg("Incorrect security verification answer.");
      generateCaptcha();
      return;
    }

    try {
      const res = await fetch("https://agriconnect-backend-production.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });

      if (res.ok) {
        const data = await res.json();
        // SESSION MANAGER LOGIC
        sessionStorage.setItem("user", JSON.stringify(data));
        
        setErrorMsg("");
        if (data.role === "admin") nav("/admin");
        else nav("/home");
      } else {
        setErrorMsg("Invalid username or password.");
        generateCaptcha();
      }
    } catch (e) {
      setErrorMsg("Error connecting to backend.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>AgriConnect Security</h1>
        <p className="login-subtitle">
          Enter credentials to access platform
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
        
        <div style={{ marginTop: "15px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "10px", background: "#f1f5f9", borderRadius: "8px" }}>
            <span style={{ fontWeight: "bold", fontSize: "15px", color: "#334155" }}>Verify: What is {num1} + {num2}?</span>
            <input 
               type="text" 
               style={{ width: "80px", margin: "0", padding: "8px", textAlign: "center" }}
               placeholder="?"
               value={captchaAnswer}
               onChange={(e) => setCaptchaAnswer(e.target.value)}
            />
        </div>

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "20px", fontSize: "14px", cursor: "pointer", color: "#16a34a", fontWeight: "600" }} onClick={() => nav("/signup")}>
          Don't have an account? Sign up here
        </p>
      </div>
    </div>
  );
}
