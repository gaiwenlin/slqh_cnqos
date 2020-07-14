import RequestFetcherFactory from './RequestFetcherFactory';

const apiFetch = RequestFetcherFactory.getRequestFetcher({
  prefix: '/api/'
});

export default apiFetch;
