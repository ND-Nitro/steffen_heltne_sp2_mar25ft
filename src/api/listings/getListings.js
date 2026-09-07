import { API_BASE_URL, API_ENDPOINTS } from "../config.js";

export async function getListings() {
  const url = `${API_BASE_URL}${API_ENDPOINTS.auction.listings}?_active=true&_bids=true&_seller=true`;

  const response = await globalThis.fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch listings: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = await response.json();

  return data;
}
