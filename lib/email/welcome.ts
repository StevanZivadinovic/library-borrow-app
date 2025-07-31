export const getWelcomeEmail = (name: string) => ({
  subject: `Wellcome, ${name}!`,
  text: `Thank you to join us.`,
  html: `<h1>Hi ${name},</h1><p>Thank you for the registration!</p>`,
});
