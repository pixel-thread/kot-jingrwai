import { useAuth } from "@clerk/nextjs";
import { useAuth as useAuthContext } from "@/hooks/auth/useAuth";
import { LoadingDots } from "../common/Loading";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Role } from "@/lib/database/prisma/generated/prisma";

type PropsT = {
  children: React.ReactNode;
};

type RoleRoute = {
  url: string;
  role: Role[];
  redirect?: string;
  needAuth?: boolean;
};

const routeRoles: RoleRoute[] = [
  {
    role: ["SUPER_ADMIN"],
    url: "/admin/*",
    needAuth: true,
    redirect: "/forbidden",
  },
];

export const RoleBaseRoute = ({ children }: PropsT) => {
  const { isSignedIn, isLoaded } = useAuth();

  const router = useRouter();

  const { isAuthLoading, user } = useAuthContext();

  const pathName = usePathname();

  const userRoles = user?.role || "USER";

  // Handle authentication and role-based redirects
  useEffect(() => {
    // Wait until authentication loading is complete to proceed
    if (isAuthLoading || !isLoaded || !user) return;

    // Step 1: Identify the current route from the `routeRoles` configuration
    const currentRoute = routeRoles.find((route) => {
      if (route.url === pathName) return true; // Direct match for the route
      if (route.url.endsWith("/*")) {
        const basePath = route.url.replace("/*", ""); // Handle wildcard route (e.g., `/dashboard/*`)
        return pathName.startsWith(basePath); // Check if the current path starts with the base path
      }
      return false; // No match found
    });

    // Step 2: Handle authentication-based redirection
    if (currentRoute) {
      // If the route requires authentication and the user is not authenticated
      if (currentRoute.needAuth && !isSignedIn) {
        // Redirect the user to the signin page and include the current path as a `redirect` query parameter
        router.replace(`/signin?redirect=${encodeURIComponent(pathName)}`);
        return; // Exit the logic as redirection is in progress
      }

      // Step 3: Handle role-based access control
      if (isSignedIn) {
        // Check if the user has at least one of the required roles for the current route
        const hasRequiredRole = currentRoute.role.some((role) => userRoles.includes(role));

        // If the user does not have the required role(s)
        if (!hasRequiredRole) {
          // Redirect the user to a fallback page specified in the route's configuration or to the homepage
          router.replace(currentRoute.redirect || "/");
          return; // Exit the logic as redirection is in progress
        }
      }
    }
  }, [pathName, isSignedIn, userRoles, router, isAuthLoading]);

  if (isAuthLoading || !isLoaded) {
    return <LoadingDots />;
  }

  return <>{children}</>;
};
