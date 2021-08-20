import axios from 'axios';

import {
    JPA_API_URL
} from '../constants/constants.js';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const USERS_ROLES_SESSION_ATTRIBUTE_NAME = 'usersRoles';


class AuthenticationService {

    executeJwtAuthentificationService(username, password) {
        return axios.post(JPA_API_URL + '/authenticate', {
            username,
            password
        });
    }


    registerSuccessfulLoginForJwt(userName, token , role) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName);
        sessionStorage.setItem(USERS_ROLES_SESSION_ATTRIBUTE_NAME, ['ROLE_USER', ...role]/*['ROLE_USER', 'ROLE_ADMIN']*/);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USERS_ROLES_SESSION_ATTRIBUTE_NAME);
    }

    isUserloggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) {
            return false;
        } else {
            return true;
        }
    }

    getUsersRoles() {
        if (this.isUserloggedIn()) {
            let usersRoles = sessionStorage.getItem(USERS_ROLES_SESSION_ATTRIBUTE_NAME).split(',');
            return usersRoles;
        }
    }

    isUserAdmin(){
        let usersRoles = this.getUsersRoles();
        if(this.isUserloggedIn()){
            if(usersRoles.indexOf('ROLE_ADMIN') !== -1){
                return true;
            } else{
                return false;
            } 
        } else {
            return false;
        }        
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) {
            return '';
        } else {
            return user;
        }
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserloggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();