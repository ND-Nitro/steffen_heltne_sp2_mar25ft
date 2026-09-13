import{a as e,i as t,o as n,t as r}from"./navbar-BbcRS07F.js";async function i(n,r,i){let a=`${t}${e.auth.register}`,o=await fetch(a,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:n,email:r,password:i})}),s=await o.json();if(!o.ok){let e=s.errors?.[0]?.message||`Unable to register account.`;throw Error(e)}return s.data}function a(){let e=document.querySelector(`#register-page`);e&&(e.innerHTML=`
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
            href="${n(`login.html`)}"
            class="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  `,e.querySelector(`#register-form`)?.addEventListener(`submit`,o))}async function o(e){e.preventDefault();let t=e.currentTarget,r=t.querySelector(`#register-name`)?.value.trim()||``,a=t.querySelector(`#register-email`)?.value.trim()||``,o=t.querySelector(`#register-password`)?.value||``,l=t.querySelector(`#register-error`),u=t.querySelector(`#register-button`);if(c(l),!r){s(l,`Username is required.`);return}if(!a.endsWith(`@stud.noroff.no`)){s(l,`You must use a valid @stud.noroff.no email address.`);return}if(o.length<8){s(l,`Password must be at least 8 characters.`);return}u.disabled=!0,u.textContent=`Creating account...`;try{await i(r,a,o),window.location.href=n(`login.html`)}catch(e){s(l,e.message||`Unable to register account.`),u.disabled=!1,u.textContent=`Register`}}function s(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function c(e){e&&(e.textContent=``,e.classList.add(`hidden`))}r(),a();