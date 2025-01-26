// middleware.ts
import type { NextRequest } from "next/server";
import { protectRoute } from "./lib/auth";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/my-feed"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return protectRoute(request);
  }
}
