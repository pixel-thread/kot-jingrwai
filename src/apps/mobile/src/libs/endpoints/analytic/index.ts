import { EndpointT } from '~/src/types/endpoint';

type AnalyticEnpoints = 'POST_ANALYTIC_USERS';

export const ANALYTIC_ENDPOINTS: EndpointT<AnalyticEnpoints> = {
  POST_ANALYTIC_USERS: '/analytic/users',
};
