import { Component } from "react";

import './loginComponent.css';

import AuthenticationService from "../../services/authenticationService.js";

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: 'user',
            password: '123',
            hasLoginFailed: false,
            showSucsessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked(){
        AuthenticationService
            .executeJwtAuthentificationService(this.state.userName, this.state.password)
            .then((response) => {
                AuthenticationService
                .registerSuccessfulLoginForJwt(this.state.userName, response.data.token, response.data.roles);
                this.props.history.push(`/main/products`);
            }).catch((e) => {
                console.error(e);
                this.setState({ showSuccessMessage: false });
                this.setState({ hasLoginFailed: true });
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]://ключ - переменная []
                event.target.value
        });
    }


    render() {
        return (
            <div className='mainContainer'>
                <div className='formContainer'>
                    <h1>Login</h1>
                    <input 
                        type='text'
                        name='userName'
                        value={this.state.userName}
                        onChange={this.handleChange} 
                        placeholder='email'
                        className='inputEmail' 
                    />
                    <input 
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder='password'
                        className='inputPassword' 
                    />
                    <div className='buttonsContainer'>
                        <button type='button' className='button' onClick={this.loginClicked}>Войти</button>
                        <button type='button' className='button'>Регестрация</button>
                    </div>
                </div>
            </div>
        );
    }
}