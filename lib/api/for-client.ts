const BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export default async function sendApiRequest(
  endpoint: string,
  method: string = "GET",
  body = {},
  nextOptions = {},
  token?: string
) {
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

  console.log(`API URL C :: ${BASE_URL}${endpoint}`);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  // if (!response.ok) {
  //   throw new Error(`HTTP error! Status: ${response.status}`);
  // }

  const data = await response.json();

  return data;
}
