(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){window.localStorage.removeItem(`accessToken`),window.localStorage.removeItem(`apiKey`),window.localStorage.removeItem(`user`),window.location.href=`/`}var t=`https://v2.api.noroff.dev`,n={auth:{register:`/auth/register`,login:`/auth/login`,apiKey:`/auth/create-api-key`},auction:{listings:`/auction/listings`,profiles:`/auction/profiles`}};async function r(e){let r=`${t}${n.auth.apiKey}`,i=await fetch(r,{method:`POST`,headers:{Authorization:`Bearer ${e}`,"Content-Type":`application/json`},body:JSON.stringify({name:`Blackmarket Inc`})}),a=await i.json();if(!i.ok){let e=a.errors?.[0]?.message||`Unable to create API key.`;throw Error(e)}return a.data.key}async function i(e){let i=window.localStorage.getItem(`accessToken`);if(!i)throw Error(`You must be logged in to access the profile`);let a=window.localStorage.getItem(`apiKey`);a||(a=await r(i),window.localStorage.setItem(`apiKey`,a));let o=`${t}${n.auction.profiles}/${e}?_listings=true&_wins=true`,s=await fetch(o,{headers:{Authorization:`Bearer ${i}`,"X-Noroff-API-Key":a}}),c=await s.json();if(!s.ok){let e=c.errors?.[0]?.message||`Unable to load profile`;throw Error(e)}return c.data}function a(){let t=globalThis.document?.querySelector(`#navbar`);if(!t)return;let n=globalThis.localStorage?.getItem(`user`),r=n?JSON.parse(n):null,i=!!r;t.innerHTML=`
    <nav class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        <a href="/" class="flex items-center gap-2 text-xl font-bold">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"
          >
            B
          </span>

          <span>
            Blackmarket <span class="text-blue-600">Inc</span>
          </span>
        </a>

        ${i?`
              <div class="hidden items-center gap-6 md:flex">
                <a
                  href="/#browse"
                  class="text-sm font-medium text-blue-600"
                >
                  Browse
                </a>

                <a
                  href="/create.html"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  Create Listing
                </a>

                <a
                  href="/profile.html"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  My Profile
                </a>
              </div>

              <div class="flex items-center gap-3">
                <span
                  id="navbar-credits"
                  class="rounded-full border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm font-medium"
                >
                  Loading...
                </span>

                <a
                  href="/profile.html"
                  aria-label="View profile"
                >
                  <img
                    id="navbar-avatar"
                    src="${r.avatar?.url||`/src/assets/images/placeholder-image.png`}"
                    alt=""
                    class="h-9 w-9 rounded-full object-cover"
                  />
                </a>

                <button
                  id="logout-button"
                  type="button"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  Log out
                </button>
              </div>
            `:`
              <a
                href="/#browse"
                class="hidden text-sm font-medium text-blue-600 md:block"
              >
                Browse
              </a>

              <div class="flex items-center gap-2">
                <a
                  href="/login.html"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
                >
                  Log in
                </a>

                <a
                  href="/register.html"
                  class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Register
                </a>
              </div>
            `}

      </div>
    </nav>
  `,t.querySelector(`#logout-button`)?.addEventListener(`click`,e),i&&o(t,r)}async function o(e,t){let n=e.querySelector(`#navbar-credits`),r=e.querySelector(`#navbar-avatar`);try{let e=await i(t.name);n&&(n.textContent=`${e.credits.toLocaleString(`no-NO`)} cr`),r&&e.avatar?.url&&(r.src=e.avatar.url)}catch(e){globalThis.console?.error(`Failed to load navbar profile:`,e),n&&(n.textContent=`0 cr`)}}export{n as a,t as i,i as n,r,a as t};