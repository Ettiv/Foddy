
import React, { Component } from 'react';

import AuthenticationService from '../../services/authenticationService.js';

import { Route, Redirect } from 'react-router-dom';

export default class AutfinticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserloggedIn()) {
            let usersRoles = AuthenticationService.getUsersRoles();
            for (let role of usersRoles) {
                if (this.props.role === role) {
                    return <Route {...this.props} />
                }
            }
            return <Redirect to='/login/' />           
        } else {
            return <Redirect to='/login/' />
        }
    }
}