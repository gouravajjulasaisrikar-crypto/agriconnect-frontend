import { useState, useEffect } from "react";

export default function Expert() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("questions");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedQ = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(storedQ);
  }, []);

  const handleAnswer = (id) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, answer: answers[id] } : q
    );

    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
  };

  const publishArticle = () => {
    if (!title || !category || !content) {
      alert("Fill all fields");
      return;
    }

    const articles = JSON.parse(localStorage.getItem("articles")) || [];

    const newArticle = {
      id: Date.now(),
      title,
      category,
      content
    };

    const updated = [newArticle, ...articles];

    localStorage.setItem("articles", JSON.stringify(updated));

    setTitle("");
    setCategory("");
    setContent("");

    alert("Article Published!");
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
              <h4>{q.question}</h4>
              <p>{q.category}</p>

              <input
                placeholder="Write answer..."
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
              />

              <button onClick={() => handleAnswer(q.id)}>
                Answer
              </button>

              {q.answer && (
                <p style={{ color: "green" }}>{q.answer}</p>
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