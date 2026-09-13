import{a as e,i as t,t as n}from"./navbar-DS3aPAxg.js";async function r(n,r,i){let a=`${t}${e.auth.register}`,o=await fetch(a,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:n,email:r,password:i})}),s=await o.json();if(!o.ok){let e=s.errors?.[0]?.message||`Unable to register account.`;throw Error(e)}return s.data}function i(){let e=document.querySelector(`#register-page`);e&&(e.innerHTML=`
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
  `,e.querySelector(`#register-form`)?.addEventListener(`submit`,a))}async function a(e){e.preventDefault();let t=e.currentTarget,n=t.querySelector(`#register-name`)?.value.trim()||``,i=t.querySelector(`#register-email`)?.value.trim()||``,a=t.querySelector(`#register-password`)?.value||``,c=t.querySelector(`#register-error`),l=t.querySelector(`#register-button`);if(s(c),!n){o(c,`Username is required.`);return}if(!i.endsWith(`@stud.noroff.no`)){o(c,`You must use a valid @stud.noroff.no email address.`);return}if(a.length<8){o(c,`Password must be at least 8 characters.`);return}l.disabled=!0,l.textContent=`Creating account...`;try{await r(n,i,a),window.location.href=`/login.html`}catch(e){o(c,e.message||`Unable to register account.`),l.disabled=!1,l.textContent=`Register`}}function o(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function s(e){e&&(e.textContent=``,e.classList.add(`hidden`))}n(),i();