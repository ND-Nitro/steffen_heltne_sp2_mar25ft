import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

/**
 * Updates the authenticated user's profile.
 * @param {string} username - The profile name.
 * @param {Object} profileData - Bio, avatar and banner data.
 * @returns {Promise<Object>} The updated profile.
 * @throws {Error} If the update fails.
 */
export async function updateProfile(username, profileData) {
  const accessToken = window.localStorage.getItem("accessToken");
  const apiKey = window.localStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    throw new Error("You must be logged in to update your profile.");
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.auction.profiles}/${username}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to update profile.";

    throw new Error(message);
  }

  return result.data;
}
