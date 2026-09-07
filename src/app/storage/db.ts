/**
 * IndexedDB によるプロジェクト保存。docs/11 の 2 章。
 *
 * localStorage は数 MB で頭打ちになり、端末をまたげない。IndexedDB なら
 * 数百 MB 入るので、.mbz のバイト列をそのまま置ける。
 *
 * ここは core ではなくブラウザ依存なので app/ に置く。
 */

const DB_NAME = "macbeth";
const DB_VERSION = 1;
const STORE_PROJECTS = "projects";
const STORE_BLOBS = "blobs";

export interface ProjectRecord {
  id: string;
  name: string;
  created: number;
  modified: number;
  /** .mbz のバイト数。一覧に出す。 */
  size: number;
  /** サムネイルの data URL。無ければ空。 */
  thumbnail: string;
  /** 自動保存で作られたものか、明示的に保存したものか。 */
  autosave: boolean;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
        db.createObjectStore(STORE_PROJECTS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_BLOBS)) {
        db.createObjectStore(STORE_BLOBS);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB を開けません"));
  });
  return dbPromise;
}

function tx<T>(store: string[], mode: IDBTransactionMode, fn: (t: IDBTransaction) => Promise<T> | T): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        let result: T;
        Promise.resolve(fn(t)).then(
          (r) => {
            result = r;
          },
          reject,
        );
        t.oncomplete = () => resolve(result);
        t.onerror = () => reject(t.error ?? new Error("IndexedDB の操作に失敗しました"));
        t.onabort = () => reject(t.error ?? new Error("IndexedDB の操作が中断されました"));
      }),
  );
}

function req<T>(r: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

/** IndexedDB が使えるか。プライベートブラウズなどで落ちる場合に備える。 */
export async function isAvailable(): Promise<boolean> {
  try {
    await openDb();
    return true;
  } catch {
    return false;
  }
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const rows = await tx([STORE_PROJECTS], "readonly", (t) =>
    req(t.objectStore(STORE_PROJECTS).getAll() as IDBRequest<ProjectRecord[]>),
  );
  return rows.sort((a, b) => b.modified - a.modified);
}

export async function saveProject(
  record: Omit<ProjectRecord, "size" | "created" | "modified"> & { created?: number },
  bytes: Uint8Array,
): Promise<ProjectRecord> {
  const now = Date.now();
  const full: ProjectRecord = {
    ...record,
    created: record.created ?? now,
    modified: now,
    size: bytes.byteLength,
  };
  await tx([STORE_PROJECTS, STORE_BLOBS], "readwrite", (t) => {
    t.objectStore(STORE_PROJECTS).put(full);
    // ArrayBuffer で入れる。Uint8Array のままだと構造化複製で view が保持されない実装がある
    t.objectStore(STORE_BLOBS).put(bytes.slice().buffer, full.id);
  });
  return full;
}

export async function loadProject(id: string): Promise<{ record: ProjectRecord; bytes: Uint8Array } | null> {
  const result = await tx([STORE_PROJECTS, STORE_BLOBS], "readonly", async (t) => {
    const record = await req(t.objectStore(STORE_PROJECTS).get(id) as IDBRequest<ProjectRecord | undefined>);
    const buffer = await req(t.objectStore(STORE_BLOBS).get(id) as IDBRequest<ArrayBuffer | undefined>);
    return record && buffer ? { record, bytes: new Uint8Array(buffer) } : null;
  });
  return result;
}

export async function deleteProject(id: string): Promise<void> {
  await tx([STORE_PROJECTS, STORE_BLOBS], "readwrite", (t) => {
    t.objectStore(STORE_PROJECTS).delete(id);
    t.objectStore(STORE_BLOBS).delete(id);
  });
}

/** 自動保存の枠は 1 つだけ。明示的な保存とは分ける。 */
export const AUTOSAVE_ID = "__autosave__";

export async function estimateUsage(): Promise<{ usage: number; quota: number } | null> {
  if (!navigator.storage?.estimate) return null;
  const e = await navigator.storage.estimate();
  return { usage: e.usage ?? 0, quota: e.quota ?? 0 };
}
