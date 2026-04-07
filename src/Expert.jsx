import { useState, useEffect } from "react";

export default function Expert() {
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // GET questions from backend
  useEffect(() => {
    fetch("https://agriconnect-backend-production.up.railway.app/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.log(err));
  }, []);

  const publishArticle = () => {
    if (!title || !category || !content) {
      alert("Fill all fields");
      return;
    }

    alert("Article Published (UI only)");

    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <div className="farmer-page">

      <div className="farmer-header" style={{ background: "#2563eb" }}>
        <h1>Expert Dashboard</h1>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("questions")}>Questions</button>
        <button onClick={() => setActiveTab("contribute")}>Contribute</button>
      </div>

      {/* QUESTIONS TAB */}
      {activeTab === "questions" && (
        <div>
          <h2>Farmer Questions</h2>

          {questions.map((q, index) => (
            <div key={index} className="question-card">
              <h4>{q.title}</h4>
              <p>{q.category}</p>
              <p>{q.author}</p>
            </div>
          ))}
        </div>
      )}

      {/* CONTRIBUTE TAB */}
      {activeTab === "contribute" && (
        <div className="question-box">
          <h2>Publish Article</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Crop</option>
            <option>Technology</option>
            <option>Market</option>
          </select>

          <textarea
            placeholder="Write content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={publishArticle}>Publish</button>
        </div>
      )}
    </div>
  );
}