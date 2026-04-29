import { useState, useEffect } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [questions, setQuestions] = useState([]); // fetched questions
  
  const [view, setView] = useState("dashboard");

  const loadData = async () => {
    try {
      const uRes = await fetch("https://agriconnect-backend-production.up.railway.app/users");
      setUsers(await uRes.json());
      
      const aRes = await fetch("https://agriconnect-backend-production.up.railway.app/articles");
      setArticles(await aRes.json());
      
      const qRes = await fetch("https://agriconnect-backend-production.up.railway.app/questions");
      setQuestions(await qRes.json());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
    try {
      await fetch(`https://agriconnect-backend-production.up.railway.app/users/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      console.log("Error deleting user");
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this article?")) return;
    try {
      await fetch(`https://agriconnect-backend-production.up.railway.app/articles/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      console.log("Error deleting article");
    }
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage platform content and oversee farmer engagement</p>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="card"><h1>{users.length}</h1>Total Users</div>
        <div className="card"><h1>{articles.length}</h1>Expert Articles</div>
        <div className="card"><h1>{questions.length}</h1>Total Questions</div>
        <div className="card"><h1>1</h1>System Status</div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="admin-actions">
        <button onClick={() => setView("dashboard")}>Dashboard Home</button>
        <button onClick={() => setView("users")}>Manage Users</button>
        <button onClick={() => setView("articles")}>Content Moderation</button>
      </div>

      {/* DYNAMIC VIEWS */}
      <div style={{ padding: "0 20px" }}>
        {view === "dashboard" && (
          <div>
            <h2>Welcome to the Admin Panel.</h2>
            <p>Select an action above to moderate users and content.</p>
          </div>
        )}

        {view === "users" && (
           <div>
             <h2>User Management</h2>
             <div className="grid">
               {users.map(u => (
                 <div key={u.id} className="card">
                    <h4>{u.username}</h4>
                    <p><strong>Role:</strong> {u.role}</p>
                    <button style={{ background: "#ef4444", marginTop: "10px" }} onClick={() => deleteUser(u.id)}>Ban Account</button>
                 </div>
               ))}
             </div>
           </div>
        )}

        {view === "articles" && (
           <div>
             <h2>Content Moderation</h2>
             <div className="grid">
               {articles.map(a => (
                 <div key={a.id} className="card">
                    <h4>{a.title}</h4>
                    <p><strong>Category:</strong> {a.category}</p>
                    <p style={{fontStyle: "italic"}}>{a.content.substring(0, 50)}...</p>
                    <button style={{ background: "#ef4444", marginTop: "10px" }} onClick={() => deleteArticle(a.id)}>Delete Article</button>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>

    </div>
  );
}
