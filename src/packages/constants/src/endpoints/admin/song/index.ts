import { type EndpointT } from "@repo/types";

/**
 * Admin users management endpoint keys.
 * Format: HTTP_METHOD_RESOURCE
 *
 * @property GET_USERS - Endpoint for retrieving users list
 */
type EndpointKeys = "POST_ADD_SONG" | "PUT_UPDATE_SONG";

/**
 * Admin users management API endpoints configuration.
 * Uses EndpointT generic type for type-safe endpoint definitions.
 *
 * @example
 * ```typescript
 * // Using the users list endpoint
 * const getUsersUrl = ADMIN_USERS_ENDPOINT.GET_USERS; // "/admin/users"
 * ```
 */

export const ADMIN_SONG_ENDPOINT: EndpointT<EndpointKeys> = {
  POST_ADD_SONG: "/admin/songs",
  PUT_UPDATE_SONG: "/admin/songs/:id",
};
