import { API_BASE_URL } from "../config/apiurl";

export async function registerRequest(data) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      ok: false,
      field: json.field || "email",
      message: json.error || "Error al registrarse",
    };
  }

  return { ok: true };
}


export async function loginRequest(data) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      ok: false,
      field: "email",
      message: json.error || "Credenciales inválidas",
    };
  }

  return {
    ok: true,
    accessToken: json.accessToken,
    refreshToken: json.refreshToken,
    user: json.user,
  };
}


export async function getMe(token) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) throw new Error("Request failed");

  return res.json();
}


export async function refreshAccessToken(refreshToken) {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Refresh failed");
  }

  return json.accessToken;
}


export async function logoutRequest(refreshToken) {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });
}