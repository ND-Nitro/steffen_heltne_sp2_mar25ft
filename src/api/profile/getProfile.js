import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function gretProfile(username) {
  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("You must be logged in to access the profile");
  }

  const url =
    `${API_BASE_URL}${API_ENDPOINTS.auction.profiles}/${username}` +
    "?_listings=true&_wins=true";

  const response = await globalThis.fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.error?.[0]?.message || "Unable to load profile";

    throw new Error(message);
  }
  return result.data;
}
