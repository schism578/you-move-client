import React from 'react';
import config from '../config';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';


export default class CreateProfile extends React.Component {
    //either props or context needs to live here
    
    addNewUser = user => {

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
        .then(resJSON => this.props.handleAddUser(resJSON))
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const newUser = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        }
        if (newUser.first_name === '0') {
            this.setState({
                error: 'Please enter first name'
            })
        }
        if (newUser.last_name === '0') {
            this.setState({
                error: 'Please enter last name'
            })
        }
        if (newUser.email === '0') {
            this.setState({
                error: 'Please enter email address'
            })
        }
        if (newUser.password === '0') {
            this.setState({
                error: 'Please enter password'
            })
        } else {
        this.addNewUser(newUser)
        this.props.history.push('/user');
        }
    }

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