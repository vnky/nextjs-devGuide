export type Post = {
  id: number;
  title: string;
  content: string;
};

const DEFAULT_JSON_SERVER_URL = "http://localhost:3001";

export function getJsonServerUrl(): string {
  return process.env.JSON_SERVER_URL ?? DEFAULT_JSON_SERVER_URL;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${getJsonServerUrl()}/posts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`json-server returned ${response.status}`);
  }

  return response.json() as Promise<Post[]>;
}

export async function createPostOnServer(input: {
  title: string;
  content: string;
}): Promise<Post> {
  const response = await fetch(`${getJsonServerUrl()}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`json-server returned ${response.status}`);
  }

  return response.json() as Promise<Post>;
}
