"use server";

import { cookies } from "next/headers";
import redis from "@/lib/redis";
import sendApiRequest from "@/lib/api/for-server";

export async function handleRegister(formData: FormData) {
  const response = await sendApiRequest("/api/auth/register", "POST", {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!response.user) {
    const error = Object.entries(response)
      .map(([, messages]) => messages.join(", "))
      .join("\n");
    return { success: false, message: error };
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
  await redis.set(sessionKey, JSON.stringify(user), "EX", 3600); // Set session to expire in 1 hour

  return { success: true };
}
