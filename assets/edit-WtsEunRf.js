import{a as e,i as t,t as n}from"./navbar-DS3aPAxg.js";import{t as r}from"./getListing-D3i1S6wh.js";async function i(n,r){let i=window.localStorage.getItem(`accessToken`),a=window.localStorage.getItem(`apiKey`);if(!i||!a)throw Error(`You must be logged in to update a listing.`);let o=`${t}${e.auction.listings}/${n}`,s=await fetch(o,{method:`PUT`,headers:{Authorization:`Bearer ${i}`,"X-Noroff-API-Key":a,"Content-Type":`application/json`},body:JSON.stringify(r)}),c=await s.json();if(!s.ok){let e=c.errors?.[0]?.message||`Unable to update listing.`;throw Error(e)}return c.data}async function a(){let e=document.querySelector(`#edit-listing-page`);if(!e)return;let t=window.localStorage.getItem(`user`);if(!t){window.location.href=`/login.html`;return}let n=JSON.parse(t),i=new URLSearchParams(window.location.search).get(`id`);if(!i){c(e,`Listing ID is missing.`);return}try{let t=await r(i);if(t.seller?.name!==n.name){c(e,`You can only edit your own listings.`);return}o(e,t)}catch(t){c(e,t.message||`Unable to load listing.`)}}function o(e,t){let n=t.media?.[0]?.url||``,r=t.tags?.[0]||``;e.innerHTML=`
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
              value="${u(t.title||``)}"
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
            >${u(t.description||``)}</textarea>
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
              value="${u(n)}"
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
              value="${u(r)}"
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
              href="/listing.html?id=${t.id}"
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
  `,e.querySelector(`#edit-listing-form`)?.addEventListener(`submit`,e=>s(e,t.id))}async function s(e,t){e.preventDefault();let n=e.currentTarget,r=n.querySelector(`#listing-title`)?.value.trim()||``,a=n.querySelector(`#listing-description`)?.value.trim()||``,o=n.querySelector(`#listing-image`)?.value.trim()||``,s=n.querySelector(`#listing-category`)?.value.trim()||``,c=n.querySelector(`#edit-listing-error`),u=n.querySelector(`#save-listing-button`);if(!r){l(c,`Title is required.`);return}let d={title:r,description:a,tags:s?[s]:[],media:o?[{url:o,alt:r}]:[]};u.disabled=!0,u.textContent=`Saving...`;try{await i(t,d),window.location.href=`/listing.html?id=${t}`}catch(e){l(c,e.message||`Unable to update listing.`),u.disabled=!1,u.textContent=`Save Changes`}}function c(e,t){e.innerHTML=`
    <p class="py-10 text-center text-red-600">
      ${t}
    </p>
  `}function l(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function u(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}n(),a();