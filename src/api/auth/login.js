// loing function that is build before and is reused part of it
import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

/**
 * Logs in a registered user.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The authenticated user data.
 * @throws {Error} If login fails.
 */
export async function loginUser(email, password) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.auth.login}`;

  const response = await globalThis.fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to log in.";

    throw new Error(message);
  }

  return result.data;
}
