import{a as e,i as t,o as n,t as r}from"./navbar-BbcRS07F.js";import{n as i,t as a}from"./listingHelpers-2C99nZkf.js";import{t as o}from"./getListing-Dvfy7j66.js";async function s(n){let r=window.localStorage.getItem(`accessToken`),i=window.localStorage.getItem(`apiKey`);if(!r||!i)throw Error(`You must be logged in to delete a listing.`);let a=`${t}${e.auction.listings}/${n}`,o=await fetch(a,{method:`DELETE`,headers:{Authorization:`Bearer ${r}`,"X-Noroff-API-Key":i}});if(!o.ok){let e=`Unable to delete listing.`;try{e=(await o.json()).errors?.[0]?.message||e}catch{}throw Error(e)}return!0}async function c(n,r){let i=window.localStorage.getItem(`accessToken`),a=window.localStorage.getItem(`apiKey`);if(!i||!a)throw Error(`You must be logged in to place a bid.`);let o=`${t}${e.auction.listings}/${n}/bids`,s=await fetch(o,{method:`POST`,headers:{Authorization:`Bearer ${i}`,"X-Noroff-API-Key":a,"Content-Type":`application/json`},body:JSON.stringify({amount:r})}),c=await s.json();if(!s.ok){let e=c.errors?.[0]?.message||`Unable to place bid.`;throw Error(e)}return c.data}async function l(){let e=globalThis.document?.querySelector(`#listing-page`);if(!e)return;let t=new globalThis.URLSearchParams(globalThis.location?.search).get(`id`);if(!t){e.innerHTML=`
      <p class="py-10 text-center text-gray-500">
        Listing not found.
      </p>
    `;return}try{u(e,await o(t))}catch(t){globalThis.console?.error(`Failed to load listing:`,t),e.innerHTML=`
      <p class="py-10 text-center text-red-600">
        Failed to load listing.
      </p>
    `}}function u(e,t){let n=`/src/assets/images/placeholder-image.png`,r=t.media?.length>0?t.media:[{url:n,alt:t.title||`Auction listing`}],o=r[0],s=t.tags?.[0]||`Other`,c=t.seller?.name||`Unknown seller`,l=t.seller?.avatar?.url||`/src/assets/images/placeholder-image.png`,u=a(t),m=u.toLocaleString(`no-NO`),h=i(t.endsAt),_=t.bids?.length??0,v=globalThis.localStorage?.getItem(`user`),y=v?JSON.parse(v):null,b=!!y,x=y?.name===t.seller?.name,S=!h.ended;e.innerHTML=`
    <section class="mx-auto max-w-6xl px-4 py-8">
      <div class="grid gap-8 lg:grid-cols-2">

        <div>
          <img
            id="listing-main-image"
            src="${o.url}"
            alt="${o.alt||t.title||`Auction listing`}"
            onerror="this.onerror=null; this.src='${n}';"
            class="h-96 w-full rounded-2xl object-cover"
          />

          ${r.length>1?`
                <div class="mt-4 grid grid-cols-3 gap-3">
                  ${r.map((e,r)=>`
                        <button
                          type="button"
                          class="listing-thumbnail overflow-hidden rounded-xl border border-gray-200 hover:border-blue-500"
                          data-image-url="${e.url}"
                          data-image-alt="${e.alt||t.title||`Auction image ${r+1}`}"
                          aria-label="View image ${r+1}"
                        >
                          <img
                            src="${e.url}"
                            alt="${e.alt||t.title||`Auction image ${r+1}`}"
                            onerror="this.onerror=null; this.src='${n}';"
                            class="h-24 w-full object-cover"
                          />
                        </button>
                      `).join(``)}
                </div>
              `:``}
        </div>

        <article
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <span
            class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
          >
            ${s}
          </span>

          <h1 class="mt-4 text-3xl font-bold text-gray-950">
            ${t.title||`Untitled listing`}
          </h1>

          <p class="mt-4 leading-7 text-gray-600">
            ${t.description||`No description available.`}
          </p>

          <div class="mt-6 border-t border-gray-200 pt-6">
            <div class="flex items-center gap-3">

              <img
                src="${l}"
                alt="${c}"
                onerror="this.onerror=null; this.src='${n}';"
                class="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p class="text-xs text-gray-400">
                  Sold by
                </p>

                <p class="font-semibold text-gray-900">
                  ${c}
                </p>
              </div>

            </div>
          </div>

          <div
            class="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6"
          >
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Current Bid
              </p>

              <p class="mt-1 text-2xl font-bold text-orange-500">
                ${m} cr
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Ends In
              </p>

              <p class="mt-1 font-semibold text-gray-900">
                ${h.short}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <p class="text-sm text-gray-500">
              ${_} ${_===1?`bid`:`bids`}
            </p>
          </div>

          ${d({listing:t,isLoggedIn:b,isOwner:x,isActive:S,currentBidAmount:u})}

        </article>
      </div>

      <section class="mt-10">
        <h2 class="text-2xl font-bold text-gray-950">
          Bid History (${_})
        </h2>

        <div class="mt-4 space-y-3">
          ${g(t.bids)}
        </div>
      </section>
    </section>
  `;let C=e.querySelector(`#listing-main-image`);if(e.querySelectorAll(`.listing-thumbnail`).forEach(e=>{e.addEventListener(`click`,()=>{C&&(C.src=e.dataset.imageUrl,C.alt=e.dataset.imageAlt)})}),x){let n=e.querySelector(`#delete-listing-button`);n?.addEventListener(`click`,()=>p(t.id,n))}b&&!x&&S&&e.querySelector(`#bid-form`)?.addEventListener(`submit`,e=>f(e,t.id,u))}function d({listing:e,isLoggedIn:t,isOwner:r,isActive:i,currentBidAmount:a}){return r?`
      <div class="mt-6 flex gap-3 border-t border-gray-200 pt-6">
        <a
          href="${n(`edit.html?id=${e.id}`)}"
          class="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
        >
          Edit Listing
        </a>

        <button
          id="delete-listing-button"
          type="button"
          class="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
        >
          Delete Listing
        </button>
      </div>
    `:i?t?`
    <form
      id="bid-form"
      class="mt-6 border-t border-gray-200 pt-6"
    >
      <label
        for="bid-amount"
        class="mb-2 block text-sm font-semibold text-gray-700"
      >
        Place your bid
      </label>

      <div class="flex gap-3">
        <input
          id="bid-amount"
          type="number"
          min="${a+1}"
          step="1"
          required
          placeholder="${a+1}"
          class="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3"
        />

        <button
          id="place-bid-button"
          type="submit"
          class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Place Bid
        </button>
      </div>

      <p class="mt-2 text-xs text-gray-500">
        Your bid must be higher than ${a.toLocaleString(`no-NO`)} cr.
      </p>

      <p
        id="bid-error"
        class="mt-3 hidden rounded-lg bg-red-50 p-3 text-sm text-red-600"
        role="alert"
      ></p>
    </form>
  `:`
      <div class="mt-6 border-t border-gray-200 pt-6">
        <p class="text-sm text-gray-600">
          You must be logged in to place a bid.
        </p>

        <a
          href="${n(`login.html`)}"
          class="mt-3 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
        >
          Log in to bid
        </a>
      </div>
    `:`
      <div
        class="mt-6 rounded-xl bg-gray-100 p-4 text-center font-semibold text-gray-600"
      >
        This auction has ended.
      </div>
    `}async function f(e,t,n){e.preventDefault();let r=e.currentTarget,i=r.querySelector(`#bid-amount`),a=r.querySelector(`#place-bid-button`),o=r.querySelector(`#bid-error`),s=Number(i?.value);if(h(o),!Number.isFinite(s)||s<=n){m(o,`Your bid must be higher than ${n.toLocaleString(`no-NO`)} cr.`);return}a.disabled=!0,a.textContent=`Placing Bid...`;try{await c(t,s),globalThis.location.reload()}catch(e){globalThis.console?.error(`Failed to place bid:`,e),m(o,e.message||`Unable to place bid.`),a.disabled=!1,a.textContent=`Place Bid`}}async function p(e,t){if(globalThis.confirm(`Are you sure you want to delete this listing?`)){t.disabled=!0,t.textContent=`Deleting...`;try{await s(e),globalThis.location.href=n()}catch(e){globalThis.console?.error(`Failed to delete listing:`,e),globalThis.alert(e.message||`Unable to delete listing.`),t.disabled=!1,t.textContent=`Delete Listing`}}}function m(e,t){e&&(e.textContent=t,e.classList.remove(`hidden`))}function h(e){e&&(e.textContent=``,e.classList.add(`hidden`))}function g(e=[]){return e.length===0?`
      <p
        class="rounded-xl border border-gray-200 bg-white p-5 text-gray-500"
      >
        No bids yet.
      </p>
    `:[...e].sort((e,t)=>t.amount-e.amount).map((e,t)=>`
        <div
          class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
        >
          <div>
            <p class="font-semibold text-gray-900">
              ${e.bidder?.name||e.bidder||`Unknown bidder`}
            </p>

            <p class="mt-1 text-xs text-gray-400">
              ${new globalThis.Date(e.created).toLocaleString(`no-NO`)}
            </p>
          </div>

          <div class="text-right">
            ${t===0?`
                  <p class="text-xs font-semibold text-green-600">
                    Leading
                  </p>
                `:``}

            <p class="font-bold text-orange-500">
              ${e.amount.toLocaleString(`no-NO`)} cr
            </p>
          </div>
        </div>
      `).join(``)}r(),l();