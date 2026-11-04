"use server";

import { revalidatePath } from "next/cache";
import { createPostOnServer } from "@/app/lib/json-server";

export async function createPost(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) {
    return;
  }

  await createPostOnServer({ title, content });
  revalidatePath("/posts");
}
