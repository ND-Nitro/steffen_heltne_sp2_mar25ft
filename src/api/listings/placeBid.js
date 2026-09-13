import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

/**
 * Places a bid on an auction listing.
 * @param {string} id - The listing ID.
 * @param {number} amount - The bid amount in credits.
 * @returns {Promise<Object>} The updated bid data.
 * @throws {Error} If the bid cannot be placed.
 */
export async function placeBid(id, amount) {
  const accessToken = window.localStorage.getItem("accessToken");
  const apiKey = window.localStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    throw new Error("You must be logged in to place a bid.");
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.auction.listings}/${id}/bids`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Unable to place bid.";

    throw new Error(message);
  }

  return result.data;
}
