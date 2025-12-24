import { type EndpointT } from "@repo/types";

type UpdateEndpointsKey = "GET_LATEST_UPDATE";

export const UPDATE_ENDPOINT: EndpointT<UpdateEndpointsKey> = {
  GET_LATEST_UPDATE: "/update/latest",
};
