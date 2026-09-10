import { API_BASE_URL, API_ENDPOINTS } from "../config.js";
import { createApiKey } from "../auth/createApiKey.js";

export async function getProfile(username) {
  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("You must be logged in to access the profile");
  }

  let apiKey = window.localStorage.getItem("apiKey");

  if (!apiKey) {
    apiKey = await createApiKey(accessToken);
    window.localStorage.setItem("apiKey", apiKey);
  }

  const url =
    `${API_BASE_URL}${API_ENDPOINTS.auction.profiles}/${username}` +
    "?_listings=true&_wins=true";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to load profile";

    throw new Error(message);
  }

  return result.data;
}
