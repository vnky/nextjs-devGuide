export type StreamPartId = "fast" | "medium" | "slow";

export type StreamPartConfig = {
  delayMs: number;
  title: string;
  description: string;
  accent: "emerald" | "sky" | "violet";
};

export const STREAM_PARTS: Record<StreamPartId, StreamPartConfig> = {
  fast: {
    delayMs: 800,
    title: "Quick stats",
    description: "Simulated analytics bundle",
    accent: "emerald",
  },
  medium: {
    delayMs: 2200,
    title: "Activity feed",
    description: "Simulated social / events API",
    accent: "sky",
  },
  slow: {
    delayMs: 4200,
    title: "Recommendations",
    description: "Simulated heavy ML-ish workload",
    accent: "violet",
  },
};

export type StreamPartPayload = {
  part: StreamPartId;
  title: string;
  description: string;
  delayMs: number;
  readyAt: string;
  items: string[];
};

export function isStreamPartId(value: string): value is StreamPartId {
  return value in STREAM_PARTS;
}

export async function loadStreamPart(part: StreamPartId): Promise<StreamPartPayload> {
  const config = STREAM_PARTS[part];
  await new Promise((resolve) => setTimeout(resolve, config.delayMs));

  const itemsByPart: Record<StreamPartId, string[]> = {
    fast: ["1.2k sessions", "38% bounce rate", "4.8s avg. load"],
    medium: [
      "User signed up · 2m ago",
      "Deploy finished · 14m ago",
      "Comment on /topics/deployment · 1h ago",
    ],
    slow: [
      "Try the streaming demo again",
      "Read /guide/setup/env",
      "Open /services for marketing copy",
    ],
  };

  return {
    part,
    title: config.title,
    description: config.description,
    delayMs: config.delayMs,
    readyAt: new Date().toISOString(),
    items: itemsByPart[part],
  };
}
