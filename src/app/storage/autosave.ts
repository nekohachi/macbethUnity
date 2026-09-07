/**
 * 自動保存。操作のたびに .mbz を作って IndexedDB の枠 1 つへ書く。
 *
 * 端末のブラウザ内なので、閉じても消えず、次に開いたときに戻る。
 * 明示的な保存（名前を付けて保存 / 書き出し）とは別枠（AUTOSAVE_ID）。
 */
import { packMbz, unpackMbz } from "../../core/index.js";
import type { AppState } from "../state.js";
import { AUTOSAVE_ID, deleteProject, isAvailable, loadProject, saveProject } from "./db.js";

const DEBOUNCE_MS = 1200;
const APP_VERSION = "0.1.0";

export class Autosave {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private writing = false;
  private pending = false;
  private available: boolean | null = null;
  /** 保存に失敗したときの通知。UI 側で拾う。 */
  onError: ((message: string) => void) | null = null;
  onSaved: ((at: number) => void) | null = null;

  constructor(private state: AppState) {}

  /** 操作のたびに呼ぶ。まとめて 1 回にする。 */
  schedule(): void {
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = null;
      void this.saveNow();
    }, DEBOUNCE_MS);
  }

  async saveNow(): Promise<void> {
    // 書き込み中に次が来たら、終わってから 1 回だけやり直す
    if (this.writing) {
      this.pending = true;
      return;
    }
    if (this.available === null) this.available = await isAvailable();
    if (!this.available) return;

    this.writing = true;
    try {
      const bytes = packMbz(this.state.doc, { appVersion: APP_VERSION });
      const record = await saveProject(
        { id: AUTOSAVE_ID, name: "自動保存", thumbnail: "", autosave: true },
        bytes,
      );
      this.onSaved?.(record.modified);
    } catch (err) {
      this.onError?.(err instanceof Error ? err.message : "自動保存に失敗しました");
    } finally {
      this.writing = false;
      if (this.pending) {
        this.pending = false;
        this.schedule();
      }
    }
  }

  /** 前回の続きがあれば読み込む。読み込めたら true。 */
  async restore(): Promise<boolean> {
    if (this.available === null) this.available = await isAvailable();
    if (!this.available) return false;
    try {
      const found = await loadProject(AUTOSAVE_ID);
      if (!found) return false;
      const { document } = unpackMbz(found.bytes);
      if (!document.objects.length) return false;
      this.state.doc = document;
      this.state.select(null);
      return true;
    } catch (err) {
      // 壊れていたら消す。次から普通に始められる方が大事
      this.onError?.(err instanceof Error ? err.message : "前回の状態を読み込めませんでした");
      await deleteProject(AUTOSAVE_ID).catch(() => undefined);
      return false;
    }
  }

  /** 新規シーンにするときなど、自動保存の枠を空にする。 */
  async clear(): Promise<void> {
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null;
    await deleteProject(AUTOSAVE_ID).catch(() => undefined);
  }
}
