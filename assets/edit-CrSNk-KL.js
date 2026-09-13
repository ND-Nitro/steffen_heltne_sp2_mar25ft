import{a as e,i as t,o as n,t as r}from"./navbar-Aux6msdz.js";import{t as i}from"./getListing-62zI37Ul.js";async function a(n,r){let i=window.localStorage.getItem(`accessToken`),a=window.localStorage.getItem(`apiKey`);if(!i||!a)throw Error(`You must be logged in to update a listing.`);let o=`${t}${e.auction.listings}/${n}`,s=await fetch(o,{method:`PUT`,headers:{Authorization:`Bearer ${i}`,"X-Noroff-API-Key":a,"Content-Type":`application/json`},body:JSON.stringify(r)}),c=await s.json();if(!s.ok){let e=c.errors?.[0]?.message||`Unable to update listing.`;throw Error(e)}return c.data}async function o(){let e=document.querySelector(`#edit-listing-page`);if(!e)return;let t=window.localStorage.getItem(`user`);if(!t){window.location.href=n(`login.html`);return}let r=JSON.parse(t),a=new URLSearchParams(window.location.search).get(`id`);if(!a){l(e,`Listing ID is missing.`);return}try{let t=await i(a);if(t.seller?.name!==r.name){l(e,`You can only edit your own listings.`);return}s(e,t)}catch(t){l(e,t.message||`Unable to load listing.`)}}function s(e,t){let r=t.media?.[0]?.url||``,i=t.tags?.[0]||``;e.innerHTML=`
    <section class="mx-auto max-w-2xl px-4 py-10">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h1 class="text-3xl font-bold text-gray-950">
          Edit Listing
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          Update your auction listing.
        </p>

        <form id="edit-listing-form" class="mt-8 space-y-5">

          <div>
            <label
              for="listing-title"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              id="listing-title"
              type="text"
              required
              value="${d(t.title||``)}"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="listing-description"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="listing-description"
              rows="5"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            >${d(t.description||``)}</textarea>
          </div>

          <div>
            <label
              for="listing-image"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>

            <input
              id="listing-image"
              type="url"
              value="${d(r)}"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="listing-category"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <input
              id="listing-category"
              type="text"
              value="${d(i)}"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <p
            id="edit-listing-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <div class="flex gap-3">
            <a
              href="${n(`listing.html?id=${t.id}`)}"
              class="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold"
            >
              Cancel
            </a>

            <button
              id="save-listing-button"
              type="submit"
              class="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </section>
  `,e.querySelector(`#edit-listing-form`)?.addEventListener(`submit`,e=>c(e,t.id))}async function c(e,t){e.preventDefault();let n=e.currentTarget,r=n.querySelector(`#listing-title`)?.value.trim()||``,i=n.querySelector(`#listing-description`)?.value.trim()||``,o=n.querySelector(`#listing-image`)?.value.trim()||``,s=n.querySelector(`#listing-category`)?.value.trim()||``,c=n.querySelector(`#edit-listing-error`),l=n.querySelector(`#save-listing-button`);if(!r){u(c,`Title is required.`);return}let d={title:r,description:i,tags:s?[s]:[],media:o?[{url:o,alt:r}]:[]};l.disabled=!0,l.textContent=`Saving...`;try{await a(t,d),window.location.href=`/listing.html?id=${t}`}catch(e){u(c,e.message||`Unable to update listing.`),l.disabled=!1,l.textContent=`Save Changes`}}function l(e,t){e.innerHTML=`
    <p class="py-10 text-center text-red-600">
      ${t}
    </p>
  `}function u(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function d(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}r(),o();