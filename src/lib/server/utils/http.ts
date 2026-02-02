import { json } from "@sveltejs/kit";

export function badRequest(message: string, details?: unknown) {
  return json({ ok: false, message, details }, { status: 400 });
}
export function unauthorized(message = "Unauthorized") {
  return json({ ok: false, message }, { status: 401 });
}
export function forbidden(message = "Forbidden") {
  return json({ ok: false, message }, { status: 403 });
}
export function ok(data: any = {}) {
  return json({ ok: true, ...data });
}
