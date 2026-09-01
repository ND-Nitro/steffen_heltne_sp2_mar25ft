import { renderFeaturedListing } from "../components/featuredListing.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderCategoryFilters } from "../components/categoryFilters.js";
import { renderSortListings } from "../components/sortListings.js";
import { renderListings } from "../components/renderListings.js";
import { getListings } from "../api/listings/getListings.js";

export async function initHomePage() {
  renderSearchBar();
  renderCategoryFilters();
  renderSortListings();

  try {
    const listings = await getListings();

    if (!listings || listings.length === 0) {
      renderListings([]);
      return;
    }

    const featuredListing = listings[0];

    renderFeaturedListing(featuredListing);
    renderListings(listings);
  } catch (error) {
    globalThis.console?.error("Failed to load homepage listings:", error);
  }
}
