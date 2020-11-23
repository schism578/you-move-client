import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import './create-profile.css'
//import PropTypes from 'prop-types';


class CreateProfile extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
      }    
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
            gender: {
                touched: false,
                value: '',
            },
            height: {
                touched: false,
                value: '',
            },
            weight: {
                touched: false,
                value: '',
            },
            age: {
                touched: false,
                value: '',
            },
            bmr: {
                value: '2000',
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
        fetch(`${config.USER_API_ENDPOINT}/user`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.USER_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        })
        .then(res => {
       console.log(res)
       return res.JSON()
        })
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const newUser = {
        first_name: this.state.newUser.first_name.value,
        last_name: this.state.newUser.last_name.value,
        email: this.state.newUser.email.value,
        password: this.state.newUser.password.value,
        gender: this.state.newUser.gender.value,
        height: parseInt(this.state.newUser.height.value),
        weight: parseInt(this.state.newUser.weight.value),
        age: parseInt(this.state.newUser.age.value),
        bmr: parseInt(this.state.newUser.bmr.value),
        }
        console.log(newUser)
        this.setState({ error: null })
            AuthApiService.postUser(newUser)
        .then(() => {
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
        }
        if (newUser.gender === '0') {
            this.setState({
                error: 'Please select gender'
            })
        }
        if (newUser.height === '0') {
            this.setState({
                error: 'Please enter height'
            })
        }
        if (newUser.weight === '0') {
            this.setState({
                error: 'Please enter weight'
            })
        } else {
        this.props.onRegistrationSuccess()
        newUser.bmr = ((this.calculateBMR()/100).toFixed()*100);
        console.log(newUser.bmr)
        this.addNewUser(newUser)
        this.props.history.push('/log')
        }
        })
    }

    calculateBMR = () => {
        const weightValue = this.state.newUser.weight.value;
        const heightValue = this.state.newUser.height.value;
        const ageValue = this.state.newUser.age.value;
        const weight = parseInt( weightValue );
        const height = parseInt( heightValue );
        const age = parseInt( ageValue );
      
        if (this.state.newUser.gender.value === 'male') {
          return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
        } else {
          return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
        }
    }

    render() {
        return (
            <div>
                <header role='banner'>
                    <h2>Create a Profile</h2>
                </header>
                <form className='signup-form' onSubmit={this.handleFormSubmit}>
                    <fieldset>
                    <legend>Enter Your Info:  </legend>
                        <ul>
                            <li>
                                <label htmlFor='create-first-name'>First Name:  </label>
                                <input  
                                    type='text' 
                                    name='create-first-name' 
                                    id='create-first-name'
                                    placeholder='First Name'
                                    onChange={(e) => this.updateNewUserData('first_name', e.target.value)} 
                                />
                            </li>
                            <li>
                                <label htmlFor='create-last-name'>Last Name:  </label>
                                <input 
                                    type='text' 
                                    name='create-last-name' 
                                    id='create-last-name' 
                                    placeholder='Last Name'
                                    onChange={(e) => this.updateNewUserData('last_name', e.target.value)} 
                                />
                            </li>
                            <li>
                                <label htmlFor='create-username'>Email:  </label>
                                <input 
                                    type='text' 
                                    name='create-username' 
                                    id='create-username'
                                    placeholder='Email' 
                                    onChange={(e) => this.updateNewUserData('email', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='create-password'>Password:  </label>
                                <input 
                                    type='password' 
                                    name='create-password' 
                                    id='create-password' 
                                    onChange={(e) => this.updateNewUserData('password', e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor='gender'>Gender:  </label>
                                <select 
                                    name='gender' 
                                    id='gender' 
                                    onChange={(e) => this.updateNewUserData('gender', e.target.value)}
                                >
                                    <option value='female'>female</option>
                                    <option value='male'>male</option>
                                </select>
                            </li>
                            <li>
                                <label htmlFor='height'>Height:  </label>
                                <input 
                                    type='number' 
                                    id='height' 
                                    name='height' 
                                    placeholder='70 (inches)' 
                                    min='1' 
                                    step='1' 
                                    onChange={(e) => this.updateNewUserData('height', e.target.value)}
                                    required
                                />
                            </li>
                            <li>
                                <label htmlFor='weight'>Weight:  </label>
                                <input 
                                    type='number' 
                                    id='weight' 
                                    name='weight' 
                                    placeholder='170 (pounds)' 
                                    min='1' 
                                    step='1'
                                    onChange={(e) => this.updateNewUserData('weight', e.target.value)} 
                                    required
                                />
                            </li>
                            <li>
                                <label htmlFor='age'>Age:  </label>
                                <input 
                                    type='number' 
                                    id='age' 
                                    name='age' 
                                    placeholder='23 (years)' 
                                    min='1' 
                                    step='1'
                                    onChange={(e) => this.updateNewUserData('age', e.target.value)} 
                                    required
                                />
                            </li>
                        </ul>
                        <br></br>
                        <button type='submit'>Sign Up</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateProfile);