import sendApiRequest from "./for-server";

export default async function dummyCall() {
  try {
    const { data } = await sendApiRequest(`/auth`);

    return data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error; // Ensure errors propagate for handling upstream
  }
}
