import { getProfile } from "../api/profile/getProfile.js";
import { getProfileBids } from "../api/profile/getProfileBids.js";
import { updateProfile } from "../api/profile/updateProfile.js";

export async function initProfilePage() {
  const profileElement = document.querySelector("#profile-page");

  if (!profileElement) return;

  const storedUser = window.localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/login.html";
    return;
  }

  const user = JSON.parse(storedUser);

  try {
    const [profile, bids] = await Promise.all([
      getProfile(user.name),
      getProfileBids(user.name),
    ]);

    renderProfile(profileElement, profile, bids);
  } catch (error) {
    console.error("Failed to load profile:", error);

    profileElement.innerHTML = `
      <p class="py-10 text-center text-red-600">
        Failed to load profile.
      </p>
    `;
  }
}

function renderProfile(profileElement, profile, bids = []) {
  const avatar =
    profile.avatar?.url || "/src/assets/images/placeholder-image.png";

  const banner = profile.banner?.url || "";
  const bio = profile.bio || "No bio added yet.";
  const credits = profile.credits ?? 0;
  const listings = profile.listings || [];
  const listingCount = profile._count?.listings ?? listings.length;

  const bidListings = getUniqueBidListings(bids);

  profileElement.innerHTML = `
    <section class="mx-auto max-w-6xl px-4 py-8">

      <div
        class="h-48 rounded-2xl bg-gray-200 bg-cover bg-center"
        ${banner ? `style="background-image: url('${banner}');"` : ""}
      ></div>

      <div class="-mt-12 px-4">
        <img
          src="${avatar}"
          alt="${profile.name}'s avatar"
          onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
          class="h-24 w-24 rounded-full border-4 border-white object-cover"
        />
      </div>

      <div class="mt-4">
        <h1 class="text-3xl font-bold text-gray-950">
          ${profile.name}
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          ${profile.email}
        </p>

        <p class="mt-4 max-w-2xl text-gray-600">
          ${bio}
        </p>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-sm text-gray-500">
            Credits
          </p>

          <p class="mt-1 text-2xl font-bold text-orange-500">
            ${credits.toLocaleString("no-NO")} cr
          </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-sm text-gray-500">
            Listings
          </p>

          <p class="mt-1 text-2xl font-bold text-gray-950">
            ${listingCount}
          </p>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="/create.html"
          class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Create Listing
        </a>

        <button
          type="button"
          id="edit-profile-button"
          class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Edit Profile
        </button>
      </div>

      <section
        id="edit-profile-section"
        class="mt-8 hidden rounded-2xl border border-gray-200 bg-white p-6"
      >
        <h2 class="text-xl font-bold text-gray-950">
          Edit Profile
        </h2>

        <form id="edit-profile-form" class="mt-6 space-y-5">
          <div>
            <label
              for="profile-bio"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Bio
            </label>

            <textarea
              id="profile-bio"
              rows="4"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            >${profile.bio || ""}</textarea>
          </div>

          <div>
            <label
              for="profile-avatar"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Avatar URL
            </label>

            <input
              id="profile-avatar"
              type="url"
              value="${profile.avatar?.url || ""}"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="profile-banner"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Banner URL
            </label>

            <input
              id="profile-banner"
              type="url"
              value="${profile.banner?.url || ""}"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <p
            id="profile-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <div class="flex gap-3">
            <button
              id="cancel-profile-edit"
              type="button"
              class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700"
            >
              Cancel
            </button>

            <button
              id="save-profile-button"
              type="submit"
              class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              Save Profile
            </button>
          </div>
        </form>
      </section>

      <section class="mt-10">
        <div class="flex gap-2 border-b border-gray-200">
          <button
            id="my-listings-tab"
            type="button"
            class="border-b-2 border-blue-600 px-4 py-3 font-semibold text-blue-600"
          >
            My Listings
          </button>

          <button
            id="my-bids-tab"
            type="button"
            class="border-b-2 border-transparent px-4 py-3 font-semibold text-gray-500"
          >
            My Bids
          </button>
        </div>

        <div
          id="my-listings-content"
          class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          ${renderProfileListings(listings)}
        </div>

        <div
          id="my-bids-content"
          class="mt-6 hidden grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          ${renderBidListings(bidListings)}
        </div>
      </section>

    </section>
  `;

  setupProfileEvents(profileElement, profile);
  setupProfileTabs(profileElement);
}

function setupProfileEvents(profileElement, profile) {
  const editButton = profileElement.querySelector("#edit-profile-button");
  const editSection = profileElement.querySelector("#edit-profile-section");
  const cancelButton = profileElement.querySelector("#cancel-profile-edit");
  const form = profileElement.querySelector("#edit-profile-form");

  editButton?.addEventListener("click", () => {
    editSection?.classList.remove("hidden");
  });

  cancelButton?.addEventListener("click", () => {
    editSection?.classList.add("hidden");
  });

  form?.addEventListener("submit", (event) =>
    handleProfileUpdate(event, profile.name),
  );
}

function setupProfileTabs(profileElement) {
  const listingsTab = profileElement.querySelector("#my-listings-tab");
  const bidsTab = profileElement.querySelector("#my-bids-tab");

  const listingsContent = profileElement.querySelector("#my-listings-content");

  const bidsContent = profileElement.querySelector("#my-bids-content");

  listingsTab?.addEventListener("click", () => {
    listingsContent?.classList.remove("hidden");
    bidsContent?.classList.add("hidden");

    listingsTab.classList.add("border-blue-600", "text-blue-600");
    listingsTab.classList.remove("border-transparent", "text-gray-500");

    bidsTab?.classList.remove("border-blue-600", "text-blue-600");
    bidsTab?.classList.add("border-transparent", "text-gray-500");
  });

  bidsTab?.addEventListener("click", () => {
    bidsContent?.classList.remove("hidden");
    listingsContent?.classList.add("hidden");

    bidsTab.classList.add("border-blue-600", "text-blue-600");
    bidsTab.classList.remove("border-transparent", "text-gray-500");

    listingsTab?.classList.remove("border-blue-600", "text-blue-600");
    listingsTab?.classList.add("border-transparent", "text-gray-500");
  });
}

async function handleProfileUpdate(event, username) {
  event.preventDefault();

  const form = event.currentTarget;

  const bio = form.querySelector("#profile-bio")?.value.trim() || "";
  const avatarUrl = form.querySelector("#profile-avatar")?.value.trim() || "";
  const bannerUrl = form.querySelector("#profile-banner")?.value.trim() || "";

  const errorElement = form.querySelector("#profile-error");
  const saveButton = form.querySelector("#save-profile-button");

  hideError(errorElement);

  const profileData = {
    bio,
    avatar: avatarUrl
      ? {
          url: avatarUrl,
          alt: `${username}'s avatar`,
        }
      : null,
    banner: bannerUrl
      ? {
          url: bannerUrl,
          alt: `${username}'s banner`,
        }
      : null,
  };

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  try {
    await updateProfile(username, profileData);

    window.location.reload();
  } catch (error) {
    console.error("Failed to update profile:", error);

    showError(errorElement, error.message || "Unable to update profile.");

    saveButton.disabled = false;
    saveButton.textContent = "Save Profile";
  }
}

function getUniqueBidListings(bids = []) {
  const listings = bids
    .map((bid) => bid.listing)
    .filter((listing) => listing?.id);

  return Array.from(
    new Map(listings.map((listing) => [listing.id, listing])).values(),
  );
}

function renderProfileListings(listings = []) {
  if (listings.length === 0) {
    return `
      <p class="text-gray-500">
        You have no listings yet.
      </p>
    `;
  }

  return listings.map(renderListingCard).join("");
}

function renderBidListings(listings = []) {
  if (listings.length === 0) {
    return `
      <p class="text-gray-500">
        You have not placed any bids yet.
      </p>
    `;
  }

  return listings.map(renderListingCard).join("");
}

function renderListingCard(listing) {
  const image =
    listing.media?.[0]?.url || "/src/assets/images/placeholder-image.png";

  const imageAlt = listing.media?.[0]?.alt || listing.title || "Listing image";

  return `
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white"
    >
      <img
        src="${image}"
        alt="${imageAlt}"
        onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
        class="h-44 w-full object-cover"
      />

      <div class="p-4">
        <h3 class="font-bold text-gray-950">
          ${listing.title || "Untitled listing"}
        </h3>

        <a
          href="/listing.html?id=${listing.id}"
          class="mt-4 inline-block font-semibold text-blue-600 hover:underline"
        >
          View Listing
        </a>
      </div>
    </article>
  `;
}

function showError(element, message) {
  if (!element) return;

  element.textContent = message;
  element.classList.remove("hidden");
}

function hideError(element) {
  if (!element) return;

  element.textContent = "";
  element.classList.add("hidden");
}
