import type { BaseApi } from "@/models/api";

const endpoint = import.meta.env.VITE_API_END_POINT;
const baseURI = endpoint + import.meta.env.VITE_API_BASE_URL;

export async function request<T = BaseApi>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: {}
) {
  const headers = new Headers();
  const start = Date.now();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  if (
    localStorage.getItem("hasLogin") === "1" &&
    localStorage.getItem("token") !== null
  ) {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  const response = await fetch(baseURI + path, {
    method,
    headers,
    body: body && JSON.stringify(body),
  });

  return {
    time: Date.now() - start,
    status: response.status,
    res: (await response.json()) as T,
  };
}
