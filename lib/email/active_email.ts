export const getActiveEmail = (name: string) => ({
  subject: `Hi, ${name}!`,
  text: `Have you seen our newest feature? Check the blog for more.`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <h1 style="color: #4A90E2;">Hi ${name},</h1>
      <p>Have you checked out our newest feature? 🔥</p>
      <p>We regularly post updates, tips, and news on our blog.</p>

      <a href="${'https://library-borrow-8nrne6eyr-stevans-projects-ee9d9ffe.vercel.app/'}" 
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
         Visit Blog
      </a>

      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        You're receiving this because you're part of our community.<br />
        If this wasn't you, just ignore this email.
      </p>
    </div>
  `,
});
