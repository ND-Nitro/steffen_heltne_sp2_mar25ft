import { getListing } from "../api/listings/getListing.js";
import { deleteListing } from "../api/listings/deleteListing.js";
import { placeBid } from "../api/listings/placeBid.js";
import { getCurrentBid, getTimeLeft } from "../utils/listingHelpers.js";

export async function initListingPage() {
  const listingElement = globalThis.document?.querySelector("#listing-page");

  if (!listingElement) return;

  const params = new globalThis.URLSearchParams(globalThis.location?.search);
  const listingId = params.get("id");

  if (!listingId) {
    listingElement.innerHTML = `
      <p class="py-10 text-center text-gray-500">
        Listing not found.
      </p>
    `;
    return;
  }

  try {
    const listing = await getListing(listingId);

    renderListing(listingElement, listing);
  } catch (error) {
    globalThis.console?.error("Failed to load listing:", error);

    listingElement.innerHTML = `
      <p class="py-10 text-center text-red-600">
        Failed to load listing.
      </p>
    `;
  }
}

function renderListing(listingElement, listing) {
  const image =
    listing.media?.[0]?.url || "/src/assets/images/placeholder-image.png";

  const imageAlt =
    listing.media?.[0]?.alt || listing.title || "Auction listing";

  const category = listing.tags?.[0] || "Other";

  const sellerName = listing.seller?.name || "Unknown seller";

  const sellerAvatar =
    listing.seller?.avatar?.url || "/src/assets/images/placeholder-image.png";

  const currentBidAmount = getCurrentBid(listing);
  const currentBid = currentBidAmount.toLocaleString("no-NO");

  const timeLeft = getTimeLeft(listing.endsAt);
  const bidCount = listing.bids?.length ?? 0;

  const storedUser = globalThis.localStorage?.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = Boolean(user);
  const isOwner = user?.name === listing.seller?.name;
  const isActive = !timeLeft.ended;

  listingElement.innerHTML = `
    <section class="mx-auto max-w-6xl px-4 py-8">
      <div class="grid gap-8 lg:grid-cols-2">

        <div>
          <img
            src="${image}"
            alt="${imageAlt}"
            onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
            class="h-96 w-full rounded-2xl object-cover"
          />
        </div>

        <article
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <span
            class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
          >
            ${category}
          </span>

          <h1 class="mt-4 text-3xl font-bold text-gray-950">
            ${listing.title || "Untitled listing"}
          </h1>

          <p class="mt-4 leading-7 text-gray-600">
            ${listing.description || "No description available."}
          </p>

          <div class="mt-6 border-t border-gray-200 pt-6">
            <div class="flex items-center gap-3">

              <img
                src="${sellerAvatar}"
                alt="${sellerName}"
                onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
                class="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p class="text-xs text-gray-400">
                  Sold by
                </p>

                <p class="font-semibold text-gray-900">
                  ${sellerName}
                </p>
              </div>

            </div>
          </div>

          <div
            class="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6"
          >
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Current Bid
              </p>

              <p class="mt-1 text-2xl font-bold text-orange-500">
                ${currentBid} cr
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Ends In
              </p>

              <p class="mt-1 font-semibold text-gray-900">
                ${timeLeft.short}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <p class="text-sm text-gray-500">
              ${bidCount} ${bidCount === 1 ? "bid" : "bids"}
            </p>
          </div>

          ${renderListingActions({
            listing,
            isLoggedIn,
            isOwner,
            isActive,
            currentBidAmount,
          })}

        </article>
      </div>

      <section class="mt-10">
        <h2 class="text-2xl font-bold text-gray-950">
          Bid History (${bidCount})
        </h2>

        <div class="mt-4 space-y-3">
          ${renderBidHistory(listing.bids)}
        </div>
      </section>
    </section>
  `;

  if (isOwner) {
    const deleteButton = listingElement.querySelector("#delete-listing-button");

    deleteButton?.addEventListener("click", () =>
      handleDeleteListing(listing.id, deleteButton),
    );
  }

  if (isLoggedIn && !isOwner && isActive) {
    const bidForm = listingElement.querySelector("#bid-form");

    bidForm?.addEventListener("submit", (event) =>
      handlePlaceBid(event, listing.id, currentBidAmount),
    );
  }
}

function renderListingActions({
  listing,
  isLoggedIn,
  isOwner,
  isActive,
  currentBidAmount,
}) {
  if (isOwner) {
    return `
      <div class="mt-6 flex gap-3 border-t border-gray-200 pt-6">
        <a
          href="/edit.html?id=${listing.id}"
          class="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
        >
          Edit Listing
        </a>

        <button
          id="delete-listing-button"
          type="button"
          class="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
        >
          Delete Listing
        </button>
      </div>
    `;
  }

  if (!isActive) {
    return `
      <div
        class="mt-6 rounded-xl bg-gray-100 p-4 text-center font-semibold text-gray-600"
      >
        This auction has ended.
      </div>
    `;
  }

  if (!isLoggedIn) {
    return `
      <div class="mt-6 border-t border-gray-200 pt-6">
        <p class="text-sm text-gray-600">
          You must be logged in to place a bid.
        </p>

        <a
          href="/login.html"
          class="mt-3 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
        >
          Log in to bid
        </a>
      </div>
    `;
  }

  return `
    <form
      id="bid-form"
      class="mt-6 border-t border-gray-200 pt-6"
    >
      <label
        for="bid-amount"
        class="mb-2 block text-sm font-semibold text-gray-700"
      >
        Place your bid
      </label>

      <div class="flex gap-3">
        <input
          id="bid-amount"
          type="number"
          min="${currentBidAmount + 1}"
          step="1"
          required
          placeholder="${currentBidAmount + 1}"
          class="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3"
        />

        <button
          id="place-bid-button"
          type="submit"
          class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Place Bid
        </button>
      </div>

      <p class="mt-2 text-xs text-gray-500">
        Your bid must be higher than ${currentBidAmount.toLocaleString(
          "no-NO",
        )} cr.
      </p>

      <p
        id="bid-error"
        class="mt-3 hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
        role="alert"
      ></p>
    </form>
  `;
}

async function handlePlaceBid(event, listingId, currentBidAmount) {
  event.preventDefault();

  const form = event.currentTarget;

  const amountInput = form.querySelector("#bid-amount");
  const bidButton = form.querySelector("#place-bid-button");
  const errorElement = form.querySelector("#bid-error");

  const amount = Number(amountInput?.value);

  hideBidError(errorElement);

  if (!Number.isFinite(amount) || amount <= currentBidAmount) {
    showBidError(
      errorElement,
      `Your bid must be higher than ${currentBidAmount.toLocaleString(
        "no-NO",
      )} cr.`,
    );
    return;
  }

  bidButton.disabled = true;
  bidButton.textContent = "Placing Bid...";

  try {
    await placeBid(listingId, amount);

    globalThis.location.reload();
  } catch (error) {
    globalThis.console?.error("Failed to place bid:", error);

    showBidError(errorElement, error.message || "Unable to place bid.");

    bidButton.disabled = false;
    bidButton.textContent = "Place Bid";
  }
}

async function handleDeleteListing(listingId, deleteButton) {
  const confirmed = globalThis.confirm(
    "Are you sure you want to delete this listing?",
  );

  if (!confirmed) return;

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    await deleteListing(listingId);

    globalThis.location.href = "/";
  } catch (error) {
    globalThis.console?.error("Failed to delete listing:", error);

    globalThis.alert(error.message || "Unable to delete listing.");

    deleteButton.disabled = false;
    deleteButton.textContent = "Delete Listing";
  }
}

function showBidError(element, message) {
  if (!element) return;

  element.textContent = message;
  element.classList.remove("hidden");
}

function hideBidError(element) {
  if (!element) return;

  element.textContent = "";
  element.classList.add("hidden");
}

function renderBidHistory(bids = []) {
  if (bids.length === 0) {
    return `
      <p
        class="rounded-xl border border-gray-200 bg-white p-5 text-gray-500"
      >
        No bids yet.
      </p>
    `;
  }

  const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);

  return sortedBids
    .map(
      (bid, index) => `
        <div
          class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
        >
          <div>
            <p class="font-semibold text-gray-900">
              ${bid.bidder?.name || bid.bidder || "Unknown bidder"}
            </p>

            <p class="mt-1 text-xs text-gray-400">
              ${new globalThis.Date(bid.created).toLocaleString("no-NO")}
            </p>
          </div>

          <div class="text-right">
            ${
              index === 0
                ? `
                  <p class="text-xs font-semibold text-green-600">
                    Leading
                  </p>
                `
                : ""
            }

            <p class="font-bold text-orange-500">
              ${bid.amount.toLocaleString("no-NO")} cr
            </p>
          </div>
        </div>
      `,
    )
    .join("");
}
