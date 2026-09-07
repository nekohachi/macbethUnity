/**
 * ファイルの受け渡し。docs/11 の 2 章「クラウドドライブのフォルダを介する」。
 *
 * 端末で使える手段が違うので、ここで吸収する。
 *   PC の Chrome / Edge : File System Access API。同じファイルに上書き保存でき、
 *                          クラウドドライブのフォルダを直接開ける
 *   iPad の Safari      : 共有シート（ファイル App へ保存）。上書きはできない
 *   その他              : ダウンロードとファイル選択
 */

export type SaveMethod = "file-system-access" | "share" | "download";

export interface SaveTarget {
  /** 上書き保存に使うハンドル。File System Access API のときだけ。 */
  handle?: FileSystemFileHandle;
  name: string;
}

declare global {
  interface Window {
    showSaveFilePicker?: (options?: {
      suggestedName?: string;
      types?: Array<{ description: string; accept: Record<string, string[]> }>;
    }) => Promise<FileSystemFileHandle>;
    showOpenFilePicker?: (options?: {
      multiple?: boolean;
      types?: Array<{ description: string; accept: Record<string, string[]> }>;
    }) => Promise<FileSystemFileHandle[]>;
  }
}

export function saveMethod(): SaveMethod {
  if (typeof window.showSaveFilePicker === "function") return "file-system-access";
  if (typeof navigator.canShare === "function" && typeof navigator.share === "function") return "share";
  return "download";
}

function mimeFor(name: string): string {
  if (name.endsWith(".mbz")) return "application/zip";
  if (name.endsWith(".obj")) return "text/plain";
  if (name.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

function acceptFor(name: string): Record<string, string[]> {
  if (name.endsWith(".mbz")) return { "application/zip": [".mbz"] };
  if (name.endsWith(".obj")) return { "text/plain": [".obj"] };
  return { "application/octet-stream": [`.${name.split(".").pop()}`] };
}

function triggerDownload(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export interface SaveResult {
  method: SaveMethod;
  target: SaveTarget | null;
  /** 保存できたか。共有シートを閉じた場合などは false。 */
  saved: boolean;
}

/**
 * 名前を付けて保存。handle を返すので、次からは saveTo で上書きできる。
 */
export async function saveAs(data: Uint8Array | string, name: string): Promise<SaveResult> {
  const blob = new Blob([data as BlobPart], { type: mimeFor(name) });
  const method = saveMethod();

  if (method === "file-system-access") {
    try {
      const handle = await window.showSaveFilePicker!({
        suggestedName: name,
        types: [{ description: "macbeth", accept: acceptFor(name) }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return { method, target: { handle, name: handle.name }, saved: true };
    } catch (err) {
      // ユーザーが閉じただけならエラーにしない
      if ((err as DOMException)?.name === "AbortError") return { method, target: null, saved: false };
      // 権限などで失敗したらダウンロードに落とす
      triggerDownload(blob, name);
      return { method: "download", target: { name }, saved: true };
    }
  }

  if (method === "share") {
    const file = new File([blob], name, { type: blob.type });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name });
        return { method, target: { name }, saved: true };
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return { method, target: null, saved: false };
      }
    }
  }

  triggerDownload(blob, name);
  return { method: "download", target: { name }, saved: true };
}

/** 既存のハンドルへ上書き保存する。ハンドルが無ければ saveAs に回す。 */
export async function saveTo(target: SaveTarget | null, data: Uint8Array | string, name: string): Promise<SaveResult> {
  if (!target?.handle) return saveAs(data, name);
  try {
    const writable = await target.handle.createWritable();
    await writable.write(new Blob([data as BlobPart], { type: mimeFor(name) }));
    await writable.close();
    return { method: "file-system-access", target, saved: true };
  } catch {
    // ハンドルが無効になっていたら選び直してもらう
    return saveAs(data, name);
  }
}

export interface OpenedFile {
  name: string;
  bytes: Uint8Array;
  text: string;
  handle?: FileSystemFileHandle;
}

/**
 * ファイルを開く。File System Access API があればハンドルも返すので、
 * そのまま上書き保存できる。
 */
export async function openFile(accept: string): Promise<OpenedFile | null> {
  if (typeof window.showOpenFilePicker === "function") {
    try {
      const exts = accept.split(",").map((s) => s.trim());
      const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [{ description: "macbeth", accept: { "*/*": exts } }],
      });
      const file = await handle.getFile();
      const buffer = await file.arrayBuffer();
      return { name: file.name, bytes: new Uint8Array(buffer), text: await file.text(), handle };
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return null;
      // 失敗したら input にフォールバック
    }
  }
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.style.display = "none";
    document.body.appendChild(input);
    let settled = false;
    const done = (value: OpenedFile | null) => {
      if (settled) return;
      settled = true;
      input.remove();
      resolve(value);
    };
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return done(null);
      const buffer = await file.arrayBuffer();
      done({ name: file.name, bytes: new Uint8Array(buffer), text: new TextDecoder().decode(buffer) });
    });
    // ダイアログを閉じただけの場合を拾う（change が来ない）
    window.addEventListener("focus", () => setTimeout(() => done(null), 800), { once: true });
    input.click();
  });
}

/** 保存方法をユーザーに説明するための一言。 */
export function saveMethodLabel(): string {
  switch (saveMethod()) {
    case "file-system-access":
      return "フォルダを選んで保存（同じファイルに上書きできます）";
    case "share":
      return "共有シートから「ファイル」App へ保存";
    default:
      return "ダウンロード";
  }
}
