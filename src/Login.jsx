import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailHint, setEmailHint] = useState("");

  const handleLogin = async () => {
    if (!user || !pass) {
      setErrorMsg("Please enter username and password.");
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
        if (data.status === "OTP_SENT") {
           setShowOtp(true);
           setEmailHint(data.email);
           setErrorMsg("");
        }
      } else {
        setErrorMsg("Invalid username or password.");
      }
    } catch (e) {
      setErrorMsg("Error connecting to backend.");
    }
  };

  const handleVerifyOtp = async () => {
     try {
       const res = await fetch("https://agriconnect-backend-production.up.railway.app/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user, otp: otp })
       });
       
       if (res.ok) {
          const data = await res.json();
          // SESSION MANAGER LOGIC
          sessionStorage.setItem("user", JSON.stringify(data));
          
          setErrorMsg("");
          if (data.role === "admin") nav("/admin");
          else nav("/home");
       } else {
          setErrorMsg("Invalid OTP Code.");
       }
     } catch (e) {
        setErrorMsg("Verification Error.");
     }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>AgriConnect Security</h1>
        <p className="login-subtitle">
          {showOtp ? `An OTP has been sent to ${emailHint}` : "Enter credentials to access platform"}
        </p>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        {!showOtp ? (
          <>
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
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter 6-Digit OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button style={{background: "#0284c7"}} onClick={handleVerifyOtp}>Verify Session</button>
          </>
        )}

        <p style={{ marginTop: "20px", fontSize: "14px", cursor: "pointer", color: "#16a34a", fontWeight: "600" }} onClick={() => nav("/signup")}>
          Don't have an account? Sign up here
        </p>
      </div>
    </div>
  );
}