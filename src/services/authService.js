import http from './httpService'
import jwtDecode from 'jwt-decode'

export function login(email, password) {
    return http.post('http://localhost:3900/api/auth', { email, password })
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    }
    catch (ex) {

    }
}