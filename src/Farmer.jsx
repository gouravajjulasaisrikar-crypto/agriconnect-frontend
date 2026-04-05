import { useState, useEffect } from "react";

export default function Farmer() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [articles, setArticles] = useState([]);

  // Load stored data
  useEffect(() => {
    const storedQ = JSON.parse(localStorage.getItem("questions")) || [];
    const storedA = JSON.parse(localStorage.getItem("articles")) || [];

    setQuestions(storedQ);
    setArticles(storedA);
  }, []);

  // Ask Question
  const handleSubmit = () => {
    if (!question || !category) {
      alert("Fill all fields");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      question,
      category,
      answer: ""
    };

    const updated = [newQuestion, ...questions];

    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    setQuestion("");
    setCategory("");
  };

  return (
    <div className="farmer-page">

      {/* HEADER */}
      <div className="farmer-header">
        <h1>Welcome Farmer</h1>
        <p>Ask questions and explore expert knowledge</p>
      </div>

      {/* ASK QUESTION */}
      <div className="question-box">
        <h2>Ask a Question</h2>

        <input
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option>Crop</option>
          <option>Technology</option>
          <option>Market</option>
        </select>

        <button onClick={handleSubmit}>Submit Question</button>
      </div>

      {/* QUESTIONS */}
      <div className="questions-list">
        <h2>Your Questions</h2>

        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <h4>{q.question}</h4>
            <p>{q.category}</p>

            {q.answer ? (
              <p style={{ color: "green" }}>
                Answer: {q.answer}
              </p>
            ) : (
              <p style={{ color: "gray" }}>
                Waiting for expert answer...
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ARTICLES */}
      <div className="questions-list">
        <h2>Expert Articles</h2>

        {articles.map((a) => (
          <div key={a.id} className="question-card">
            <h4>{a.title}</h4>
            <p>{a.category}</p>
            <p>{a.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
}