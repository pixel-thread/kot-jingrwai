import { stackMiddlewares } from "./utils/middleware/stackMiddleware";
import { withCORS } from "./utils/middleware/withCORS";
import { withRateLimiting } from "./utils/middleware/withRateLimiting";

const middlewares = [withCORS];

export default stackMiddlewares(middlewares);

export const config = {
  matcher: "/api/:path*",
};
