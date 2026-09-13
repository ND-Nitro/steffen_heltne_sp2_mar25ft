import { sitePath } from "../utils/sitePath.js";
import { logoutUser } from "../api/auth/logout.js";
import { getProfile } from "../api/profile/getProfile.js";

export function renderNavbar() {
  const navbar = globalThis.document?.querySelector("#navbar");

  if (!navbar) return;

  const storedUser = globalThis.localStorage?.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = Boolean(user);

  navbar.innerHTML = `
    <nav class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        <a href="${sitePath()}" class="flex items-center gap-2 text-xl font-bold">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"
          >
            B
          </span>

          <span>
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

              <div class="flex items-center gap-3">
                <span
                  id="navbar-credits"
                  class="rounded-full border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm font-medium"
                >
                  Loading...
                </span>

                <a
                  href="${sitePath("profile.html")}"
                  aria-label="View profile"
                >
                  <img
                    id="navbar-avatar"
                    src="${
                      user.avatar?.url ||
                      "/src/assets/images/placeholder-image.png"
                    }"
                    alt=""
                    class="h-9 w-9 rounded-full object-cover"
                  />
                </a>

                <button
                  id="logout-button"
                  type="button"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  Log out
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

              <div class="flex items-center gap-2">
                <a
                  href="${sitePath("login.html")}"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
                >
                  Log in
                </a>

                <a
                  href="${sitePath("register.html")}"
                  class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
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
    updateNavbarProfile(navbar, user);
  }
}

async function updateNavbarProfile(navbar, user) {
  const creditsElement = navbar.querySelector("#navbar-credits");
  const avatarElement = navbar.querySelector("#navbar-avatar");

  try {
    const profile = await getProfile(user.name);

    if (creditsElement) {
      creditsElement.textContent = `${profile.credits.toLocaleString("no-NO")} cr`;
    }

    if (avatarElement && profile.avatar?.url) {
      avatarElement.src = profile.avatar.url;
    }
  } catch (error) {
    globalThis.console?.error("Failed to load navbar profile:", error);

    if (creditsElement) {
      creditsElement.textContent = "0 cr";
    }
  }
}
