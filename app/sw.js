/**
 * オフラインで開けるようにするための最小限のサービスワーカー。
 *
 * 一度開いたものは端末に残るので、機内モードでも起動できる。
 * 中身は毎回裏で取り直して次回に反映する（stale-while-revalidate）。
 * 版を上げたら CACHE の名前を変えると古いものが消える。
 */
const CACHE = "macbeth-v1";

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

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      const fresh = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      // 手元にあれば即返し、裏で取り直す。無ければ取得を待つ
      if (hit) return hit;
      const res = await fresh;
      if (res) return res;
      // 画面遷移だけは、繋がらなければ入口の控えを返す
      if (req.mode === "navigate") {
        const fallback = await cache.match(new URL("./app.html", self.registration.scope).href);
        if (fallback) return fallback;
      }
      return new Response("オフラインです", { status: 503, headers: { "content-type": "text/plain" } });
    })(),
  );
});
