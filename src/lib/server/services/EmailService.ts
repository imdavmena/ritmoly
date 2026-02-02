export class EmailService {
  async sendVerifyEmail(email: string, link: string) {
    // PLACEHOLDER: integrar proveedor real (Sendgrid/Mailgun/etc)
    console.log("[EmailService] Verify:", email, link);
  }
  async sendResetPassword(email: string, link: string) {
    // PLACEHOLDER
    console.log("[EmailService] Reset:", email, link);
  }
}
