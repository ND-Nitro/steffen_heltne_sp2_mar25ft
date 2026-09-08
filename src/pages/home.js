import { renderFeaturedListing } from "../components/featuredListing.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderCategoryFilters } from "../components/categoryFilters.js";
import { renderSortListings } from "../components/sortListings.js";
import { renderListings } from "../components/renderListings.js";
import { getListings } from "../api/listings/getListings.js";

export async function initHomePage() {
  try {
    const listings = await getListings();

    if (!listings || listings.length === 0) {
      renderListings([]);
      return;
    }

    let searchTerm = "";
    let activeCategory = "All";

    // Find all listings that are still active
    const activeListings = listings.filter(
      (listing) => new Date(listing.endsAt).getTime() > Date.now(),
    );

    // Find the active listing that ends first
    const featuredListing = activeListings.sort(
      (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
    )[0];

    // Only show 6 listings when no search is active
    const homepageListings = listings.slice(0, 6);

    renderFeaturedListing(featuredListing);

    function updateListings() {
      let filteredListings = listings;

      // Search listings
      if (searchTerm) {
        filteredListings = filteredListings.filter((listing) => {
          const title = listing.title?.toLowerCase() || "";

          const description = listing.description?.toLowerCase() || "";

          const tags = listing.tags?.join(" ").toLowerCase() || "";

          return (
            title.includes(searchTerm) ||
            description.includes(searchTerm) ||
            tags.includes(searchTerm)
          );
        });
      }

      if (activeCategory !== "All") {
        filteredListings = filteredListings.filter((listing) =>
          listing.tags?.some(
            (tag) => tag.toLowerCase() === activeCategory.toLowerCase(),
          ),
        );
      }

      if (!searchTerm && activeCategory === "All") {
        renderListings(homepageListings);
        return;
      }

      renderListings(filteredListings);
    }

    renderSearchBar((newSearchTerm) => {
      searchTerm = newSearchTerm;
      updateListings();
    });

    renderCategoryFilters((newCategory) => {
      activeCategory = newCategory;
      updateListings();
    });

    renderSortListings();

    renderListings(homepageListings);
  } catch (error) {
    globalThis.console?.error("Failed to load homepage listings:", error);
  }
}
