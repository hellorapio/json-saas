import { createTransport } from "nodemailer";

const transport = createTransport({
  //@ts-ignore
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function mail(email: string, link: string) {
  await transport.sendMail({
    from: "noreply@json-ai.com",
    to: email,
    subject: "Verify your email",
    text: "Click Here to verify your email",
    html: `<p>Click <a href="${link}">Here</a> to verify your email</p>`,
  });
}
