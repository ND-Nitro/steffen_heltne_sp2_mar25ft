import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function registerUser(name, email, password) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.auth.register}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      result.errors?.[0]?.message || "Unable to register account.";

    throw new Error(message);
  }

  return result.data;
}
