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
                <form className='signup-form' onSubmit={this.props.handleCreateProfile}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor='first-name'>First name</label>
                                <input  
                                    type='text' 
                                    name='create-first-name' 
                                    id='create-first-name'
                                    placeholder='First Name' 
                                />
                            </li>
                            <li>
                                <label htmlFor='last-name'>Last name</label>
                                <input 
                                    type='text' 
                                    name='create-last-name' 
                                    id='create-last-name' 
                                    placeholder='Last Name' 
                                />
                            </li>
                            <li>
                                <label htmlFor='username'>Email</label>
                                <input 
                                    type='text' 
                                    name='create-username' 
                                    id='create-username' 
                                />
                            </li>
                            <li>
                                <label htmlFor='password'>Password</label>
                                <input 
                                    type='password' 
                                    name='create-password' 
                                    id='create-password' 
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