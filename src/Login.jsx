import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">AgriConnect</h1>
      <h3 className="subtitle">Select Your Role</h3>

      <div className="card">
        <button className="btn" onClick={() => navigate("/farmer")}>
          Farmer
        </button>

        <button className="btn" onClick={() => navigate("/expert")}>
          Expert
        </button>

        <button className="btn" onClick={() => navigate("/admin")}>
          Admin
        </button>

        <button className="btn" onClick={() => navigate("/public")}>
          Public
        </button>
      </div>
    </div>
  );
}

export default Login;