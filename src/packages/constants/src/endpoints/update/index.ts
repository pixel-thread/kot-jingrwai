import { type EndpointT } from "@repo/types";

type UpdateEndpointsKey = "GET_LATEST_UPDATE";

export const UPDATE_ENDPOINTS: EndpointT<UpdateEndpointsKey> = {
  GET_LATEST_UPDATE: "/update/latest",
};
