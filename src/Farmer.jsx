import { useState, useEffect } from "react";

export default function Farmer() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  // POST question
  const handleSubmit = async () => {
    if (!question || !category) {
      alert("Fill all fields");
      return;
    }

    const newQuestion = {
      title: question,
      category: category,
      author: "Farmer",
    };

    try {
      const res = await fetch(
        "http://localhost:8080/questions",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setQuestions((prev) => [data, ...prev]);

      setQuestion("");
      setCategory("");

      alert("Submitted successfully");
    } catch (err) {
      console.log(err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="farmer-page">
      <div className="farmer-header">
        <h1>Welcome Farmer</h1>
        <p>Ask questions and explore expert knowledge</p>
      </div>

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

      <div className="questions-list">
        <h2>Your Questions</h2>

        {questions.map((q) => (
          <div key={q.id || q.title} className="question-card">
            <h4>{q.title}</h4>
            <p><strong>Category:</strong> {q.category}</p>
            <p><strong>Author:</strong> {q.author}</p>
            
            {q.answer && (
              <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e0f2fe", borderLeft: "4px solid #0284c7" }}>
                <strong>Expert Answer:</strong> {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>

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