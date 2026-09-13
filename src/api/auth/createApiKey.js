import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

/**
 * Creates a Noroff API key for an authenticated user.
 * @param {string} accessToken - The user's access token.
 * @returns {Promise<Object>} The created API key data.
 * @throws {Error} If the API request fails.
 */
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
