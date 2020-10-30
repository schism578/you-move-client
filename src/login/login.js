import React from 'react';
import Context from '../context';
//import PropTypes from 'prop-types';

export default class Login extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    render() {
        return (
            <div>
                <h2>Log In</h2>
                <form className='login-form' onSubmit={this.props.handleLogin}>
                    <ul>
                        <li>
                            <label htmlFor='username'>Email</label>
                            <input 
                                type='text' 
                                name='login-username' 
                                id='login-username' 
                            />
                        </li>
                        <li>
                            <label htmlFor='password'>Password</label>
                            <input 
                                type='password' 
                                name='login-password' 
                                id='login-password' 
                            />
                        </li>
                    </ul>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        )
    }
}