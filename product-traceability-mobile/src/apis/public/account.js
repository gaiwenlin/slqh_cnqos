import fetch from '../../supports/request/apiFetch';

export function login (data) {
    return fetch.post('/account/login', data);
}
