import { headers } from "next/headers";

/** Origin for server-side fetches to this app's Route Handlers. */
export async function getServerBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host) {
    return "http://localhost:3000";
  }
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}
