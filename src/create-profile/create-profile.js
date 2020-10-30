import React from 'react';
import config from '../config';
import Context from '../context';
//import PropTypes from 'prop-types';


export default class CreateProfile extends React.Component {
    //either props or context needs to live here
    static contextType = Context;

    state = {
        newUser: {
        first_name: {
            touched: false,
            value: '',
        },
        last_name: {
            touched: false,
            value: '',
        },
        email: {
            touched: false,
            value: '',
        },
        password: {
            touched: false,
            value: '',
        },
      },
    }

    updateNewUserData = (input, value) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                [input]: {
                    touched: true,
                    value: value,
                },
            },
        })
    }
    
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
                                <label htmlFor='create-first-name'>First name</label>
                                <input  
                                    type='text' 
                                    name='create-first-name' 
                                    id='create-first-name'
                                    placeholder='First Name'
                                    onChange={(e) => this.updateNewUserData('first_name', e.target.value)} 
                                />
                            </li>
                            <li>
                                <label htmlFor='create-last-name'>Last name</label>
                                <input 
                                    type='text' 
                                    name='create-last-name' 
                                    id='create-last-name' 
                                    placeholder='Last Name'
                                    onChange={(e) => this.updateNewUserData('last_name', e.target.value)} 
                                />
                            </li>
                            <li>
                                <label htmlFor='create-username'>Email</label>
                                <input 
                                    type='text' 
                                    name='create-username' 
                                    id='create-username'
                                    placeholder='Email' 
                                    onChange={(e) => this.updateNewUserData('email', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='create-password'>Password</label>
                                <input 
                                    type='password' 
                                    name='create-password' 
                                    id='create-password' 
                                    onChange={(e) => this.updateNewUserData('password', e.target.value)}
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