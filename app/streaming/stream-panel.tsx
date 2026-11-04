import { getServerBaseUrl } from "../lib/server-base-url";
import {
  STREAM_PARTS,
  type StreamPartConfig,
  type StreamPartId,
  type StreamPartPayload,
} from "../lib/stream-parts";

const accentRing: Record<StreamPartConfig["accent"], string> = {
  emerald: "ring-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
  sky: "ring-sky-500/30 bg-sky-500/10 text-sky-800 dark:text-sky-200",
  violet: "ring-violet-500/30 bg-violet-500/10 text-violet-800 dark:text-violet-200",
};

async function fetchStreamPart(part: StreamPartId): Promise<StreamPartPayload> {
  const baseUrl = await getServerBaseUrl();
  const response = await fetch(`${baseUrl}/api/stream/${part}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${part}`);
  }

  return response.json() as Promise<StreamPartPayload>;
}

export function StreamPanelSkeleton({ part }: { part: StreamPartId }) {
  const config = STREAM_PARTS[part];
  const accent = accentRing[config.accent];

  return (
    <div
      className={`animate-pulse rounded-2xl border border-zinc-200 p-6 ring-2 ring-inset dark:border-zinc-800 ${accent}`}
      aria-busy="true"
      aria-label={`Loading ${config.title}`}
    >
      <div className="h-4 w-24 rounded bg-current/20" />
      <div className="mt-4 h-6 w-2/3 max-w-xs rounded bg-current/25" />
      <div className="mt-6 space-y-3">
        <div className="h-3 w-full rounded bg-current/15" />
        <div className="h-3 w-5/6 rounded bg-current/15" />
        <div className="h-3 w-4/6 rounded bg-current/15" />
      </div>
      <p className="mt-6 font-mono text-xs opacity-80">
        Waiting ~{(config.delayMs / 1000).toFixed(1)}s · GET /api/stream/{part}
      </p>
    </div>
  );
}

export async function StreamPanel({ part }: { part: StreamPartId }) {
  const data = await fetchStreamPart(part);
  const config = STREAM_PARTS[part];
  const accent = accentRing[config.accent];

  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 ring-2 ring-inset dark:border-zinc-800 dark:bg-zinc-900/50 ${accent}`}
    >
      <p className="font-mono text-xs uppercase tracking-wide opacity-80">
        /api/stream/{part} · {data.delayMs}ms
      </p>
      <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
        {data.title}
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {data.description}
      </p>
      <ul className="mt-5 space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
        {data.items.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-zinc-950/5 px-3 py-2 dark:bg-white/5"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        Ready at {new Date(data.readyAt).toLocaleTimeString()}
      </p>
    </div>
  );
}
