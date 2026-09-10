import { getProfile } from "../api/profile/getProfile.js";

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
    const profile = await getProfile(user.name);

    renderProfile(profileElement, profile);
  } catch (error) {
    console.error("Failed to load profile:", error);

    profileElement.innerHTML = `
        <p class="py-10 text-center text-red-600">
        Failed to load profile.
        </p>
        `;
  }
}

function renderProfile(profileElement, profile) {
  const avatar =
    profile.avatar?.url || "/src/assets/images/placeholder-image.png";

  const banner = profile.banner?.url || "";

  const bio = profile.bio || "No bio added yet.";

  const credits = profile.credits ?? 0;

  const listingCount = profile._count?.listings ?? 0;

  profileElement.innerHTML = `
  <section class="mx-auto max-w-6xl px-4 py-8">
  
  <div 
  class="h-48 rounded-2xl bg-gray-200 bg-cover bg-center
  ${banner ? `style="background-image: url('${banner}');"` : ""}
  ">
  </div>

  <div class="-mt-12 px-4">
  <img
  src="${avatar}"
  alt="${profile.name}'s avatar"
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
<div 
class="rounded-2xl border border-gray-200 bg-white p-5">

<p class=" text-sm text-gray-500">
Credits 
</p>

<p class="mt-1 text-2xl font-bold text-orange-500">
${credits.toLocaleString("no-NO")} cr
</p>
</div>

<div 
class="rounded-2xl border border-gray-200 bg-white p-5">
<P class="text-sm text-gray-500">
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

      <section class="mt-10">
        <h2 class="text-2xl font-bold text-gray-950">
          My Listings
        </h2>

        <div
          id="profile-listings"
          class="mt-5"
        >
          <p class="text-gray-500">
            ${
              listingCount === 0
                ? "You have no listings yet."
                : `${listingCount} listings`
            }
          </p>
        </div>
      </section>

    </section>
  `;
}
