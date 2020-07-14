import fetch from '../../supports/request/apiFetch';

export function getCurrentUserProfileForEdit (data) {
    return fetch.get('/profile/getCurrentUserProfileForEdit', { data });
}

export function updateCurrentUserProfile (data) {
    return fetch.get('/profile/updateCurrentUserProfile', { data });
}
