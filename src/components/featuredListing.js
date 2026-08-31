export function renderFeaturedListing(listing) {
  const featuredListingElement =
    globalThis.document?.querySelector("#featured-listing");

  if (!featuredListingElement) return;

  const image = listing.media?.[0]?.url || "https://via.placeholder.com/150";

  const category = listing.tags?.[0] || "Featured";

  featuredListingElement.innerHTML = `
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <!-- image for whatverer is going to be listed at the hero section -->
      <div class="relative">
        <img
          src="${image}"
          alt="${listing.media?.[0]?.alt || listing.title || "Featured listing"}"
          class="h-64 w-full object-cover md:h-72 lg:h-80"
        />

        <!-- this is extra bages on the image for marking ending son or that it is a hot product -->
        <div class="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            class="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm"
          >
            🔴 Ending Soon
          </span>

          <span
            class="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm"
          >
            🔥 Featured
          </span>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="p-5 md:p-6">

        <!-- this is  the category part.. where you will see diffrent categorys -->
        <span
          class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
        >
          ${category}
        </span>

        <!-- titles of what is listed /names on the products  -->
        <h2
          class="mt-3 text-2xl font-bold leading-tight text-gray-950 md:text-3xl"
        >
          ${listing.title || "Featured listing"}
        </h2>

        <!-- Description on the products thats listed -->
        <p
          class="mt-3 max-w-4xl text-sm leading-6 text-gray-600 md:text-base"
        >
          ${listing.description || "No description available."}
        </p>

        <!-- Bid and Countdown on the listed item  -->
        <div class="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-10">

          <!-- Current bid on the listed item that is for sale  -->
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Current Bid
            </p>

            <p class="mt-1 text-3xl font-bold text-blue-600">
              ${listing.currentBid?.toLocaleString("no-NO") || "0"} cr
            </p>
          </div>

          <!-- this is the countdown clock  -->
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Ends In
            </p>

            <p
              class="mt-1 text-3xl font-bold tracking-wide text-orange-500"
            >
              ${listing.countdown || "00 : 00 : 00 : 00"}
            </p>

            <div
              class="mt-1 grid grid-cols-4 text-center text-[10px] font-medium uppercase text-gray-400"
            >
              <span>Days</span>
              <span>Hrs</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>

        </div>

        <!-- Buttons on the cards-->
        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Place Bid
          </button>

          <a
            href="/listing/?id=${listing.id}"
            class="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Details
          </a>
        </div>

      </div>
    </article>
  `;
}
