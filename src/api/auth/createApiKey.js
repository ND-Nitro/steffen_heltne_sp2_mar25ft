import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function createApiKey(accessToken) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.auth.apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Blackmarket Inc",
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to create API key.";

    throw new Error(message);
  }

  return result.data.key;
}
