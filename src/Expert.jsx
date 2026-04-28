import { useState, useEffect } from "react";

export default function Expert() {
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  const [answers, setAnswers] = useState({});

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

  const submitAnswer = async (id) => {
    const ans = answers[id];
    if (!ans) return alert("Write an answer first");
    
    try {
      const res = await fetch(`https://agriconnect-backend-production.up.railway.app/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: ans })
      });
      
      if (res.ok) {
        alert("Answer submitted successfully!");
        setQuestions(questions.map(q => q.id === id ? { ...q, answer: ans } : q));
      }
    } catch (e) {
      console.log(e);
      alert("Failed to connect to backend");
    }
  };

  const publishArticle = async () => {
    if (!title || !category || !content) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("https://agriconnect-backend-production.up.railway.app/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content })
      });
      
      if (res.ok) {
        alert("Article Published to Database!");
        setTitle("");
        setCategory("");
        setContent("");
      }
    } catch (e) {
      console.log(e);
      alert("Error connecting to backend");
    }
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

          {questions.map((q) => (
            <div key={q.id} className="question-card">
              <h4>{q.title}</h4>
              <p><strong>Category:</strong> {q.category}</p>
              <p><strong>Author:</strong> {q.author}</p>
              
              {q.answer ? (
                <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e0f2fe", borderRadius: "8px" }}>
                  <strong>Your Answer:</strong> {q.answer}
                </div>
              ) : (
                <div style={{ marginTop: "15px" }}>
                  <input
                    type="text"
                    placeholder="Type your expert answer..."
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    style={{ width: "70%", padding: "8px", marginRight: "10px" }}
                  />
                  <button onClick={() => submitAnswer(q.id)}>Submit Answer</button>
                </div>
              )}
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