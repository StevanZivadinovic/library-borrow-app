import { serve } from "@upstash/workflow/nextjs"

export const { POST } = serve(
  async (context) => {
    const payload = context.requestPayload 
    console.log("Workflow input:", payload);
    await context.run("initial-step", () => {
      console.log("initial step ran")
    })

    await context.run("second-step", () => {
      console.log("second step ran")
    })
  }
)