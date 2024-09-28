const nodemailer = require("nodemailer");

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const fromEmail = `Auth <${process.env.EMAIL_USER}>`;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_HOST_PASSWORD
  }
});

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

export const sendVerificationEmail = async (
    email: string, 
    token: string
  ) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  
    await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
  };