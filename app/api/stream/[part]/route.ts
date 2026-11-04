import { NextResponse } from "next/server";
import { isStreamPartId, loadStreamPart } from "../../../lib/stream-parts";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ part: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { part } = await context.params;

  if (!isStreamPartId(part)) {
    return NextResponse.json(
      { error: "Unknown part. Use fast, medium, or slow." },
      { status: 404 },
    );
  }

  const data = await loadStreamPart(part);
  return NextResponse.json(data);
}
