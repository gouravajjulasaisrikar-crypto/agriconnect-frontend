import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicPage() {
  const [articles, setArticles] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch("https://agriconnect-backend-production.up.railway.app/articles")
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      {/* HERO */}
      <div className="public-hero">
        <div className="public-overlay">
          <h1>Together We Can Build a Sustainable Future</h1>
          <p>
            Discover how farming shapes our world and learn about initiatives
            making a difference globally
          </p>
        </div>
      </div>

      {/* POWER SECTION */}
      <div className="public-section">
        <h2>The Power of Farming</h2>
        <p className="sub">
          Understanding the critical role agriculture plays
        </p>

        <div className="grid">
          <div className="card">🌱 Food for All</div>
          <div className="card">👥 Rural Livelihoods</div>
          <div className="card">❤️ Environmental Care</div>
          <div className="card">📈 Economic Growth</div>
        </div>
      </div>

      {/* INITIATIVES */}
      <div className="public-section">
        <h2>Active Initiatives</h2>

        <div className="grid">
          <div className="card">
            <h4>Sustainable Agriculture</h4>
            <p>Eco-friendly farming across villages</p>
          </div>

          <div className="card">
            <h4>Global Food Security</h4>
            <p>Connecting farmers to markets</p>
          </div>

          <div className="card">
            <h4>Farmer Education</h4>
            <p>Training programs for farmers</p>
          </div>

          <div className="card">
            <h4>Innovation Support</h4>
            <p>Funding new farming ideas</p>
          </div>
        </div>
      </div>

      {/* IMPACT */}
      <div className="impact">
        <div>2,847<br />Farmers Trained</div>
        <div>156<br />Resources</div>
        <div>500+<br />Villages</div>
        <div>40%<br />Growth</div>
      </div>

      {/* ARTICLES */}
      <div className="public-section">
        <h2>Expert Articles</h2>

        <div className="grid">
          {articles.map((a) => (
            <div key={a.id} className="card">
              <h4>{a.title}</h4>
              <p>{a.category}</p>
              <p>{a.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2>Get Involved</h2>
        <button onClick={() => nav("/signup")}>Join as Farmer</button>
        <button className="secondary" onClick={() => nav("/signup")}>Become Expert</button>
      </div>

    </div>
  );
}