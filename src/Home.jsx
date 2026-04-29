import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <div className="nav">
        <h2>🌱 AgriConnect</h2>
        <span>Empowering Farmers, Nurturing Future</span>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>Empowering Farmers, Strengthening Communities</h1>
          <p>
            Join our platform to access resources, connect with experts,
            and build a sustainable future for agriculture.
          </p>

          <div className="hero-buttons">
            <button onClick={() => nav("/farmer")}>Farmer</button>
            <button onClick={() => nav("/expert")}>Expert</button>
            <button onClick={() => nav("/admin")}>Admin</button>
            <button onClick={() => nav("/public")}>Public</button>
          </div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="why">
        <h2>Why Farming Matters</h2>
        <p className="why-sub">
          Farming is the backbone of our society, providing food security,
          employment, and sustainability for future generations
        </p>

        <div className="why-grid">
          <div className="why-card">
            <h3>🌱 Food Security</h3>
            <p>Ensures stable food supply worldwide</p>
          </div>

          <div className="why-card">
            <h3>👥 Employment</h3>
            <p>Supports global livelihoods</p>
          </div>

          <div className="why-card">
            <h3>📈 Economic Growth</h3>
            <p>Contributes to GDP and development</p>
          </div>

          <div className="why-card">
            <h3>❤️ Sustainability</h3>
            <p>Protects environment for future generations</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div>
          <h2>570M+</h2>
          <p>Farmers Worldwide</p>
        </div>

        <div>
          <h2>38%</h2>
          <p>Global Employment</p>
        </div>

        <div>
          <h2>$3.6T</h2>
          <p>Market Value</p>
        </div>

        <div>
          <h2>8B+</h2>
          <p>People Fed Daily</p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <h2>Platform Features</h2>

        <div className="feature-grid">
          <div className="feature-card crop">
            <div className="overlay-text">
              <h3>Crop Advisory</h3>
              <p>AI-based farming suggestions</p>
            </div>
          </div>

          <div className="feature-card market">
            <div className="overlay-text">
              <h3>Market Insights</h3>
              <p>Real-time price tracking</p>
            </div>
          </div>

          <div className="feature-card weather">
            <div className="overlay-text">
              <h3>Weather Updates</h3>
              <p>Accurate forecasts</p>
            </div>
          </div>

          <div className="feature-card expert">
            <div className="overlay-text">
              <h3>Expert Connect</h3>
              <p>Connect with professionals</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2026 AgriConnect • Smart Farming Platform
      </div>
    </>
  );
}
