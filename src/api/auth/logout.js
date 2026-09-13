import { sitePath } from "../../utils/sitePath.js";
/**
 * Logs out the current user by clearing stored authentication data
 * and redirecting to the home page.
 * @returns {void}
 */
export function logoutUser() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("apiKey");
  window.localStorage.removeItem("user");

  window.location.href = sitePath();
}
