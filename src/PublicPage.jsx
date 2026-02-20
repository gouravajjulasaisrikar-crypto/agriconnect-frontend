import { useNavigate } from "react-router-dom";

function PublicPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
      </div>

      <div className="container">
        <h2 className="title">Public Page</h2>

        <div className="card">
          <p>
            Explore farming awareness, sustainability initiatives,
            and agricultural innovations.
          </p>
        </div>
      </div>
    </>
  );
}

export default PublicPage;