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

  return { data: response, success: true };
}
