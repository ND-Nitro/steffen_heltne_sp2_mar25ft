import { getCurrentBid, getTimeLeft } from "../utils/listingHelpers.js";

export function createListingCard(listing) {
  const image =
    listing.media?.[0]?.url || "/src/assets/images/placeholder-image.png";

  const imageAlt =
    listing.media?.[0]?.alt || listing.title || "Auction listing";

  const category = listing.tags?.[0] || "Other";

  const currentBid = getCurrentBid(listing).toLocaleString("no-NO");

  const timeLeft = getTimeLeft(listing.endsAt);

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

      </div>

      <div class="p-5">

        <h3
          class="text-lg font-semibold leading-snug text-gray-900"
        >
          ${listing.title || "Untitled listing"}
        </h3>

        <div
          class="mt-5 flex items-end justify-between gap-4"
        >

          <div>
            <p
              class="text-xs font-medium uppercase tracking-wide text-gray-400"
            >
              Current Bid
            </p>

            <p
              class="mt-1 text-xl font-bold text-blue-600"
            >
              ${currentBid} cr
            </p>
          </div>

          <div class="text-right">

            <p
              class="text-xs font-medium uppercase tracking-wide text-gray-400"
            >
              Ends In
            </p>

            <p
              class="mt-1 text-sm font-semibold text-orange-500"
            >
              ${timeLeft.short}
            </p>

          </div>

        </div>

        <a
          href="/listing/?id=${listing.id}"
          class="mt-5 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View listing
        </a>

      </div>
    </article>
  `;
}
