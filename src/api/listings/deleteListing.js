import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function deleteListing(id) {
  const accessToken = window.localStorage.getItem("accessToken");
  const apiKey = window.localStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    throw new Error("You must be logged in to delete a listing.");
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.auction.listings}/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    let message = "Unable to delete listing.";

    try {
      const result = await response.json();
      message = result.errors?.[0]?.message || message;
    } catch {
      // DELETE can return an empty response body.
    }

    throw new Error(message);
  }

  return true;
}
