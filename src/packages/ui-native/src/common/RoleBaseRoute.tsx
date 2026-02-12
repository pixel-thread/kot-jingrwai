import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@repo/hooks";
import { AuthContextI, RoleT } from "@repo/types";

type RoleRoute = {
  url: string;
  role: RoleT[]; // Use RoleT from shared types
  redirect?: string;
  needAuth?: boolean;
};

type PropsT = {
  children: React.ReactNode;
  routeRoles?: RoleRoute[];
};

// Define routeRoles locally since it's not in a shared package yet
// Matching the web implementation structure
const defaultRoute: RoleRoute[] = [
  {
    role: ["SUPER_ADMIN", "ADMIN"],
    url: "/admin/*",
    needAuth: true,
    redirect: "/forbidden",
  },
];

const pageAccessOnlyIfUnAuthenticated: string[] = ["/auth", "/sign-up"];

export const RoleBaseRoute = ({ children, routeRoles = defaultRoute }: PropsT) => {
  const { redirect } = useLocalSearchParams<{ redirect: string }>();
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth() as AuthContextI; // Assert context is present
  const { user, isAuthLoading } = auth || {}; // Fallback for safety, though useAuth throws

  // Authentication check: reliance on user object existence
  const isAuthenticated = !!user;
  const userRoles = useMemo(() => (user?.role ? [user.role] : []), [user]);

  // Show loader during route changes or delays
  useEffect(() => {
    if (isAuthLoading) return;
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer); // Cleanup the timer
  }, [isAuthLoading, pathName]);

  // Handle authentication and role-based redirects
  useEffect(() => {
    // Wait until authentication loading is complete to proceed
    if (isAuthLoading) return;

    // Step 1: Identify the current route from the `routeRoles` configuration
    const currentRoute = routeRoles.find((route) => {
      if (route.url === pathName) return true; // Direct match for the route
      if (route.url.endsWith("/*")) {
        const basePath = route.url.replace("/*", ""); // Handle wildcard route
        return pathName.startsWith(basePath); // Check if the current path starts with the base path
      }
      return false; // No match found
    });

    // Step 2: Handle authentication-based redirection
    if (currentRoute) {
      // If the route requires authentication and the user is not authenticated
      if (currentRoute.needAuth && !isAuthenticated) {
        // Redirect the user to the signin page and include the current path as a `redirect` query parameter
        router.replace(`/auth?redirect=${encodeURIComponent(pathName)}`);
        return; // Exit the logic as redirection is in progress
      }

      // Step 3: Handle role-based access control
      if (isAuthenticated) {
        // Check if the user has at least one of the required roles for the current route
        // userRoles is likely an array of strings or Role enums
        const hasRequiredRole = currentRoute.role.some((role) => userRoles.includes(role));

        // If the user does not have the required role(s)
        if (!hasRequiredRole) {
          // Redirect the user to a fallback page specified in the route's configuration or to the homepage
          router.replace(currentRoute.redirect || "/");
          return; // Exit the logic as redirection is in progress
        }
      }
    }
  }, [pathName, isAuthenticated, userRoles, router, isAuthLoading]);

  // Prevent authenticated users from accessing unauthenticated-only pages
  useEffect(() => {
    if (isAuthLoading || isLoading) return;
    if (isAuthenticated && pageAccessOnlyIfUnAuthenticated.includes(pathName)) {
      router.push(redirect || "/");
    }
  }, [isAuthenticated, pathName, redirect, router, isAuthLoading, isLoading]);

  // Display preloader if authentication or loading is in progress
  if (isAuthLoading || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};
