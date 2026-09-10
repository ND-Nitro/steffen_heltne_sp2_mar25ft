export function logoutUser() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("apiKey");
  window.localStorage.removeItem("user");

  window.location.href = "/";
}
