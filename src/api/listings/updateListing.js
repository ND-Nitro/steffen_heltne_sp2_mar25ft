import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function updateListing(id, listingData) {
  const accessToken = window.localStorage.getItem("accessToken");
  const apiKey = window.localStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    throw new Error("You must be logged in to update a listing.");
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.auction.listings}/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listingData),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to update listing.";

    throw new Error(message);
  }

  return result.data;
}
