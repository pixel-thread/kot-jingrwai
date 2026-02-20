import { stackMiddlewares } from "./utils/middleware/stackMiddleware";
import { withApiAuth } from "./utils/middleware/withApiAuth";

const middlewares = [withApiAuth];

export default stackMiddlewares(middlewares);

export const config = {
  matcher: "/api/:path*",
};
