import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

/**
 * Registers a new Noroff student account.
 * @param {string} name - The chosen profile name.
 * @param {string} email - A valid stud.noroff.no email address.
 * @param {string} password - The account password.
 * @returns {Promise<Object>} The registered user data.
 * @throws {Error} If registration fails.
 */
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
