import { getListing } from "../api/listings/getListing.js";
import { updateListing } from "../api/listings/updateListing.js";

export async function initEditListingPage() {
  const editElement = document.querySelector("#edit-listing-page");

  if (!editElement) return;

  const storedUser = window.localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/login.html";
    return;
  }

  const user = JSON.parse(storedUser);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    showPageError(editElement, "Listing ID is missing.");
    return;
  }

  try {
    const listing = await getListing(id);

    if (listing.seller?.name !== user.name) {
      showPageError(editElement, "You can only edit your own listings.");
      return;
    }

    renderEditForm(editElement, listing);
  } catch (error) {
    showPageError(editElement, error.message || "Unable to load listing.");
  }
}

function renderEditForm(editElement, listing) {
  const imageUrl = listing.media?.[0]?.url || "";
  const category = listing.tags?.[0] || "";

  editElement.innerHTML = `
    <section class="mx-auto max-w-2xl px-4 py-10">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h1 class="text-3xl font-bold text-gray-950">
          Edit Listing
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          Update your auction listing.
        </p>

        <form id="edit-listing-form" class="mt-8 space-y-5">

          <div>
            <label
              for="listing-title"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              id="listing-title"
              type="text"
              required
              value="${escapeHtml(listing.title || "")}"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="listing-description"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="listing-description"
              rows="5"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            >${escapeHtml(listing.description || "")}</textarea>
          </div>

          <div>
            <label
              for="listing-image"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>

            <input
              id="listing-image"
              type="url"
              value="${escapeHtml(imageUrl)}"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="listing-category"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <input
              id="listing-category"
              type="text"
              value="${escapeHtml(category)}"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <p
            id="edit-listing-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <div class="flex gap-3">
            <a
              href="/listing.html?id=${listing.id}"
              class="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold"
            >
              Cancel
            </a>

            <button
              id="save-listing-button"
              type="submit"
              class="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </section>
  `;

  const form = editElement.querySelector("#edit-listing-form");

  form?.addEventListener("submit", (event) =>
    handleUpdateListing(event, listing.id),
  );
}

async function handleUpdateListing(event, id) {
  event.preventDefault();

  const form = event.currentTarget;

  const title = form.querySelector("#listing-title")?.value.trim() || "";
  const description =
    form.querySelector("#listing-description")?.value.trim() || "";
  const imageUrl = form.querySelector("#listing-image")?.value.trim() || "";
  const category = form.querySelector("#listing-category")?.value.trim() || "";

  const errorElement = form.querySelector("#edit-listing-error");
  const saveButton = form.querySelector("#save-listing-button");

  if (!title) {
    showFormError(errorElement, "Title is required.");
    return;
  }

  const listingData = {
    title,
    description,
    tags: category ? [category] : [],
    media: imageUrl
      ? [
          {
            url: imageUrl,
            alt: title,
          },
        ]
      : [],
  };

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  try {
    await updateListing(id, listingData);

    window.location.href = `/listing.html?id=${id}`;
  } catch (error) {
    showFormError(errorElement, error.message || "Unable to update listing.");

    saveButton.disabled = false;
    saveButton.textContent = "Save Changes";
  }
}

function showPageError(element, message) {
  element.innerHTML = `
    <p class="py-10 text-center text-red-600">
      ${message}
    </p>
  `;
}

function showFormError(element, message) {
  if (!element) return;

  element.textContent = message;
  element.classList.remove("hidden");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
