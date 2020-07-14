import fetch from '../../supports/request/apiFetch';

export function get (params) {
  return fetch.post('/enterprise/detail', params);
}
