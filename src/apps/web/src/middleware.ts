import { stackMiddlewares } from "./utils/middleware/stackMiddleware";
import { withRateLimiting } from "./utils/middleware/withRateLimiting";

const middlewares = [withRateLimiting];

export default stackMiddlewares(middlewares);

export const config = {
  matcher: "/api/:path*",
};
