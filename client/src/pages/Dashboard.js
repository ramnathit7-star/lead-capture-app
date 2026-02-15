import { useEffect, useState } from "react";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(stored);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  const total = leads.length;
  const success = leads.filter(l => l.webhookStatus === "success").length;
  const failed = leads.filter(l => l.webhookStatus === "failed").length;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="p-3 shadow-lg rounded">
          Lead Dashboard
        </h3>

        <button
          className="btn btn-outline-secondary"
          onClick={toggleTheme}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card dashboard-card bg-primary text-white p-4 shadow">
            <h6>Total Leads</h6>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card dashboard-card bg-success text-white p-4 shadow">
            <h6>Webhook Success</h6>
            <h2>{success}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card dashboard-card bg-danger text-white p-4 shadow">
            <h6>Webhook Failed</h6>
            <h2>{failed}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
