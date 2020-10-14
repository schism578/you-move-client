import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h2>Log In</h2>
                <form class='login-form'>
                    <ul>
                        <li>
                            <label for='username'>Email</label>
                            <input 
                                type='text' 
                                name='username' 
                                id='username' 
                            />
                        </li>
                        <li>
                            <label for='password'>Password</label>
                            <input 
                                type='password' 
                                name='password' 
                                id='password' 
                            />
                        </li>
                    </ul>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        )
    }
}