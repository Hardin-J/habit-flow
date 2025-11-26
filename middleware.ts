import { auth } from "@/app/api/auth/[...nextauth]/auth"

export default auth((req) => {
    console.log("👉 [Middleware] Path:", req.nextUrl.pathname, "Auth:", !!req.auth)
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
