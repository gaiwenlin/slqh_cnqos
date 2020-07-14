import RequestFetcher from './RequestFetcher';

export default class RequestFetcherFactory {
  static getRequestFetcher (options) {
    return new RequestFetcher(options);
  }
}
