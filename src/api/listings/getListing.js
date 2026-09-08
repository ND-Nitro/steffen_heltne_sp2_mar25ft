import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

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
