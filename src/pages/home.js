import { renderFeaturedListing } from "../components/featuredListing.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderCategoryFilters } from "../components/categoryFilters.js";
import { renderSortListings } from "../components/sortListings.js";
import { renderListings } from "../components/renderListings.js";
import { getListings } from "../api/listings/getListings.js";
import { getCurrentBid } from "../utils/listingHelpers.js";

export async function initHomePage() {
  try {
    const listings = await getListings();

    if (!listings || listings.length === 0) {
      renderListings([]);
      return;
    }

    let searchTerm = "";
    let activeCategory = "All";
    let activeSort = "hot"; //this is set to hot as default. that the hot listings will be shown first when the page loads.

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
      let filteredListings = [...listings];

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

      if (activeSort === "ending-soon") {
        filteredListings.sort(
          (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
        );
      }

      if (activeSort === "newest") {
        filteredListings.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      }

      if (activeSort === "highest-bid") {
        filteredListings.sort((a, b) => getCurrentBid(b) - getCurrentBid(a));
      }

      if (activeSort === "lowest-bid") {
        filteredListings.sort((a, b) => getCurrentBid(a) - getCurrentBid(b));
      }

      if (!searchTerm && activeCategory === "All" && activeSort === "hot") {
        renderListings(homepageListings);
        return;
      }

      renderListings(filteredListings.slice(0, 6));
    }

    renderSearchBar((newSearchTerm) => {
      searchTerm = newSearchTerm;
      updateListings();
    });

    renderCategoryFilters((newCategory) => {
      activeCategory = newCategory;
      updateListings();
    });

    renderSortListings((newSort) => {
      activeSort = newSort;
      updateListings();
    });

    renderListings(homepageListings);
  } catch (error) {
    globalThis.console?.error("Failed to load homepage listings:", error);
  }
}
