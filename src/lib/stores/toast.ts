import { writable } from "svelte/store";

export type ToastType = "ok" | "err";
export interface ToastItem {
  id: string;
  msg: string;
  type: ToastType;
}

export const toasts = writable<ToastItem[]>([]);

export function toast(msg: string, type: ToastType = "ok") {
  const id = crypto.randomUUID();
  toasts.update((t) => [...t, { id, msg, type }]);
  setTimeout(() => toasts.update((t) => t.filter((x) => x.id !== id)), 3200);
}
