import { useLoginStore } from "@/store/login";

const api_base = "http://10.71.74.4:8000";

export async function send(
  method: string,
  path: string,
  body = {},
  location = false
) {
  const uri = api_base + path;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  if (
    localStorage.getItem("hasLogin") === "1" &&
    localStorage.getItem("token") !== null
  ) {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  const response = await fetch(uri, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (location && !response.ok) {
    const loginStore = useLoginStore();
    loginStore.logout();
  }

  return {
    status: response.status,
    res: await response.json(),
  };
}
