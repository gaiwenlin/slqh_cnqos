import RequestFetcherFactory from './RequestFetcherFactory';

const fetch = RequestFetcherFactory.getRequestFetcher({
  disableTransform: true
});

export default fetch;
