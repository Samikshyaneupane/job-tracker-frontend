import { useState, useEffect } from "react";

const STATUS_OPTIONS = ["Applied", "OA", "Interview", "Offer", "Rejected"];

const ApplicationForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: new Date().toISOString().slice(0, 10),
    jobLink: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        company: initialData.company || "",
        role: initialData.role || "",
        status: initialData.status || "Applied",
        appliedDate: initialData.appliedDate
          ? initialData.appliedDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        jobLink: initialData.jobLink || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="appliedDate"
        value={form.appliedDate}
        onChange={handleChange}
      />
      <input
        type="url"
        name="jobLink"
        placeholder="Job link (optional)"
        value={form.jobLink}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit">{initialData ? "Update" : "Add"} Application</button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ApplicationForm;
