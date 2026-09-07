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

    // Find the first listing that has an image
    const featuredListing =
      listings.find((listing) => listing.media?.[0]?.url) || listings[0];

    // Only show the first 6 listings on the homepage
    const homepageListings = listings.slice(0, 6);

    renderFeaturedListing(featuredListing);
    renderListings(homepageListings);
  } catch (error) {
    globalThis.console?.error("Failed to load homepage listings:", error);
  }
}
