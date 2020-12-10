import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter, NavLink } from 'react-router-dom';
import './update-profile.css'

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
        error: null,
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
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${config.USER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
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
        const { first_name, last_name, email, password } = this.context.userProfile
        return (
            <div>
                <header role='banner'>
                </header>
                <form className='update-profile-form' onSubmit={this.handleFormSubmit}>
                    <fieldset className='update-profile-field'>
                        <legend>Update Your Profile:</legend>
                        <ul className='update-profile-list'>
                            <li>
                                <label htmlFor='update-first-name'>First Name  </label>
                                <input
                                    type='text'
                                    name='update-first-name'
                                    id='update-first-name'
                                    value={first_name}
                                    onChange={(e) => this.updateProfileInfo('first_name', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='update-last-name'>Last Name  </label>
                                <input
                                    type='text'
                                    name='update-last-name'
                                    id='update-last-name'
                                    value={last_name}
                                    onChange={(e) => this.updateProfileInfo('last_name', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='update-username'>Email  </label>
                                <input
                                    type='text'
                                    name='update-username'
                                    id='update-username'
                                    value={email}
                                    onChange={(e) => this.updateProfileInfo('email', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='update-password'>Password  </label>
                                <input
                                    type='password'
                                    name='update-password'
                                    id='update-password'
                                    value={password}
                                    onChange={(e) => this.updateProfileInfo('password', e.target.value)}
                                />
                            </li>
                        </ul>
                        <br></br>
                        <button type='submit'>Submit</button>
                    </fieldset>
                    <br></br>
                    <NavLink to='/profile' className='profile_return'>Go Back</NavLink>
                </form>
            </div>
        )
    }
}

export default withRouter(UpdateProfile);