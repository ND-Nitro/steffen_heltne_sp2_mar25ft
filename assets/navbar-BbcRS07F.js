(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=``){return`/steffen_heltne_sp2_mar25ft/${e.replace(/^\/+/,``)}`}function t(){window.localStorage.removeItem(`accessToken`),window.localStorage.removeItem(`apiKey`),window.localStorage.removeItem(`user`),window.location.href=e()}var n=`https://v2.api.noroff.dev`,r={auth:{register:`/auth/register`,login:`/auth/login`,apiKey:`/auth/create-api-key`},auction:{listings:`/auction/listings`,profiles:`/auction/profiles`}};async function i(e){let t=`${n}${r.auth.apiKey}`,i=await fetch(t,{method:`POST`,headers:{Authorization:`Bearer ${e}`,"Content-Type":`application/json`},body:JSON.stringify({name:`Blackmarket Inc`})}),a=await i.json();if(!i.ok){let e=a.errors?.[0]?.message||`Unable to create API key.`;throw Error(e)}return a.data.key}async function a(e){let t=window.localStorage.getItem(`accessToken`);if(!t)throw Error(`You must be logged in to access the profile`);let a=window.localStorage.getItem(`apiKey`);a||(a=await i(t),window.localStorage.setItem(`apiKey`,a));let o=`${n}${r.auction.profiles}/${e}?_listings=true&_wins=true`,s=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"X-Noroff-API-Key":a}}),c=await s.json();if(!s.ok){let e=c.errors?.[0]?.message||`Unable to load profile`;throw Error(e)}return c.data}function o(){let n=globalThis.document?.querySelector(`#navbar`);if(!n)return;let r=globalThis.localStorage?.getItem(`user`),i=r?JSON.parse(r):null,a=!!i;n.innerHTML=`
    <nav class="border-b border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4"
      >

        <a
          href="${e()}"
          class="flex min-w-0 items-center gap-2 font-bold"
          aria-label="Blackmarket Inc home"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white"
          >
            B
          </span>

          <span class="hidden text-lg sm:inline md:text-xl">
            Blackmarket <span class="text-blue-600">Inc</span>
          </span>
        </a>

        ${a?`
              <div class="hidden items-center gap-6 md:flex">
                <a
                  href="${e(`#browse`)}"
                  class="text-sm font-medium text-blue-600"
                >
                  Browse
                </a>

                <a
                  href="${e(`create.html`)}"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  Create Listing
                </a>

                <a
                  href="${e(`profile.html`)}"
                  class="text-sm text-gray-600 hover:text-blue-600"
                >
                  My Profile
                </a>
              </div>

              <div class="flex min-w-0 items-center gap-2 sm:gap-3">
                <span
                  id="navbar-credits"
                  class="whitespace-nowrap rounded-full border border-yellow-300 bg-yellow-50 px-2 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-sm"
                >
                  Loading...
                </span>

                <a
                  href="${e(`profile.html`)}"
                  aria-label="View profile"
                  class="shrink-0"
                >
                  <img
                    id="navbar-avatar"
                    src="${i.avatar?.url||`/src/assets/images/placeholder-image.png`}"
                    alt=""
                    class="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                  />
                </a>

                <button
                  id="logout-button"
                  type="button"
                  class="shrink-0 rounded-lg border border-gray-300 px-2.5 py-2 text-xs sm:px-4 sm:text-sm"
                >
                  <span class="sm:hidden">Out</span>
                  <span class="hidden sm:inline">Log out</span>
                </button>
              </div>
            `:`
              <a
                href="${e(`#browse`)}"
                class="hidden text-sm font-medium text-blue-600 md:block"
              >
                Browse
              </a>

              <div class="flex shrink-0 items-center gap-2">
                <a
                  href="${e(`login.html`)}"
                  class="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm"
                >
                  Log in
                </a>

                <a
                  href="${e(`register.html`)}"
                  class="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm"
                >
                  Register
                </a>
              </div>
            `}

      </div>
    </nav>
  `,n.querySelector(`#logout-button`)?.addEventListener(`click`,t),a&&s(n,i)}async function s(e,t){let n=e.querySelector(`#navbar-credits`),r=e.querySelector(`#navbar-avatar`);try{let e=await a(t.name);n&&(n.textContent=`${e.credits.toLocaleString(`no-NO`)} cr`),r&&e.avatar?.url&&(r.src=e.avatar.url)}catch(e){globalThis.console?.error(`Failed to load navbar profile:`,e),n&&(n.textContent=`0 cr`)}}export{r as a,n as i,a as n,e as o,i as r,o as t};