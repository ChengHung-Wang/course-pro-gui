const endpoint = "http://10.71.74.4:8000";
const baseURI = endpoint + "/api/v2";

export async function request(method: string, path: string, body?: {}) {
  const headers = new Headers();
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
    body: body ? JSON.stringify(body) : undefined,
  });

  return {
    status: response.status,
    res: await response.json(),
  };
}
