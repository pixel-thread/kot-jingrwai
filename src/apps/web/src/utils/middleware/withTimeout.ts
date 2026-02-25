import { NextRequest, NextResponse } from "next/server";

export function withTimeout(
  handler: (req: NextRequest, ...args: any[]) => Promise<Response | NextResponse>,
  seconds = 3
) {
  return async (req: NextRequest, ...args: any[]) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), seconds * 1000);

    try {
      // Pass the request and the extra args (like params) through
      const response = await handler(req, ...args);
      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Check if it's a timeout error
      if (error.name === "AbortError" || req.signal?.aborted) {
        return NextResponse.json(
          {
            error: "Request Timeout",
            message: "Payload took too long to send or process.",
          },
          { status: 408 }
        );
      }

      throw error;
    }
  };
}
