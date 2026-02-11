import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const submit = async (e) => {
    e.preventDefault();

    await api("/api/auth/register/", "POST", form);

    navigate("/login");
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        required
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>

      <button>Register</button>
    </form>
  );
}
