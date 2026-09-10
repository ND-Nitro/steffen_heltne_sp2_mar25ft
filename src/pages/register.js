import { registerUser } from "../api/auth/register.js";

export function initRegisterPage() {
  const registerElement = document.querySelector("#register-page");

  if (!registerElement) return;

  registerElement.innerHTML = `
    <section class="mx-auto max-w-md px-4 py-12">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 class="text-3xl font-bold text-gray-950">
          Create account
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          Register with your Noroff student email.
        </p>

        <form id="register-form" class="mt-8 space-y-5">
          <div>
            <label
              for="register-name"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="register-name"
              type="text"
              required
              autocomplete="username"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="register-email"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="register-email"
              type="email"
              required
              autocomplete="email"
              placeholder="name@stud.noroff.no"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

            <p class="mt-2 text-xs text-gray-500">
              You must use an @stud.noroff.no email address.
            </p>
          </div>

          <div>
            <label
              for="register-password"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="register-password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <p
            id="register-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <button
            id="register-button"
            type="submit"
            class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Register
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Already have an account?

          <a
            href="/login.html"
            class="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  `;

  const form = registerElement.querySelector("#register-form");

  form?.addEventListener("submit", handleRegister);
}

async function handleRegister(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const name = form.querySelector("#register-name")?.value.trim() || "";
  const email = form.querySelector("#register-email")?.value.trim() || "";
  const password = form.querySelector("#register-password")?.value || "";

  const errorElement = form.querySelector("#register-error");
  const registerButton = form.querySelector("#register-button");

  hideError(errorElement);

  if (!name) {
    showError(errorElement, "Username is required.");
    return;
  }

  if (!email.endsWith("@stud.noroff.no")) {
    showError(
      errorElement,
      "You must use a valid @stud.noroff.no email address.",
    );
    return;
  }

  if (password.length < 8) {
    showError(errorElement, "Password must be at least 8 characters.");
    return;
  }

  registerButton.disabled = true;
  registerButton.textContent = "Creating account...";

  try {
    await registerUser(name, email, password);

    window.location.href = "/login.html";
  } catch (error) {
    showError(errorElement, error.message || "Unable to register account.");

    registerButton.disabled = false;
    registerButton.textContent = "Register";
  }
}

function showError(element, message) {
  if (!element) return;

  element.textContent = message;
  element.classList.remove("hidden");
}

function hideError(element) {
  if (!element) return;

  element.textContent = "";
  element.classList.add("hidden");
}
