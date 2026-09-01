import { createdListingCard } from "./listingCard.js";

export function renderListings(listings) {
  const listingsElement = globalThis.document?.querySelector("#listings");

  if (!listingsElement) return;

  if (!listings || listings.length === 0) {
    listingsElement.innerHTML = `
        <p class="py-8 text-center text-gray-500">
            No listings found.
        </p>
        `;
    return;
  }

  listingsElement.innerHTML = `
    <div class="mb-4">
    <p class="text-sm text-gray-500">
    ${listings.length} listing found 
    </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    ${listings.map((listing) => createdListingCard(listing)).join("")}
    </div>
    `;
}
