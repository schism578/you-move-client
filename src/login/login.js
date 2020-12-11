import React from 'react';
import Context from '../context';
import config from '../config';
import { withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import './login.css';

class Login extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    }
    static contextType = Context;
    calories = this.context.setUserCalories;
    user_id = this.context.userProfile.user_id;

    state = {
        logUser: {
            email: {
                touched: false,
                value: '',
            },
            password: {
                touched: false,
                value: '',
            },
        },
        error: null
    }

    initiateUserLogin = (input, value) => {
        this.setState({
            logUser: {
                ...this.state.logUser,
                [input]: {
                    touched: true,
                    value: value,
                },
            },
        })
    }

    componentDidUpdate() {
        if (`${this.state.user_id}` !== `${this.context.userProfile.user_id}`) {
            this.setState({
                user_id: this.context.userProfile.user_id
            })
        }
    }

    getCalories = (user_id) => {
        return fetch(`${config.USER_API_ENDPOINT}/log/${user_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.context.setUserCalories(res)
            })
    }

    handleSubmitJwtAuth = e => {
        e.preventDefault()
        AuthApiService.postLogin({
            email: this.state.logUser.email.value,
            password: this.state.logUser.password.value,
        })
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
                this.context.setUserProfile(res.user)
                this.getCalories(res.user.user_id)
                this.props.history.push('/log')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <div>
                <form className='login-form' onSubmit={this.handleSubmitJwtAuth}>
                    <fieldset className='login-field'>
                        <legend>Log In:</legend>
                        {this.state.error &&
                            <h3 className='error'> {this.state.error} </h3>}
                        <ul className='login-list'>
                            <li>
                                <input
                                    type='text'
                                    className='login-creds'
                                    id='login-username'
                                    placeholder='Email'
                                    onChange={(e) => this.initiateUserLogin('email', e.target.value)}
                                    required
                                />
                            </li>
                            <li>
                                <input
                                    type='password'
                                    className='login-creds'
                                    id='login-password'
                                    placeholder='Password'
                                    onChange={(e) => this.initiateUserLogin('password', e.target.value)}
                                    required
                                />
                            </li>
                        </ul>
                        <br></br>
                        <button type='submit'>Log In</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);