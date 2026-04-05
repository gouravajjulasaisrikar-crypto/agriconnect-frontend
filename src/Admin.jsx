import { useState } from "react";

export default function Admin() {
  const [showResource, setShowResource] = useState(false);
  const [showInitiative, setShowInitiative] = useState(false);

  const [resource, setResource] = useState({
    title: "",
    type: "",
    category: "",
    description: ""
  });

  const [initiative, setInitiative] = useState({
    title: "",
    description: "",
    start: "",
    end: ""
  });

  const handleResource = () => {
    if (!resource.title) return alert("Enter title");
    alert("Resource Created!");
    setShowResource(false);
  };

  const handleInitiative = () => {
    if (!initiative.title) return alert("Enter title");
    alert("Initiative Created!");
    setShowInitiative(false);
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
        <div className="card">2,847<br />Total Farmers</div>
        <div className="card">156<br />Resources</div>
        <div className="card">12<br />Initiatives</div>
        <div className="card">354<br />Partners</div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="admin-actions">
        <button onClick={() => setShowResource(true)}>
          + Add New Resource
        </button>

        <button onClick={() => setShowInitiative(true)}>
          + Create Initiative
        </button>

        <button>Manage Users</button>
        <button>Generate Reports</button>
      </div>

      {/* RESOURCE MODAL */}
      {showResource && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add New Resource</h2>

            <input
              placeholder="Title"
              onChange={(e) =>
                setResource({ ...resource, title: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setResource({ ...resource, type: e.target.value })
              }
            >
              <option>Type</option>
              <option>Video</option>
              <option>Article</option>
            </select>

            <input
              placeholder="Category"
              onChange={(e) =>
                setResource({ ...resource, category: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              onChange={(e) =>
                setResource({ ...resource, description: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setShowResource(false)}>
                Cancel
              </button>
              <button onClick={handleResource}>
                Create Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INITIATIVE MODAL */}
      {showInitiative && (
        <div className="modal">
          <div className="modal-box">
            <h2>Create Initiative</h2>

            <input
              placeholder="Title"
              onChange={(e) =>
                setInitiative({ ...initiative, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              onChange={(e) =>
                setInitiative({
                  ...initiative,
                  description: e.target.value
                })
              }
            />

            <input
              type="date"
              onChange={(e) =>
                setInitiative({ ...initiative, start: e.target.value })
              }
            />

            <input
              type="date"
              onChange={(e) =>
                setInitiative({ ...initiative, end: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setShowInitiative(false)}>
                Cancel
              </button>
              <button onClick={handleInitiative}>
                Create Initiative
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}