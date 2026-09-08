/**
 * オフラインで開けるようにするための最小限のサービスワーカー。
 *
 * 取り方を 2 つに分ける。
 *
 * - **入口の HTML と、名前が変わらないもの**（manifest、アイコン）は
 *   **ネットワークを先に見る**。繋がらなければ控えを返す。
 *   ここを控え優先にすると、更新しても「前に開いたときの版」が出てしまい、
 *   次に開くまで新しくならない（ホーム画面に足したアプリが古いままに見える原因）
 * - **`assets/` の中身**は名前にハッシュが入っていて中身が変わらないので、
 *   控えがあればそれを返す（速い。中身が変われば名前も変わる）
 *
 * 版を上げたら CACHE の名前を変えると古いものが消える。
 */
const CACHE = "macbeth-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

/** 名前にハッシュが入っていて、中身が変わらないもの。 */
function immutable(url) {
  return url.pathname.includes("/assets/");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);

      // ハッシュ付きは控え優先。無ければ取ってきて控える
      if (immutable(url)) {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req).catch(() => null);
        if (res?.ok) cache.put(req, res.clone());
        return res ?? new Response("オフラインです", { status: 503 });
      }

      // それ以外はネットワーク優先。HTTP の控えも使わせない（いつも取り直す）
      const fresh = await fetch(req, { cache: "no-store" }).catch(() => null);
      if (fresh?.ok) {
        cache.put(req, fresh.clone());
        return fresh;
      }
      const hit = await cache.match(req);
      if (hit) return hit;
      if (fresh) return fresh;
      // 画面遷移だけは、繋がらなければ入口の控えを返す
      if (req.mode === "navigate") {
        const fallback =
          (await cache.match(new URL("./index.html", self.registration.scope).href)) ??
          (await cache.match(new URL("./app.html", self.registration.scope).href));
        if (fallback) return fallback;
      }
      return new Response("オフラインです", { status: 503, headers: { "content-type": "text/plain" } });
    })(),
  );
});
