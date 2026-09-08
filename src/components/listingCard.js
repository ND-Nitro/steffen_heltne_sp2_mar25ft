import { getCurrentBid, getTimeLeft } from "../utils/listingHelpers.js";

export function createListingCard(listing) {
  const image =
    listing.media?.[0]?.url || "/src/assets/images/placeholder-image.png";

  const imageAlt =
    listing.media?.[0]?.alt || listing.title || "Auction listing";

  const category = listing.tags?.[0] || "Other";

  const currentBid = getCurrentBid(listing).toLocaleString("no-NO");

  const timeLeft = getTimeLeft(listing.endsAt);

  // Seller information
  const sellerName = listing.seller?.name || "Unknown seller";

  const sellerAvatar =
    listing.seller?.avatar?.url || "/src/assets/images/placeholder-image.png";

  // Number of bids
  const bidCount = listing._count?.bids ?? listing.bids?.length ?? 0;

  return `
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div class="relative">

        <img
          src="${image}"
          alt="${imageAlt}"
          onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
          class="h-56 w-full object-cover"
        />

        <span
          class="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
        >
          ${category}
        </span>

        <span
          class="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-500 shadow-sm"
        >
          ${timeLeft.short}
        </span>

      </div>

      <div class="p-5">

        <h3
          class="text-lg font-semibold leading-snug text-gray-900"
        >
          ${listing.title || "Untitled listing"}
        </h3>

        <!-- Seller -->
        <div class="mt-3 flex items-center gap-2">

          <img
            src="${sellerAvatar}"
            alt="${sellerName}"
            onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
            class="h-7 w-7 rounded-full object-cover"
          />

          <span class="text-sm text-gray-500">
            ${sellerName}
          </span>

        </div>

        <!-- Bid information -->
        <div
          class="mt-4 flex items-end justify-between gap-4 border-t border-gray-100 pt-4"
        >

          <div>
            <p class="text-xs text-gray-400">
              ${bidCount} ${bidCount === 1 ? "bid" : "bids"}
            </p>

            <p class="mt-1 text-xl font-bold text-orange-500">
              ${currentBid} cr
            </p>
          </div>

          <a
            href="/listing.html?id=${listing.id}"
            class="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View →
          </a>

        </div>

      </div>
    </article>
  `;
}
