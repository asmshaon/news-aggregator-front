import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_INTERNAL_API_URL;

export default async function sendApiRequest(
  endpoint: string,
  method: string = "GET",
  body = {},
  nextOptions = {}
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("api_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const defaultOptions = {
    method,
    headers,
    ...(method !== "GET" &&
      method !== "HEAD" &&
      body && { body: JSON.stringify(body) }),
  };

  // Merge default options with custom options
  const options = {
    ...defaultOptions,
    ...nextOptions,
    headers: { ...defaultOptions.headers },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  const data = await response.json();

  return data;
}
