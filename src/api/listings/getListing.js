import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

/**
 * Fetches a single auction listing including seller and bid data.
 * @param {string} id - The listing ID.
 * @returns {Promise<Object>} The requested listing.
 * @throws {Error} If the listing cannot be fetched.
 */
export async function getListing(id) {
  const url =
    `${API_BASE_URL}${API_ENDPOINTS.auction.listings}/${id}` +
    "?_seller=true&_bids=true";

  const response = await globalThis.fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch listing with id ${id}: ${response.statusText}`,
    );
  }

  const { data } = await response.json();

  return data;
}
