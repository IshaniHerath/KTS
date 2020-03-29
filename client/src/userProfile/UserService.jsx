import http from '../integration/HttpService';
// const apiUrl = require('../config').get(process.env.REACT_APP_ENV).apiUrl;
const apiUrl = 'http://localhost:5000';

const apiEndpoint = apiUrl + '/';

/**
 * Save user profile when created/updated.
 * @param userProfile.
 * @returns {array} array object of userProfile.
 */
export function saveUser(userProfile) {
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBB");
    console.log("userProfile", userProfile);
    return http.post(apiEndpoint, userProfile);
}
