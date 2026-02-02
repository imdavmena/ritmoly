export function validateStrongPassword(pw: string) {
  // min 8, 1 upper, 1 lower, 1 number, 1 symbol
  const ok =
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw);
  return ok;
}
