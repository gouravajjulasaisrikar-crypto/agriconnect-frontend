import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Expert() {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    if (post !== "") {
      setPosts([...posts, post]);
      setPost("");
    }
  };

  return (
    <>
      <div className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
      </div>

      <div className="container">
        <h2 className="title">Expert Dashboard</h2>

        <div className="card">
          <input
            type="text"
            placeholder="Write educational content"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
          />

          <br /><br />

          <button className="btn" onClick={addPost}>
            Post
          </button>

          <ul style={{ marginTop: "20px" }}>
            {posts.map((p, index) => (
              <li key={index}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Expert;