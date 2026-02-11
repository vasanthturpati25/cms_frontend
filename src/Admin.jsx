import { useEffect, useState } from "react";
import { api } from "./api";

export default function Admin() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api("/api/complaints/").then(setComplaints);
  }, []);

  const closeComplaint = async (id) => {
    await api(`/api/complaints/${id}/`, "PUT", {
      status: "closed",
    });

    const updated = await api("/api/complaints/");
    setComplaints(updated);
  };

  const deleteComplaint = async (id) => {
    await api(`/api/complaints/${id}/`, "DELETE");

    setComplaints(complaints.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {complaints.map((c) => (
        <div key={c.id}>
          <strong>{c.title}</strong> - {c.status}

          {c.status === "open" && (
            <button onClick={() => closeComplaint(c.id)}>
              Close
            </button>
          )}

          <button onClick={() => deleteComplaint(c.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
