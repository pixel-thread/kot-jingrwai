import { EndpointT } from '@repo/types';

type UpdateEnpoints = 'GET_LATEST_UPDATE';

export const UPDATE_ENDPOINTS: EndpointT<UpdateEnpoints> = {
  GET_LATEST_UPDATE: '/update/latest',
};
