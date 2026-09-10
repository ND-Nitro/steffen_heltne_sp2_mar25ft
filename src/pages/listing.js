import { getListing } from "../api/listings/getListing.js";
import { deleteListing } from "../api/listings/deleteListing.js";
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

  const currentBid = getCurrentBid(listing).toLocaleString("no-NO");
  const timeLeft = getTimeLeft(listing.endsAt);
  const bidCount = listing.bids?.length ?? 0;

  const storedUser = globalThis.localStorage?.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isOwner = user?.name === listing.seller?.name;

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

          ${
            isOwner
              ? `
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
              `
              : ""
          }

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
}

async function handleDeleteListing(listingId, deleteButton) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this listing?",
  );

  if (!confirmed) return;

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    await deleteListing(listingId);

    window.location.href = "/";
  } catch (error) {
    globalThis.console?.error("Failed to delete listing:", error);

    window.alert(error.message || "Unable to delete listing.");

    deleteButton.disabled = false;
    deleteButton.textContent = "Delete Listing";
  }
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
