import fetch from '../../supports/request/apiFetch';

export function getUser (data) {
    return fetch.get('/user/getUser', { data });
}

export function createOrEditUserDetail (data) {
    return fetch.get('/user/createOrEditUserDetail', { data });
}
