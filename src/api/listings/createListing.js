import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function createListing(listingData) {
  const accessToken = window.localStorage.getItem("accessToken");
  const apiKey = window.localStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    throw new Error("You must be logged in to create a listing.");
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.auction.listings}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listingData),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to create listing.";

    throw new Error(message);
  }

  return result.data;
}
