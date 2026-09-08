// reused login function that is build before and are modified to fit the login page and the login form
import { loginUser } from "../api/auth/login.js";

export function initLoginPage() {
  const loginElement = globalThis.document?.querySelector("#login-page");

  if (!loginElement) return;

  renderLoginForm(loginElement);
}

function renderLoginForm(loginElement) {
  loginElement.innerHTML = `
    <section
      class="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10"
    >
      <div
        class="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-950">
            Log in
          </h1>

          <p class="mt-2 text-sm text-gray-500">
            Log in to your Blackmarket Inc account.
          </p>
        </div>

        <form
          id="login-form"
          class="mt-8 space-y-5"
        >
          <div>
            <label
              for="login-email"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="login-email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@stud.noroff.no"
              required
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p class="mt-2 text-xs text-gray-500">
              Your email must end with @stud.noroff.no
            </p>
          </div>

          <div>
            <label
              for="login-password"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="login-password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <p
            id="login-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <button
            id="login-button"
            type="submit"
            class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log in
          </button>
        </form>

        <div
          class="mt-6 border-t border-gray-200 pt-6 text-center"
        >
          <p class="text-sm text-gray-500">
            Don't have an account?
          </p>

          <a
            href="/register.html"
            class="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Create account
          </a>
        </div>
      </div>
    </section>
  `;

  const loginForm = loginElement.querySelector("#login-form");

  loginForm?.addEventListener("submit", handleLoginSubmit);
}

async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const emailInput = form.querySelector("#login-email");

  const passwordInput = form.querySelector("#login-password");

  const errorElement = form.querySelector("#login-error");

  const loginButton = form.querySelector("#login-button");

  const email = emailInput?.value.trim().toLowerCase() || "";

  const password = passwordInput?.value || "";

  hideError(errorElement);

  if (!email.endsWith("@stud.noroff.no")) {
    showError(errorElement, "Email must end with @stud.noroff.no");

    return;
  }

  if (!password) {
    showError(errorElement, "Please enter your password.");

    return;
  }

  setLoadingState(loginButton, true);

  try {
    const user = await loginUser(email, password);

    saveUserSession(user);

    globalThis.location.href = "/";
  } catch (error) {
    showError(errorElement, error.message || "Unable to log in.");
  } finally {
    setLoadingState(loginButton, false);
  }
}

function saveUserSession(user) {
  if (user.accessToken) {
    globalThis.localStorage.setItem("accessToken", user.accessToken);
  }

  globalThis.localStorage.setItem("user", JSON.stringify(user));
}

function showError(errorElement, message) {
  if (!errorElement) return;

  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError(errorElement) {
  if (!errorElement) return;

  errorElement.textContent = "";
  errorElement.classList.add("hidden");
}

function setLoadingState(button, isLoading) {
  if (!button) return;

  button.disabled = isLoading;

  button.textContent = isLoading ? "Logging in..." : "Log in";
}
