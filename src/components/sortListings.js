export function renderSortListings() {
  const sortElement = globalThis.document?.querySelector("#sort-listings");

  if (!sortElement) return;

  const sortOptions = [
    { value: "hot", label: "🔥 Hot" },
    { value: "ending-soon", label: "Ending Soon" },
    { value: "newest", label: "Newest" },
    { value: "highest-bid", label: "Highest Bid" },
    { value: "lowest-bid", label: "Lowest Bid" },
  ];

  sortElement.innerHTML = `
  <div class="relative">
  <label for="listing-sort" class="sr-only">
  Sort listings
    </label>

    <select 
    id="listing-sort"
    class="cursor-pointer rounded-full border gborder-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">

    ${sortOptions
      .map(
        (option) => `
            <option value="${option.value}">
                ${option.label}
            </option>
         `,
      )
      .join("")}
      </select>
    </div>
  `;
}
