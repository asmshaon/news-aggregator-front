"use server";

import { cookies } from "next/headers";
import redis from "@/lib/redis";
import sendApiRequest from "@/lib/api/for-server";

export async function handleLogin(formData: FormData) {
  const response = await sendApiRequest("/api/auth/login", "POST", {
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!response.user) {
    return { success: false, message: "Email / Password are wrong!" };
  }

  // Extract token parts
  const tokenParts = response.access_token.split("|");
  const apiToken = tokenParts[1];

  // Await cookies API
  const cookieStore = await cookies();
  cookieStore.set("api_token", apiToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // Prepare user data
  const user = response.user;

  // Store session in Redis
  const sessionKey = `session:${user.id}`; // Use user ID or other unique identifier
  await redis.set(sessionKey, JSON.stringify(user), "EX", 3600);

  return { success: true };
}
