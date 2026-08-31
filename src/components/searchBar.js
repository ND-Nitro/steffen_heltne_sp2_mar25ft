export function renderSearchBar() {
  const searchBarElement = globalThis.document?.querySelector("#search-bar");

  if (!searchBarElement) return;

  searchBarElement.innerHTML = `
    <div class="relative w-full">
    <label for="listing-search" class="sr-only">
    search listings
    </label>

    <span 
    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 aria-hidden="true">

     <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="h-4 w-4"
        >
                 <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </span>

      <input
        id="listing-search"
        type="search"
        placeholder="Search listings..."
        class="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  `;
}
