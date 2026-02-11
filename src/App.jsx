import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Student from "./Student";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute user={user} role="student">
            <Student />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} role="admin">
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
