import React from 'react';
import config from '../config';
import Context from '../context';
//import PropTypes from 'prop-types';

export default class Login extends React.Component {
    //props or context needs to live here
    static contextType = Context;

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
        }
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

    loginUser = user => {
        fetch(`${config.USER_API_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.USER_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        })
        .then(res => {
            console.log(JSON.stringify(user))
            return res.json()
        })
        .then(resJSON => this.props.handleLogin(resJSON))
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const logUser = {
        email: e.target.email.value,
        password: e.target.password.value,
        }
        if (logUser.email === '0') {
            this.setState({
                error: 'Please enter email address'
            })
        }
        if (logUser.password === '0') {
            this.setState({
                error: 'Please enter password'
            })
        } else {
        this.loginUser(logUser)
        this.props.history.push('/user');
        }
    }

    render() {
        return (
            <div>
                <h2>Log In</h2>
                <form className='login-form' onSubmit={this.props.handleLogin}>
                    <ul>
                        <li>
                            <label htmlFor='login-username'>Email</label>
                            <input 
                                type='text' 
                                name='login-username' 
                                id='login-username' 
                                onChange={(e) => this.initiateUserLogin('login-username', e.target.value)}
                            />
                        </li>
                        <li>
                            <label htmlFor='login-password'>Password</label>
                            <input 
                                type='password' 
                                name='login-password' 
                                id='login-password'
                                onChange={(e) => this.initiateUserLogin('login-password', e.target.value)}
                            />
                        </li>
                    </ul>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        )
    }
}