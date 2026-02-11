import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./api";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();

    // Login
    const data = await api("/api/auth/login/", "POST", form);

    // Save token
    localStorage.setItem("token", data.access);

    // Fetch user info
    const me = await api("/api/auth/me/");

    const userData = {
      username: me.username,
      role: me.role,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    navigate(me.role === "admin" ? "/admin" : "/student");
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

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

      <button>Login</button>
    </form>
  );
}
