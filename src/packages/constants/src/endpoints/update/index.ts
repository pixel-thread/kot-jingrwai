import { EndpointT } from "@/types/endpoints";

type UpdateEndpointsKey = "GET_LATEST_UPDATE";

export const UPDATE_ENDPOINT: EndpointT<UpdateEndpointsKey> = {
  GET_LATEST_UPDATE: "/update/latest",
};
