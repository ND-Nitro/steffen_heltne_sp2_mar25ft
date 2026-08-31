export function renderCategoryFilters() {
  const categoryFilterElement =
    globalThis.document?.querySelector("#category-filters");

  if (!categoryFilterElement) return;

  const categories = [
    "All",
    "Electronics",
    "Collectibles",
    "Art",
    "Fashion",
    "Vehicles",
    "Jewelry",
    "Books",
    "Sports",
  ];

  let activeCategory = "All";

  function renderButtons() {
    categoryFilterElement.innerHTML = `
      <div class="flex gap-2 overflow-x-auto pb-2">
        ${categories
          .map((category) => {
            const isActive = category === activeCategory;

            return `
              <button
                type="button"
                data-category="${category}"
                class="whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition
                  ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-500 hover:text-blue-600"
                  }"
              >
                ${category}
              </button>
            `;
          })
          .join("")}
      </div>
    `;

    const categoryButtons =
      categoryFilterElement.querySelectorAll("[data-category]");

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        renderButtons();
      });
    });
  }

  renderButtons();
}
