import fetch from '../../supports/request/apiFetch';

export function getUserLoginInfo (data) {
    return fetch.get('/session/getUserLoginInfo', { data });
}

export function getCurrentLoginInformation (data) {
    return fetch.get('/session/getCurrentLoginInformation', { data });
}
