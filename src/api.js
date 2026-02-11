const BASE_URL = "https://cms-backend-2-6qmz.onrender.com";

export async function api(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Request failed");
  }

  if (response.status === 204) return null;

  return response.json();
}
