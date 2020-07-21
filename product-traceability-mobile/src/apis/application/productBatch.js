import fetch from '../../supports/request/apiFetch';

export function detail (data) {
  return fetch.post('/productBatch/detail', data);
}

export function uploadAddress (data) {
  return fetch.post('/log/scan/create', data);
}

export function addComment (data) {
  return fetch.post('/log/operate/create', data);
}