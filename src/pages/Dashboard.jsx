import { useState, useEffect, useCallback } from "react";
import {
  getApplications,
  getStats,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../api/applications";
import { useAuth } from "../context/AuthContext";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationItem from "../components/ApplicationItem";
import StatusChart from "../components/StatusChart";

const STATUS_FILTERS = ["All", "Applied", "OA", "Interview", "Offer", "Rejected"];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = filter !== "All" ? { status: filter } : {};
      const [appsRes, statsRes] = await Promise.all([
        getApplications(params),
        getStats(),
      ]);
      setApplications(appsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = async (formData) => {
    try {
      await createApplication(formData);
      setShowForm(false);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add application");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateApplication(editingApp._id, formData);
      setEditingApp(null);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update application");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete application");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Job Application Tracker</h1>
        <div>
          <span className="username">Hi, {user?.name}</span>
          <button className="secondary" onClick={logout}>
            Log Out
          </button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <section className="stats-section">
        <h3>Overview</h3>
        <StatusChart stats={stats} />
      </section>

      <section className="controls">
        <div className="filters">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={filter === s ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className="primary"
          onClick={() => {
            setEditingApp(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "+ Add Application"}
        </button>
      </section>

      {showForm && (
        <ApplicationForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      )}

      {editingApp && (
        <ApplicationForm
          initialData={editingApp}
          onSubmit={handleUpdate}
          onCancel={() => setEditingApp(null)}
        />
      )}

      <section className="applications-list">
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p className="empty-state">No applications match this filter.</p>
        ) : (
          applications.map((app) => (
            <ApplicationItem
              key={app._id}
              app={app}
              onEdit={(a) => {
                setEditingApp(a);
                setShowForm(false);
              }}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Dashboard;
