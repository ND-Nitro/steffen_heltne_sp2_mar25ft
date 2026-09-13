import{a as e,i as t,o as n,t as r}from"./navbar-DtWy4hFO.js";import{n as i,t as a}from"./listingHelpers-2C99nZkf.js";var o;function s(e){let t=globalThis.document?.querySelector(`#featured-listing`);if(!t)return;let r=n(`images/placeholder-image.webp`),o=e.media?.[0]?.url||r,s=e.media?.[0]?.alt||e.title||`Featured listing`,u=e.tags?.[0]||`Featured`,d=a(e).toLocaleString(`no-NO`),f=i(e.endsAt);t.innerHTML=`
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div class="relative">
        <img
          src="${o}"
          alt="${s}"
          onerror="this.onerror=null; this.src='${r}';"
          class="h-48 w-full object-cover sm:h-56 md:h-72 lg:h-80"
        />

        <div class="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
          <span
            class="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm sm:px-3 sm:text-xs"
          >
            🔴 Ending Soon
          </span>

          <span
            class="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm sm:px-3 sm:text-xs"
          >
            🔥 Featured
          </span>
        </div>
      </div>

      <div class="p-4 sm:p-5 md:p-6">
        <span
          class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
        >
          ${u}
        </span>

        <h2
          class="mt-3 text-xl font-bold leading-tight text-gray-950 sm:text-2xl md:text-3xl"
        >
          ${e.title||`Featured listing`}
        </h2>

        <p
          class="mt-3 text-sm leading-6 text-gray-600 md:max-w-4xl md:text-base"
        >
          ${e.description||`No description available.`}
        </p>

        <div
          class="mt-5 grid grid-cols-2 gap-4 sm:flex sm:items-end sm:gap-10"
        >
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs"
            >
              Current Bid
            </p>

            <p class="mt-1 text-2xl font-bold text-blue-600 sm:text-3xl">
              ${d} cr
            </p>
          </div>

          <div class="min-w-0">
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs"
            >
              Ends In
            </p>

            <p
              id="featured-countdown"
              class="mt-1 whitespace-nowrap text-xl font-bold tracking-tight text-orange-500 sm:text-2xl md:text-3xl md:tracking-wide"
            >
              ${c(f)}
            </p>

            <div
              class="mt-1 grid grid-cols-4 text-center text-[9px] font-medium uppercase text-gray-400 sm:text-[10px]"
            >
              <span>Days</span>
              <span>Hrs</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href="${n(`listing.html?id=${e.id}`)}"
            class="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Place Bid
          </a>

          <a
            href="${n(`listing.html?id=${e.id}`)}"
            class="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  `,l(e.endsAt)}function c(e){return e.ended?`ENDED`:`${e.days} : ${e.hours} : ${e.minutes} : ${e.seconds}`}function l(e){o&&globalThis.clearInterval(o),o=globalThis.setInterval(()=>{let t=globalThis.document?.querySelector(`#featured-countdown`);if(!t){globalThis.clearInterval(o);return}let n=i(e);t.textContent=c(n),n.ended&&globalThis.clearInterval(o)},1e3)}function u(e){let t=globalThis.document?.querySelector(`#search-bar`);t&&(t.innerHTML=`
    <div class="relative w-full">
      <label for="listing-search" class="sr-only">
        Search listings
      </label>

      <span
        class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="h-4 w-4"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </span>

      <input
        id="listing-search"
        type="search"
        placeholder="Search listings..."
        class="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  `,t.querySelector(`#listing-search`)?.addEventListener(`input`,t=>{e(t.target.value.trim().toLowerCase())}))}function d(e){let t=globalThis.document?.querySelector(`#category-filters`);if(!t)return;let n=[`All`,`Electronics`,`Collectibles`,`Art`,`Fashion`,`Vehicles`,`Jewelry`,`Books`,`Sports`],r=`All`;function i(){t.innerHTML=`
      <div class="flex gap-2 overflow-x-auto pb-2">
        ${n.map(e=>`
              <button
                type="button"
                data-category="${e}"
                class="whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition
                  ${e===r?`border-blue-600 bg-blue-600 text-white`:`border-gray-200 bg-white text-gray-600 hover:border-blue-500 hover:text-blue-600`}"
              >
                ${e}
              </button>
            `).join(``)}
      </div>
    `,t.querySelectorAll(`[data-category]`).forEach(t=>{t.addEventListener(`click`,()=>{r=t.dataset.category,i(),e&&e(r)})})}i()}function f(e){let t=globalThis.document?.querySelector(`#sort-listings`);t&&(t.innerHTML=`
  <div class="relative">
  <label for="listing-sort" class="sr-only">
  Sort listings
    </label>

    <select 
    id="listing-sort"
    class="cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">

    ${[{value:`hot`,label:`🔥 Hot`},{value:`ending-soon`,label:`Ending Soon`},{value:`newest`,label:`Newest`},{value:`highest-bid`,label:`Highest Bid`},{value:`lowest-bid`,label:`Lowest Bid`}].map(e=>`
            <option value="${e.value}">
                ${e.label}
            </option>
         `).join(``)}
      </select>
    </div>
  `,t.querySelector(`#listing-sort`)?.addEventListener(`change`,t=>{e(t.target.value)}))}function p(e){let t=n(`images/placeholder-image.webp`),r=e.media?.[0]?.url||t,o=e.media?.[0]?.alt||e.title||`Auction listing`,s=e.tags?.[0]||`Other`,c=a(e).toLocaleString(`no-NO`),l=i(e.endsAt),u=e.seller?.name||`Unknown seller`,d=e.seller?.avatar?.url||t,f=e._count?.bids??e.bids?.length??0;return`
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div class="relative">

        <img
          src="${r}"
          alt="${o}"
          onerror="this.onerror=null; this.src='${t}';"
          class="h-56 w-full object-cover"
        />

        <span
          class="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
        >
          ${s}
        </span>

        <span
          class="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-500 shadow-sm"
        >
          ${l.short}
        </span>

      </div>

      <div class="p-5">

        <h3
          class="text-lg font-semibold leading-snug text-gray-900"
        >
          ${e.title||`Untitled listing`}
        </h3>

        <div class="mt-3 flex items-center gap-2">

          <img
            src="${d}"
            alt="${u}"
            onerror="this.onerror=null; this.src='${t}';"
            class="h-7 w-7 rounded-full object-cover"
          />

          <span class="text-sm text-gray-500">
            ${u}
          </span>

        </div>

        <div
          class="mt-4 flex items-end justify-between gap-4 border-t border-gray-100 pt-4"
        >

          <div>
            <p class="text-xs text-gray-400">
              ${f} ${f===1?`bid`:`bids`}
            </p>

            <p class="mt-1 text-xl font-bold text-orange-500">
              ${c} cr
            </p>
          </div>

          <a
            href="${n(`listing.html?id=${e.id}`)}"
            class="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View →
          </a>

        </div>

      </div>
    </article>
  `}function m(e){let t=globalThis.document?.querySelector(`#listings`);if(t){if(!e||e.length===0){t.innerHTML=`
        <p class="py-8 text-center text-gray-500">
            No listings found.
        </p>
        `;return}t.innerHTML=`
    <div class="mb-4">
    <p class="text-sm text-gray-500">
    ${e.length} listing found 
    </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    ${e.map(e=>p(e)).join(``)}
    </div>
    `}}async function h(){let n=`${t}${e.auction.listings}?_active=true&_bids=true&_seller=true`,r=await globalThis.fetch(n);if(!r.ok)throw Error(`Failed to fetch listings: ${r.status} ${r.statusText}`);let{data:i}=await r.json();return i}async function g(){try{let e=await h();if(!e||e.length===0){m([]);return}let t=``,n=`All`,r=`hot`,i=e.filter(e=>new Date(e.endsAt).getTime()>Date.now()).sort((e,t)=>new Date(e.endsAt).getTime()-new Date(t.endsAt).getTime())[0],o=e.slice(0,6);s(i);function c(){let i=[...e];if(t&&(i=i.filter(e=>{let n=e.title?.toLowerCase()||``,r=e.description?.toLowerCase()||``,i=e.tags?.join(` `).toLowerCase()||``;return n.includes(t)||r.includes(t)||i.includes(t)})),n!==`All`&&(i=i.filter(e=>e.tags?.some(e=>e.toLowerCase()===n.toLowerCase()))),r===`ending-soon`&&i.sort((e,t)=>new Date(e.endsAt).getTime()-new Date(t.endsAt).getTime()),r===`newest`&&i.sort((e,t)=>new Date(t.created).getTime()-new Date(e.created).getTime()),r===`highest-bid`&&i.sort((e,t)=>a(t)-a(e)),r===`lowest-bid`&&i.sort((e,t)=>a(e)-a(t)),!t&&n===`All`&&r===`hot`){m(o);return}m(i.slice(0,6))}u(e=>{t=e,c()}),d(e=>{n=e,c()}),f(e=>{r=e,c()}),m(o)}catch(e){globalThis.console?.error(`Failed to load homepage listings:`,e)}}r(),g();