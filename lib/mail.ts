import nodemailer from "nodemailer";

type SmtpConfig = {
  host: string;
  port: number;
  user?: string;
  pass?: string;
  from: string;
};

function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim();
  if (!host || !from) return null;

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port: Number.isFinite(port) ? port : 587,
    user: process.env.SMTP_USER?.trim() || undefined,
    pass: process.env.SMTP_PASSWORD,
    from,
  };
}

// Better Auth calls this with the reset link. Without SMTP in development,
// log the URL so you can open it from the terminal.
export async function sendPasswordResetEmail(input: {
  to: string;
  url: string;
}) {
  const smtp = readSmtpConfig();

  if (!smtp) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP is not configured.");
    }
    console.info("[password-reset] SMTP is not set. Open this link:", input.url);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
  });

  await transporter.sendMail({
    from: smtp.from,
    to: input.to,
    subject: "Đặt lại mật khẩu",
    text: [
      "Bạn vừa yêu cầu đặt lại mật khẩu.",
      "Mở liên kết này để chọn mật khẩu mới:",
      input.url,
      "Liên kết hết hạn sau 1 giờ. Nếu bạn không yêu cầu, hãy bỏ qua email này.",
    ].join("\n"),
  });
}