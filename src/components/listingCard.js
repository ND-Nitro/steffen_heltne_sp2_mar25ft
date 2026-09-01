export function createListingCard(listing) {
  const image =
    listing.media?.[0]?.url || "https://via.placeholder.com/600x400";

  const imageAlt =
    listing.media?.[0]?.alt || listing.title || "Auction listing";

  const category = listing.tags?.[0] || "Other";

  const currentBid = listing.currentBid?.toLocaleString("no-NO") || "0";

  const timeLeft = listing.timeLeft || "00h 00m";

  return `
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <!-- this is where the image of the listed item is -->
      <div class="relative">
        <img
          src="${image}"
          alt="${imageAlt}"
          class="h-56 w-full object-cover"
        />

        <!-- Category of the listed item  -->
        <span
          class="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
        >
          ${category}
        </span>
      </div>

      <!-- content for listed -->
      <div class="p-5">

        <!-- here is the title placement -->
        <h3
          class="text-lg font-semibold leading-snug text-gray-900"
        >
          ${listing.title || "Untitled listing"}
        </h3>

        <!-- Bid and time left of product-->
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
              ${timeLeft}
            </p>
          </div>
        </div>

        <!-- listing button-->
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
