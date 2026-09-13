/**
 * Creates a path that works both locally and when deployed to GitHub Pages.
 * @param {string} path - The relative application path.
 * @returns {string} A path prefixed with the current Vite base URL.
 */
export function sitePath(path = "") {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, "");

  return `${base}${cleanPath}`;
}
