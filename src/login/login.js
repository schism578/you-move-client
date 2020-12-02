import React from 'react';
import Context from '../context';
import config from '../config';
import { withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

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


    getCalories = (id) => {
        fetch(`${config.USER_API_ENDPOINT}/log/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(res => {
                console.log(res)
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
                    <fieldset>
                        <legend>Log In:</legend>
                        <ul>
                            <li>
                                <label htmlFor='login-username'>Email:  </label>
                                <input
                                    type='text'
                                    name='login-username'
                                    id='login-username'
                                    onChange={(e) => this.initiateUserLogin('email', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='login-password'>Password:  </label>
                                <input
                                    type='password'
                                    name='login-password'
                                    id='login-password'
                                    onChange={(e) => this.initiateUserLogin('password', e.target.value)}
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