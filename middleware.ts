export { auth as middleware } from "@/auth"

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
   matcher:"/((?!api/workflow|_next/static|_next/image|favicon.ico).*)",
}


