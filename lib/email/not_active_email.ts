export const getNotActiveEmail = (name: string) => ({
  subject: `Hi, ${name}!`,
  text: `Just to remind you, we have new updates on the site.`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <h1 style="color: #4A90E2;">Hi ${name},</h1>
      <p>We have some exciting updates waiting for you on our page.</p>
      
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
         ">
         Visit Site
      </a>

      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        If you didn’t request this email, you can ignore it.
      </p>
    </div>
  `,
});
