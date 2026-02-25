import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return new Response("ok", { status: 200 });
}
