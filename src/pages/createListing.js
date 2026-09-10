import { createListing } from "../api/listings/createListing.js";

export function initCreateListingPage() {
  const createElement = document.querySelector("#create-listing-page");

  if (!createElement) return;

  const storedUser = window.localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/login.html";
    return;
  }

  renderCreateListingForm(createElement);
}

function renderCreateListingForm(createElement) {
  createElement.innerHTML = `
    <section class="mx-auto max-w-2xl px-4 py-10">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 class="text-3xl font-bold text-gray-950">
          Create Listing
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          Create a new auction listing.
        </p>

        <form id="create-listing-form" class="mt-8 space-y-5">

          <div>
            <label
              for="listing-title"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              id="listing-title"
              name="title"
              type="text"
              required
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
              name="description"
              rows="5"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            ></textarea>
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
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
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

            <select
              id="listing-category"
              name="category"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Art">Art</option>
              <option value="Fashion">Fashion</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div>
            <label
              for="listing-deadline"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>

            <input
              id="listing-deadline"
              name="deadline"
              type="datetime-local"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <p
            id="create-listing-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <div class="flex gap-3">
            <a
              href="/"
              class="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold"
            >
              Cancel
            </a>

            <button
              id="create-listing-button"
              type="submit"
              class="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  `;

  const form = createElement.querySelector("#create-listing-form");

  form?.addEventListener("submit", handleCreateListing);
}

async function handleCreateListing(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const title = form.querySelector("#listing-title")?.value.trim() || "";
  const description =
    form.querySelector("#listing-description")?.value.trim() || "";
  const imageUrl = form.querySelector("#listing-image")?.value.trim() || "";
  const category = form.querySelector("#listing-category")?.value || "";
  const deadline = form.querySelector("#listing-deadline")?.value || "";

  const errorElement = form.querySelector("#create-listing-error");
  const submitButton = form.querySelector("#create-listing-button");

  hideError(errorElement);

  if (!title || !deadline) {
    showError(errorElement, "Title and deadline are required.");
    return;
  }

  const endsAt = new Date(deadline).toISOString();

  if (new Date(endsAt).getTime() <= Date.now()) {
    showError(errorElement, "Deadline must be in the future.");
    return;
  }

  const listingData = {
    title,
    endsAt,
  };

  if (description) {
    listingData.description = description;
  }

  if (category) {
    listingData.tags = [category];
  }

  if (imageUrl) {
    listingData.media = [
      {
        url: imageUrl,
        alt: title,
      },
    ];
  }

  setLoadingState(submitButton, true);

  try {
    const listing = await createListing(listingData);

    window.location.href = `/listing.html?id=${listing.id}`;
  } catch (error) {
    showError(errorElement, error.message || "Unable to create listing.");
  } finally {
    setLoadingState(submitButton, false);
  }
}

function showError(errorElement, message) {
  if (!errorElement) return;

  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError(errorElement) {
  if (!errorElement) return;

  errorElement.textContent = "";
  errorElement.classList.add("hidden");
}

function setLoadingState(button, isLoading) {
  if (!button) return;

  button.disabled = isLoading;
  button.textContent = isLoading ? "Publishing..." : "Publish";
}
