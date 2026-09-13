import { sitePath } from "../utils/sitePath.js";
import { logoutUser } from "../api/auth/logout.js";
import { getProfile } from "../api/profile/getProfile.js";

/**
 * Renders the navigation bar based on authentication state.
 * @returns {void}
 */
export function renderNavbar() {
  const navbar = globalThis.document?.querySelector("#navbar");

  if (!navbar) return;

  const storedUser = globalThis.localStorage?.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = Boolean(user);

  const fallbackImage = sitePath("images/placeholder-image.webp");

  navbar.innerHTML = `
    <nav class="border-b border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4"
      >

        <a
          href="${sitePath()}"
          class="flex min-w-0 items-center gap-2 font-bold"
          aria-label="Blackmarket Inc home"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white"
          >
            B
          </span>

          <span class="hidden text-lg sm:inline md:text-xl">
            Blackmarket <span class="text-blue-600">Inc</span>
          </span>
        </a>

        ${
          isLoggedIn
            ? `
              <div class="hidden items-center gap-6 md:flex">
                <a
                  href="${sitePath("#browse")}"
                  class="text-sm font-medium text-blue-600"
                >
                  Browse
                </a>

                <a
                  href="${sitePath("create.html")}"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  Create Listing
                </a>

                <a
                  href="${sitePath("profile.html")}"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  My Profile
                </a>
              </div>

              <div class="flex min-w-0 items-center gap-2 sm:gap-3">
                <span
                  id="navbar-credits"
                  class="whitespace-nowrap rounded-full border border-yellow-300 bg-yellow-50 px-2 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-sm"
                >
                  Loading...
                </span>

                <a
                  href="${sitePath("profile.html")}"
                  aria-label="View profile"
                  class="shrink-0"
                >
                  <img
                    id="navbar-avatar"
                    src="${user.avatar?.url || fallbackImage}"
                    alt=""
                    onerror="this.onerror=null; this.src='${fallbackImage}';"
                    class="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                  />
                </a>

                <button
                  id="logout-button"
                  type="button"
                  class="shrink-0 rounded-lg border border-gray-300 px-2.5 py-2 text-xs sm:px-4 sm:text-sm"
                >
                  <span class="sm:hidden">Out</span>
                  <span class="hidden sm:inline">Log out</span>
                </button>
              </div>
            `
            : `
              <a
                href="${sitePath("#browse")}"
                class="hidden text-sm font-medium text-blue-600 md:block"
              >
                Browse
              </a>

              <div class="flex shrink-0 items-center gap-2">
                <a
                  href="${sitePath("login.html")}"
                  class="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm"
                >
                  Log in
                </a>

                <a
                  href="${sitePath("register.html")}"
                  class="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm"
                >
                  Register
                </a>
              </div>
            `
        }

      </div>
    </nav>
  `;

  const logoutButton = navbar.querySelector("#logout-button");

  logoutButton?.addEventListener("click", logoutUser);

  if (isLoggedIn) {
    updateNavbarProfile(navbar, user, fallbackImage);
  }
}

/**
 * Updates the navbar with the authenticated user's profile data and credits.
 * @param {HTMLElement} navbar - The navbar element.
 * @param {Object} user - The stored user data.
 * @param {string} fallbackImage - The fallback image URL.
 * @returns {Promise<void>}
 */
async function updateNavbarProfile(navbar, user, fallbackImage) {
  const creditsElement = navbar.querySelector("#navbar-credits");
  const avatarElement = navbar.querySelector("#navbar-avatar");

  try {
    const profile = await getProfile(user.name);

    if (creditsElement) {
      creditsElement.textContent = `${profile.credits.toLocaleString("no-NO")} cr`;
    }

    if (avatarElement) {
      avatarElement.src = profile.avatar?.url || fallbackImage;
    }
  } catch (error) {
    globalThis.console?.error("Failed to load navbar profile:", error);

    if (creditsElement) {
      creditsElement.textContent = "0 cr";
    }

    if (avatarElement) {
      avatarElement.src = fallbackImage;
    }
  }
}
