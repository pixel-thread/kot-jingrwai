import { type EndpointT } from "@repo/types";

/**
 * Admin role management endpoint keys.
 * Format: HTTP_METHOD_ACTION
 *
 * @property PATCH_ROLE - Endpoint for updating user roles
 */
type AdminUpdateEndpointKeys = "GET_UPDATES" | "POST_UPDATE" | "DELETE_UPDATE";

/**
 * Admin role management API endpoints configuration.
 * Uses EndpointT generic type for type-safe endpoint definitions.
 *
 * @example
 * ```typescript
 * // Using the role update endpoint
 * const roleUpdateUrl = ADMIN_ROLE_ENDPOINT.PATCH_ROLE; // "/admin/role"
 * ```
 */
export const ADMIN_UPDATE_ENDPOINT: EndpointT<AdminUpdateEndpointKeys> = {
  GET_UPDATES: "/admin/updates",
  POST_UPDATE: "/admin/updates",
  DELETE_UPDATE: "/admin/updates/:id",
};
