import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function getProfileBids(username) {
  const accessToken = window.localStorage.getItem("accessToken");
  const apiKey = window.localStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    throw new Error("You must be logged in to view your bids.");
  }

  const url =
    `${API_BASE_URL}${API_ENDPOINTS.auction.profiles}/${username}/bids` +
    "?_listings=true";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to load your bids.";

    throw new Error(message);
  }

  return result.data;
}
