import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Farmer() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const submitQuestion = () => {
    if (question !== "") {
      setQuestions([...questions, question]);
      setQuestion("");
    }
  };

  return (
    <>
      <div className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
      </div>

      <div className="container">
        <h2 className="title">Farmer Dashboard</h2>

        <div className="card">
          <input
            type="text"
            placeholder="Ask your farming question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
          />

          <br /><br />

          <button className="btn" onClick={submitQuestion}>
            Submit
          </button>

          <ul style={{ marginTop: "20px" }}>
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Farmer;