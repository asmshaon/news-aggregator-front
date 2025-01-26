"use server";

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

  return { data: response, success: true };
}
