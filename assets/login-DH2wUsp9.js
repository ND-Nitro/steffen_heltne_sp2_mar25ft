import{a as e,i as t,o as n,r,t as i}from"./navbar-BbcRS07F.js";async function a(n,r){let i=`${t}${e.auth.login}`,a=await globalThis.fetch(i,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({email:n,password:r})}),o=await a.json();if(!a.ok){let e=o.errors?.[0]?.message||`Unable to log in.`;throw Error(e)}return o.data}function o(){let e=globalThis.document?.querySelector(`#login-page`);e&&s(e)}function s(e){e.innerHTML=`
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
            href="${n(`register.html`)}"
            class="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Create account
          </a>
        </div>
      </div>
    </section>
  `,e.querySelector(`#login-form`)?.addEventListener(`submit`,c)}async function c(e){e.preventDefault();let t=e.currentTarget,i=t.querySelector(`#login-email`),o=t.querySelector(`#login-password`),s=t.querySelector(`#login-error`),c=t.querySelector(`#login-button`),p=i?.value.trim().toLowerCase()||``,m=o?.value||``;if(d(s),!p.endsWith(`@stud.noroff.no`)){u(s,`Email must end with @stud.noroff.no`);return}if(!m){u(s,`Please enter your password.`);return}f(c,!0);try{let e=await a(p,m);l(e);let t=await r(e.accessToken);globalThis.localStorage.setItem(`apiKey`,t),globalThis.location.href=n()}catch(e){u(s,e.message||`Unable to log in.`)}finally{f(c,!1)}}function l(e){e.accessToken&&globalThis.localStorage.setItem(`accessToken`,e.accessToken),globalThis.localStorage.setItem(`user`,JSON.stringify(e))}function u(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function d(e){e&&(e.textContent=``,e.classList.add(`hidden`))}function f(e,t){e&&(e.disabled=t,e.textContent=t?`Logging in...`:`Log in`)}i(),o();