import { getCurrentBid, getTimeLeft } from "../utils/listingHelpers.js";

let countdownIntervalId;

export function renderFeaturedListing(listing) {
  const featuredListingElement =
    globalThis.document?.querySelector("#featured-listing");

  if (!featuredListingElement) return;

  const image =
    listing.media?.[0]?.url || "/src/assets/images/placeholder-image.png";

  const imageAlt =
    listing.media?.[0]?.alt || listing.title || "Featured listing";

  const category = listing.tags?.[0] || "Featured";

  const currentBid = getCurrentBid(listing).toLocaleString("no-NO");

  const timeLeft = getTimeLeft(listing.endsAt);

  featuredListingElement.innerHTML = `
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div class="relative">
        <img
          src="${image}"
          alt="${imageAlt}"
          onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
          class="h-64 w-full object-cover md:h-72 lg:h-80"
        />

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

      <div class="p-5 md:p-6">
        <span
          class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
        >
          ${category}
        </span>

        <h2
          class="mt-3 text-2xl font-bold leading-tight text-gray-950 md:text-3xl"
        >
          ${listing.title || "Featured listing"}
        </h2>

        <p
          class="mt-3 max-w-4xl text-sm leading-6 text-gray-600 md:text-base"
        >
          ${listing.description || "No description available."}
        </p>

        <div
          class="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-10"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Current Bid
            </p>

            <p class="mt-1 text-3xl font-bold text-blue-600">
              ${currentBid} cr
            </p>
          </div>

          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Ends In
            </p>

            <p
              id="featured-countdown"
              class="mt-1 text-3xl font-bold tracking-wide text-orange-500"
            >
              ${formatCountdown(timeLeft)}
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

        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Place Bid
          </button>

          <a
            href="/listing/?id=${listing.id}"
            class="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  `;

  startCountdown(listing.endsAt);
}

function formatCountdown(timeLeft) {
  if (timeLeft.ended) {
    return "ENDED";
  }

  return `${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`;
}

function startCountdown(endsAt) {
  if (countdownIntervalId) {
    globalThis.clearInterval(countdownIntervalId);
  }

  countdownIntervalId = globalThis.setInterval(() => {
    const countdownElement = globalThis.document?.querySelector(
      "#featured-countdown",
    );

    if (!countdownElement) {
      globalThis.clearInterval(countdownIntervalId);
      return;
    }

    const timeLeft = getTimeLeft(endsAt);

    countdownElement.textContent = formatCountdown(timeLeft);

    if (timeLeft.ended) {
      globalThis.clearInterval(countdownIntervalId);
    }
  }, 1000);
}
