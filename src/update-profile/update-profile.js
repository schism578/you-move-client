import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';

class UpdateProfile extends React.Component {
    static contextType = Context;

    state = {
        currentUser: {
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

    updateProfileInfo = (input, value) => {
        this.setState({
            currentUser: {
                ...this.state.currentUser,
                [input]: {
                    touched: true,
                    value: value,
                },
            },
        })
    }
    
    updateCurrentUser = user => {
        fetch(`${config.USER_API_ENDPOINT}/user/:user_id`, {
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
        .then(resJSON => this.props.handleUpdateProfile(resJSON))
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const currentUser = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        }
        if (currentUser.first_name === '0') {
            this.setState({
                error: 'Please enter first name'
            })
        }
        if (currentUser.last_name === '0') {
            this.setState({
                error: 'Please enter last name'
            })
        }
        if (currentUser.email === '0') {
            this.setState({
                error: 'Please enter email address'
            })
        }
        if (currentUser.password === '0') {
            this.setState({
                error: 'Please enter password'
            })
        } else {
        this.updateCurrentUser(currentUser)
        this.props.history.push('/profile');
        }
    }

    render() {
        return (
            <div>
                <header role='banner'>
                    <h1>Update Your Profile</h1>
                </header>
                <form className='update-profile-form' onSubmit={this.props.handleUpdateProfile}>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor='update-first-name'>First name</label>
                                <input  
                                    type='text' 
                                    name='update-first-name' 
                                    id='update-first-name'
                                    placeholder='First Name'
                                    onChange={(e) => this.updateCurrentUserData('first_name', e.target.value)} 
                                />
                            </li>
                            <li>
                                <label htmlFor='update-last-name'>Last name</label>
                                <input 
                                    type='text' 
                                    name='update-last-name' 
                                    id='update-last-name' 
                                    placeholder='Last Name'
                                    onChange={(e) => this.updateCurrentUserData('last_name', e.target.value)} 
                                />
                            </li>
                            <li>
                                <label htmlFor='update-username'>Email</label>
                                <input 
                                    type='text' 
                                    name='update-username' 
                                    id='update-username'
                                    placeholder='Email' 
                                    onChange={(e) => this.updateCurrentUserData('email', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='update-password'>Password</label>
                                <input 
                                    type='password' 
                                    name='update-password' 
                                    id='update-password' 
                                    onChange={(e) => this.updateCurrentUserData('password', e.target.value)}
                                />
                            </li>
                        </ul>
                        <button type='submit'>Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default withRouter(UpdateProfile);