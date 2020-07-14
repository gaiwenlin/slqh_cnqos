import fetch from '../../supports/request/apiFetch';

export function detail (data) {
  return fetch.post('/productBatch/detail', data);
}
