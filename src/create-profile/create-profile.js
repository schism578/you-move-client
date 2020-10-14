import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';


export default class CreateProfile extends React.Component {
    render() {
        return (
            <div>
                <header role='banner'>
                    <h1>Create a Profile</h1>
                </header>
                <form class='signup-form'>
                    <fieldset>
                        <ul>
                            <li>
                                <label for='first-name'>First name</label>
                                <input  
                                    type='text' 
                                    name='first-name' 
                                    id='first-name'
                                    placeholder='First Name' 
                                />
                            </li>
                            <li>
                                <label for='last-name'>Last name</label>
                                <input 
                                    type='text' 
                                    name='last-name' 
                                    id='last-name' 
                                    placeholder='Last Name' 
                                />
                            </li>
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
                        <button type='submit'>Sign Up</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}