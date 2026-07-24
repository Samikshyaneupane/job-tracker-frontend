const STATUS_COLORS = {
  Applied: "#dce4f0",
  OA: "#d8e8f0",
  Interview: "#faedc4",
  Offer: "#c9e8d4",
  Rejected: "#fadde0",
};

const ApplicationItem = ({ app, onEdit, onDelete }) => {
  return (
    <div className="app-item">
      <div className="app-item-main">
        <div>
          <h4>{app.role}</h4>
          <p className="company">{app.company}</p>
        </div>
        <span
          className="status-badge"
          style={{ backgroundColor: STATUS_COLORS[app.status] }}
        >
          {app.status}
        </span>
      </div>
      <div className="app-item-meta">
        <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
        {app.jobLink && (
          <a href={app.jobLink} target="_blank" rel="noopener noreferrer">
            View posting
          </a>
        )}
      </div>
      {app.notes && <p className="notes">{app.notes}</p>}
      <div className="app-item-actions">
        <button onClick={() => onEdit(app)}>Edit</button>
        <button className="danger" onClick={() => onDelete(app._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationItem;
