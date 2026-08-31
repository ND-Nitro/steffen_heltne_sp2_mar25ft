export function renderNavbar() {
  const navbar = globalThis.document?.querySelector("#navbar");

  if (!navbar) return;

  const storedUser = globalThis.localStorage?.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = Boolean(user);

  navbar.innerHTML = `
    <nav class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        <a href="/" class="flex items-center gap-2 text-xl font-bold">
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
                  href="#browse"
                  class="text-sm font-medium text-blue-600"
                >
                  Browse
                </a>

                <a
                  href="/create/"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  Create Listing
                </a>

                <a
                  href="/profile/"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  My Profile
                </a>
              </div>

              <div class="flex items-center gap-3">
                <span
                  class="rounded-full border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm font-medium"
                >
                  ${user.credits ?? 0} cr
                </span>

                <a
                  href="/profile/"
                  aria-label="View profile"
                >
                  <img
                    src="${user.avatar?.url ?? "/images/avatar-placeholder.png"}"
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
                href="#browse"
                class="hidden text-sm font-medium text-blue-600 md:block"
              >
                Browse
              </a>

              <div class="flex items-center gap-2">
                <a
                  href="/login/"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
                >
                  Log in
                </a>

                <a
                  href="/register/"
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
}
