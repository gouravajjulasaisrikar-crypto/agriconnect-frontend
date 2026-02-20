import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
      </div>

      <div className="container">
        <h2 className="title">Admin Dashboard</h2>

        <div className="card">
          <p>Admin manages platform content and user activities.</p>
        </div>
      </div>
    </>
  );
}

export default Admin;