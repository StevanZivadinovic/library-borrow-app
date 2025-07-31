export const getWelcomeEmail = (name: string) => ({
  subject: `Welcome, ${name}!`,
  text: `Thank you for joining us. Visit our site to get started.`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f0f5; color: #333;">
      <h1 style="color: #4A90E2;">Welcome, ${name} 👋</h1>
      <p style="font-size: 16px;">
        Thank you for registering! We're excited to have you on board.
      </p>
      <p style="font-size: 16px;">
        Get started by visiting our website.
      </p>

      <a href="${'https://library-borrow-8nrne6eyr-stevans-projects-ee9d9ffe.vercel.app'}/" 
         style="
           display: inline-block;
           margin-top: 20px;
           padding: 12px 24px;
           background-color: #4A90E2;
           color: white;
           text-decoration: none;
           border-radius: 6px;
           font-weight: bold;
           font-size: 16px;
         ">
         Go to Website
      </a>

      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        If you did not register for this account, please ignore this email.
      </p>
    </div>
  `,
});
