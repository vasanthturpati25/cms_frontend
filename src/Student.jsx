import { useEffect, useState } from "react";
import { api } from "./api";

export default function Student() {
  const [complaints, setComplaints] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api("/api/complaints/").then(setComplaints);
  }, []);

  const addComplaint = async () => {
    await api("/api/complaints/", "POST", {
      title: "Complaint",
      category: "Other",
      description: text,
    });

    const updated = await api("/api/complaints/");
    setComplaints(updated);
    setText("");
  };

  const deleteComplaint = async (id) => {
    await api(`/api/complaints/${id}/`, "DELETE");
    setComplaints(complaints.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addComplaint}>Add Complaint</button>

      {complaints.map((c) => (
        <div key={c.id}>
          <strong>{c.title}</strong> - {c.status}
          {c.status === "open" && (
            <button onClick={() => deleteComplaint(c.id)}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
