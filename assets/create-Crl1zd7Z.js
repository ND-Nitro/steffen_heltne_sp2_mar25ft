import{a as e,i as t,o as n,t as r}from"./navbar-DtWy4hFO.js";async function i(n){let r=window.localStorage.getItem(`accessToken`),i=window.localStorage.getItem(`apiKey`);if(!r||!i)throw Error(`You must be logged in to create a listing.`);let a=`${t}${e.auction.listings}`,o=await fetch(a,{method:`POST`,headers:{Authorization:`Bearer ${r}`,"X-Noroff-API-Key":i,"Content-Type":`application/json`},body:JSON.stringify(n)}),s=await o.json();if(!o.ok){let e=s.errors?.[0]?.message||`Unable to create listing.`;throw Error(e)}return s.data}function a(){let e=document.querySelector(`#create-listing-page`);if(e){if(!window.localStorage.getItem(`user`)){window.location.href=n(`login.html`);return}o(e)}}function o(e){e.innerHTML=`
    <section class="mx-auto max-w-2xl px-4 py-10">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 class="text-3xl font-bold text-gray-950">
          Create Listing
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          Create a new auction listing.
        </p>

        <form id="create-listing-form" class="mt-8 space-y-5">

          <div>
            <label
              for="listing-title"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              id="listing-title"
              name="title"
              type="text"
              required
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
              name="description"
              rows="5"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            ></textarea>
          </div>

          <fieldset class="space-y-3">
            <legend class="text-sm font-medium text-gray-700">
              Media gallery
            </legend>

            <p class="text-sm text-gray-500">
              Add up to 3 image URLs.
            </p>

            <div>
              <label
                for="listing-image-1"
                class="mb-2 block text-sm text-gray-600"
              >
                Image URL 1
              </label>

              <input
                id="listing-image-1"
                name="image-1"
                type="url"
                placeholder="https://example.com/image-1.jpg"
                class="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>

            <div>
              <label
                for="listing-image-2"
                class="mb-2 block text-sm text-gray-600"
              >
                Image URL 2
              </label>

              <input
                id="listing-image-2"
                name="image-2"
                type="url"
                placeholder="https://example.com/image-2.jpg"
                class="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>

            <div>
              <label
                for="listing-image-3"
                class="mb-2 block text-sm text-gray-600"
              >
                Image URL 3
              </label>

              <input
                id="listing-image-3"
                name="image-3"
                type="url"
                placeholder="https://example.com/image-3.jpg"
                class="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>
          </fieldset>

          <div>
            <label
              for="listing-category"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="listing-category"
              name="category"
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Art">Art</option>
              <option value="Fashion">Fashion</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div>
            <label
              for="listing-deadline"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>

            <input
              id="listing-deadline"
              name="deadline"
              type="datetime-local"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <p
            id="create-listing-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <div class="flex gap-3">
            <a
              href="${n()}"
              class="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold"
            >
              Cancel
            </a>

            <button
              id="create-listing-button"
              type="submit"
              class="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  `,e.querySelector(`#create-listing-form`)?.addEventListener(`submit`,s)}async function s(e){e.preventDefault();let t=e.currentTarget,r=t.querySelector(`#listing-title`)?.value.trim()||``,a=t.querySelector(`#listing-description`)?.value.trim()||``,o=[t.querySelector(`#listing-image-1`)?.value.trim()||``,t.querySelector(`#listing-image-2`)?.value.trim()||``,t.querySelector(`#listing-image-3`)?.value.trim()||``].filter(Boolean),s=t.querySelector(`#listing-category`)?.value||``,d=t.querySelector(`#listing-deadline`)?.value||``,f=t.querySelector(`#create-listing-error`),p=t.querySelector(`#create-listing-button`);if(l(f),!r||!d){c(f,`Title and deadline are required.`);return}let m=new Date(d).toISOString();if(new Date(m).getTime()<=Date.now()){c(f,`Deadline must be in the future.`);return}let h={title:r,endsAt:m};a&&(h.description=a),s&&(h.tags=[s]),o.length>0&&(h.media=o.map((e,t)=>({url:e,alt:`${r} image ${t+1}`}))),u(p,!0);try{let e=await i(h);window.location.href=n(`listing.html?id=${e.id}`)}catch(e){c(f,e.message||`Unable to create listing.`)}finally{u(p,!1)}}function c(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function l(e){e&&(e.textContent=``,e.classList.add(`hidden`))}function u(e,t){e&&(e.disabled=t,e.textContent=t?`Publishing...`:`Publish`)}r(),a();