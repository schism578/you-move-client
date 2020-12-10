import React from 'react';
import Context from '../context';
import { withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import ValidationError from '../validation-error';
import './create-profile.css'

class CreateProfile extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => { },
        onLoginSuccess: () => { }
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

    handleFormSubmit = e => {
        e.preventDefault()
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
        newUser.bmr = ((this.calculateBMR() / 100).toFixed() * 100);
        AuthApiService.postUser(newUser)
            .then(res => {
                this.props.onRegistrationSuccess()
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
                this.context.setUserProfile(newUser)
                this.props.history.push('/log')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    calculateBMR = () => {
        const weightValue = this.state.newUser.weight.value;
        const heightValue = this.state.newUser.height.value;
        const ageValue = this.state.newUser.age.value;
        const weight = parseInt(weightValue);
        const height = parseInt(heightValue);
        const age = parseInt(ageValue);

        if (this.state.newUser.gender.value === 'male') {
            return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
        } else {
            return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
        }
    }

    validateFirstName = () => {
        if (this.state.newUser.first_name.value.length === 0) {
            return 'First name is required'
        }
    }

    validateLastName = () => {
        if (this.state.newUser.last_name.value.length === 0) {
            return 'Last name is required'
        }
    }

    validateEmail = () => {
        if (this.state.newUser.email.value.length === 0) {
            return 'Email is required'
        }
    }

    validatePassword() {
        const password = this.state.newUser.password.value.trim();
        if (password.length === 0) {
            return 'Password is required';
        } else if (password.length < 8) {
            return 'Password must be 8 characters long';
        } else if (!password.match(/[0-9]/)) {
            return 'Password must contain at least one number';
        } else if (!password.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
            return 'Password must contain one special character';
        }
    }

    validateGender = () => {
        if (this.state.newUser.gender.value.length === 0) {
            return 'Gender is required'
        }
    }

    validateHeight = () => {
        if (this.state.newUser.height.value.length === 0) {
            return 'Height is required'
        }
    }

    validateWeight = () => {
        if (this.state.newUser.weight.value.length === 0) {
            return 'Weight is required'
        }
    }

    validateAge = () => {
        if (this.state.newUser.age.value.length === 0) {
            return 'Age is required'
        }
    }

    render() {
        const firstNameError = this.validateFirstName();
        const lastNameError = this.validateLastName();
        const emailError = this.validateEmail();
        const passwordError = this.validatePassword();
        const genderError = this.validateGender();
        const heightError = this.validateHeight();
        const weightError = this.validateWeight();
        const ageError = this.validateAge();
        return (
            <div>
                <header role='banner'>
                    <h2>Create a Profile</h2>
                </header>
                <form className='signup-form' onSubmit={this.handleFormSubmit}>
                    <fieldset className='create-field'>
                        <legend>Enter Your Info:  </legend>
                        {this.state.error &&
                            <h3 className='error'> {this.state.error} </h3>}
                        <ul className='create-list'>
                            <li className='create-list-item'>
                                <input
                                    type='text'
                                    className='create-inputs'
                                    id='create-first-name'
                                    placeholder='First Name'
                                    onChange={(e) => this.updateNewUserData('first_name', e.target.value)}
                                    required
                                />
                                {this.state.newUser.first_name.touched && (
                                    <ValidationError message={firstNameError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <input
                                    type='text'
                                    className='create-inputs'
                                    id='create-last-name'
                                    placeholder='Last Name'
                                    onChange={(e) => this.updateNewUserData('last_name', e.target.value)}
                                    required
                                />
                                {this.state.newUser.last_name.touched && (
                                    <ValidationError message={lastNameError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <input
                                    type='email'
                                    className='create-inputs'
                                    id='create-username'
                                    placeholder='Email'
                                    onChange={(e) => this.updateNewUserData('email', e.target.value)}
                                    required
                                />
                                {this.state.newUser.email.touched && (
                                    <ValidationError message={emailError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <input
                                    type='password'
                                    className='create-inputs'
                                    id='create-password'
                                    placeholder='Password: 8 characters, one caps, one number, one symbol'
                                    onChange={(e) => this.updateNewUserData('password', e.target.value)}
                                    required
                                />
                                <div id='password-constraints'>Eight characters, one number, one special character</div>
                                {this.state.newUser.password.touched && (
                                    <ValidationError message={passwordError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <select
                                    className='create-inputs'
                                    id='gender'
                                    onChange={(e) => this.updateNewUserData('gender', e.target.value)}
                                    required
                                >
                                    <option value='' hidden>Select your gender</option>
                                    <option value='female'>Female</option>
                                    <option value='male'>Male</option>
                                </select>
                                {this.state.newUser.gender.touched && (
                                    <ValidationError message={genderError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <input
                                    type='number'
                                    id='height'
                                    className='create-inputs'
                                    placeholder='Height: 70 (inches)'
                                    min='1'
                                    step='1'
                                    onChange={(e) => this.updateNewUserData('height', e.target.value)}
                                    required
                                />
                                {this.state.newUser.height.touched && (
                                    <ValidationError message={heightError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <input
                                    type='number'
                                    id='weight'
                                    className='create-inputs'
                                    placeholder='Weight: 170 (pounds)'
                                    min='1'
                                    step='1'
                                    onChange={(e) => this.updateNewUserData('weight', e.target.value)}
                                    required
                                />
                                {this.state.newUser.weight.touched && (
                                    <ValidationError message={weightError} />
                                )}
                            </li>
                            <li className='create-list-item'>
                                <input
                                    type='number'
                                    id='age'
                                    className='create-inputs'
                                    placeholder='Age: 23 (years)'
                                    min='1'
                                    step='1'
                                    onChange={(e) => this.updateNewUserData('age', e.target.value)}
                                    required
                                />
                                {this.state.newUser.age.touched && (
                                    <ValidationError message={ageError} />
                                )}
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