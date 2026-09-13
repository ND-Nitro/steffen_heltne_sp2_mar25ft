import { sitePath } from "../utils/sitePath.js";
import { getCurrentBid, getTimeLeft } from "../utils/listingHelpers.js";

let countdownIntervalId;

/**
 * Renders the featured auction listing.
 * @param {Object} listing - The listing to display.
 * @returns {void}
 */
export function renderFeaturedListing(listing) {
  const featuredListingElement =
    globalThis.document?.querySelector("#featured-listing");

  if (!featuredListingElement) return;

  const fallbackImage = sitePath("images/placeholder-image.webp");

  const image = listing.media?.[0]?.url || fallbackImage;

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
          onerror="this.onerror=null; this.src='${fallbackImage}';"
          class="h-48 w-full object-cover sm:h-56 md:h-72 lg:h-80"
        />

        <div class="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
          <span
            class="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm sm:px-3 sm:text-xs"
          >
            🔴 Ending Soon
          </span>

          <span
            class="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm sm:px-3 sm:text-xs"
          >
            🔥 Featured
          </span>
        </div>
      </div>

      <div class="p-4 sm:p-5 md:p-6">
        <span
          class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
        >
          ${category}
        </span>

        <h2
          class="mt-3 text-xl font-bold leading-tight text-gray-950 sm:text-2xl md:text-3xl"
        >
          ${listing.title || "Featured listing"}
        </h2>

        <p
          class="mt-3 text-sm leading-6 text-gray-600 md:max-w-4xl md:text-base"
        >
          ${listing.description || "No description available."}
        </p>

        <div
          class="mt-5 grid grid-cols-2 gap-4 sm:flex sm:items-end sm:gap-10"
        >
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs"
            >
              Current Bid
            </p>

            <p class="mt-1 text-2xl font-bold text-blue-600 sm:text-3xl">
              ${currentBid} cr
            </p>
          </div>

          <div class="min-w-0">
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs"
            >
              Ends In
            </p>

            <p
              id="featured-countdown"
              class="mt-1 whitespace-nowrap text-xl font-bold tracking-tight text-orange-500 sm:text-2xl md:text-3xl md:tracking-wide"
            >
              ${formatCountdown(timeLeft)}
            </p>

            <div
              class="mt-1 grid grid-cols-4 text-center text-[9px] font-medium uppercase text-gray-400 sm:text-[10px]"
            >
              <span>Days</span>
              <span>Hrs</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href="${sitePath(`listing.html?id=${listing.id}`)}"
            class="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Place Bid
          </a>

          <a
            href="${sitePath(`listing.html?id=${listing.id}`)}"
            class="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  `;

  startCountdown(listing.endsAt);
}

/**
 * Formats a remaining time value for display.
 * @param {number} timeLeft - Remaining time in milliseconds.
 * @returns {string} A human-readable countdown.
 */
function formatCountdown(timeLeft) {
  if (timeLeft.ended) {
    return "ENDED";
  }

  return `${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`;
}

/**
 * Starts the live countdown for the featured listing.
 * @param {string} endsAt - The listing end date.
 * @returns {void}
 */
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
