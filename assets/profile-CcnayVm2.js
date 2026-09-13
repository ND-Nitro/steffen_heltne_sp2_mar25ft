import{a as e,i as t,n,o as r,t as i}from"./navbar-BbcRS07F.js";async function a(n){let r=window.localStorage.getItem(`accessToken`),i=window.localStorage.getItem(`apiKey`);if(!r||!i)throw Error(`You must be logged in to view your bids.`);let a=`${t}${e.auction.profiles}/${n}/bids?_listings=true`,o=await fetch(a,{headers:{Authorization:`Bearer ${r}`,"X-Noroff-API-Key":i}}),s=await o.json();if(!o.ok){let e=s.errors?.[0]?.message||`Unable to load your bids.`;throw Error(e)}return s.data}async function o(n,r){let i=window.localStorage.getItem(`accessToken`),a=window.localStorage.getItem(`apiKey`);if(!i||!a)throw Error(`You must be logged in to update your profile.`);let o=`${t}${e.auction.profiles}/${n}`,s=await fetch(o,{method:`PUT`,headers:{Authorization:`Bearer ${i}`,"X-Noroff-API-Key":a,"Content-Type":`application/json`},body:JSON.stringify(r)}),c=await s.json();if(!s.ok){let e=c.errors?.[0]?.message||`Unable to update profile.`;throw Error(e)}return c.data}async function s(){let e=document.querySelector(`#profile-page`);if(!e)return;let t=window.localStorage.getItem(`user`);if(!t){window.location.href=r(`login.html`);return}let i=JSON.parse(t);try{let[t,r]=await Promise.all([n(i.name),a(i.name)]);c(e,t,r)}catch(t){console.error(`Failed to load profile:`,t),e.innerHTML=`
      <p class="py-10 text-center text-red-600">
        Failed to load profile.
      </p>
    `}}function c(e,t,n=[]){let i=t.avatar?.url||`/src/assets/images/placeholder-image.png`,a=t.banner?.url||``,o=t.bio||`No bio added yet.`,s=t.credits??0,c=t.listings||[],d=t._count?.listings??c.length,h=f(n);e.innerHTML=`
    <section class="mx-auto max-w-6xl px-4 py-8">

      <div
        class="h-48 rounded-2xl bg-gray-200 bg-cover bg-center"
        ${a?`style="background-image: url('${a}');"`:``}
      ></div>

      <div class="-mt-12 px-4">
        <img
          src="${i}"
          alt="${t.name}'s avatar"
          onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
          class="h-24 w-24 rounded-full border-4 border-white object-cover"
        />
      </div>

      <div class="mt-4">
        <h1 class="text-3xl font-bold text-gray-950">
          ${t.name}
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          ${t.email}
        </p>

        <p class="mt-4 max-w-2xl text-gray-600">
          ${o}
        </p>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-sm text-gray-500">
            Credits
          </p>

          <p class="mt-1 text-2xl font-bold text-orange-500">
            ${s.toLocaleString(`no-NO`)} cr
          </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-sm text-gray-500">
            Listings
          </p>

          <p class="mt-1 text-2xl font-bold text-gray-950">
            ${d}
          </p>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="${r(`create.html`)}"
          class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Create Listing
        </a>

        <button
          type="button"
          id="edit-profile-button"
          class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Edit Profile
        </button>
      </div>

      <section
        id="edit-profile-section"
        class="mt-8 hidden rounded-2xl border border-gray-200 bg-white p-6"
      >
        <h2 class="text-xl font-bold text-gray-950">
          Edit Profile
        </h2>

        <form id="edit-profile-form" class="mt-6 space-y-5">
          <div>
            <label
              for="profile-bio"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Bio
            </label>

            <textarea
              id="profile-bio"
              rows="4"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            >${t.bio||``}</textarea>
          </div>

          <div>
            <label
              for="profile-avatar"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Avatar URL
            </label>

            <input
              id="profile-avatar"
              type="url"
              value="${t.avatar?.url||``}"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              for="profile-banner"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Banner URL
            </label>

            <input
              id="profile-banner"
              type="url"
              value="${t.banner?.url||``}"
              class="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <p
            id="profile-error"
            class="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
            role="alert"
          ></p>

          <div class="flex gap-3">
            <button
              id="cancel-profile-edit"
              type="button"
              class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700"
            >
              Cancel
            </button>

            <button
              id="save-profile-button"
              type="submit"
              class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              Save Profile
            </button>
          </div>
        </form>
      </section>

      <section class="mt-10">
        <div class="flex gap-2 border-b border-gray-200">
          <button
            id="my-listings-tab"
            type="button"
            class="border-b-2 border-blue-600 px-4 py-3 font-semibold text-blue-600"
          >
            My Listings
          </button>

          <button
            id="my-bids-tab"
            type="button"
            class="border-b-2 border-transparent px-4 py-3 font-semibold text-gray-500"
          >
            My Bids
          </button>
        </div>

        <div
          id="my-listings-content"
          class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          ${p(c)}
        </div>

        <div
          id="my-bids-content"
          class="mt-6 hidden grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          ${m(h)}
        </div>
      </section>

    </section>
  `,l(e,t),u(e)}function l(e,t){let n=e.querySelector(`#edit-profile-button`),r=e.querySelector(`#edit-profile-section`),i=e.querySelector(`#cancel-profile-edit`),a=e.querySelector(`#edit-profile-form`);n?.addEventListener(`click`,()=>{r?.classList.remove(`hidden`)}),i?.addEventListener(`click`,()=>{r?.classList.add(`hidden`)}),a?.addEventListener(`submit`,e=>d(e,t.name))}function u(e){let t=e.querySelector(`#my-listings-tab`),n=e.querySelector(`#my-bids-tab`),r=e.querySelector(`#my-listings-content`),i=e.querySelector(`#my-bids-content`);t?.addEventListener(`click`,()=>{r?.classList.remove(`hidden`),i?.classList.add(`hidden`),t.classList.add(`border-blue-600`,`text-blue-600`),t.classList.remove(`border-transparent`,`text-gray-500`),n?.classList.remove(`border-blue-600`,`text-blue-600`),n?.classList.add(`border-transparent`,`text-gray-500`)}),n?.addEventListener(`click`,()=>{i?.classList.remove(`hidden`),r?.classList.add(`hidden`),n.classList.add(`border-blue-600`,`text-blue-600`),n.classList.remove(`border-transparent`,`text-gray-500`),t?.classList.remove(`border-blue-600`,`text-blue-600`),t?.classList.add(`border-transparent`,`text-gray-500`)})}async function d(e,t){e.preventDefault();let n=e.currentTarget,r=n.querySelector(`#profile-bio`)?.value.trim()||``,i=n.querySelector(`#profile-avatar`)?.value.trim()||``,a=n.querySelector(`#profile-banner`)?.value.trim()||``,s=n.querySelector(`#profile-error`),c=n.querySelector(`#save-profile-button`);_(s);let l={bio:r,avatar:i?{url:i,alt:`${t}'s avatar`}:null,banner:a?{url:a,alt:`${t}'s banner`}:null};c.disabled=!0,c.textContent=`Saving...`;try{await o(t,l),window.location.reload()}catch(e){console.error(`Failed to update profile:`,e),g(s,e.message||`Unable to update profile.`),c.disabled=!1,c.textContent=`Save Profile`}}function f(e=[]){let t=e.map(e=>e.listing).filter(e=>e?.id);return Array.from(new Map(t.map(e=>[e.id,e])).values())}function p(e=[]){return e.length===0?`
      <p class="text-gray-500">
        You have no listings yet.
      </p>
    `:e.map(h).join(``)}function m(e=[]){return e.length===0?`
      <p class="text-gray-500">
        You have not placed any bids yet.
      </p>
    `:e.map(h).join(``)}function h(e){return`
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white"
    >
      <img
        src="${e.media?.[0]?.url||`/src/assets/images/placeholder-image.png`}"
        alt="${e.media?.[0]?.alt||e.title||`Listing image`}"
        onerror="this.onerror=null; this.src='/src/assets/images/placeholder-image.png';"
        class="h-44 w-full object-cover"
      />

      <div class="p-4">
        <h3 class="font-bold text-gray-950">
          ${e.title||`Untitled listing`}
        </h3>

        <a
          href="${r(`listing.html?id=${e.id}`)}"
          class="mt-4 inline-block font-semibold text-blue-600 hover:underline"
        >
          View Listing
        </a>
      </div>
    </article>
  `}function g(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function _(e){e&&(e.textContent=``,e.classList.add(`hidden`))}i(),s();