import React from 'react';
import config from '../config';
import Context from '../context';
import { NavLink, withRouter } from 'react-router-dom';
import './update-info.css';

class UpdateInfo extends React.Component {
    static contextType = Context;

    state = {
        currentInfo: {
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
        error: null,
    }

    updateCurrentUserInfo = (input, value) => {
        this.setState({
            currentInfo: {
                ...this.state.currentInfo,
                [input]: {
                    touched: true,
                    value: value,
                },
            },
        })
    }

    updateUserInfo = info => {
        fetch(`${config.USER_API_ENDPOINT}/user/:user_id`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.USER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })
            .then(res => {
                return res.json()
            })
            .then(resJSON => this.props.handleUpdateInfo(resJSON))
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const currentInfo = {
            gender: e.target.gender.value,
            height: e.target.height.value,
            weight: e.target.weight.value,
            age: e.target.age.value,
        }
        if (currentInfo.gender === '0') {
            this.setState({
                error: 'Please select gender'
            })
        }
        if (currentInfo.height === '0') {
            this.setState({
                error: 'Please enter height'
            })
        }
        if (currentInfo.weight === '0') {
            this.setState({
                error: 'Please enter weight'
            })
        }
        if (currentInfo.age === '0') {
            this.setState({
                error: 'Please enter age'
            })
        } else {
            this.updateUserInfo(currentInfo);
            this.props.history.push('/profile');
        }
    }
    render() {
        const { gender, height, weight, age } = this.context.userProfile
        return (
            <div>
                <form className='update-info-form' onSubmit={this.handleFormSubmit}>
                    <fieldset className='update-info-field'>
                        <legend>Enter Your Info:</legend>
                        <ul className='update-info-list'>
                            <li>
                                <label htmlFor='gender'>Gender:  </label>
                                <select
                                    name='gender'
                                    id='gender'
                                    value={gender}
                                    onChange={(e) => this.updateCurrentUserInfo('gender', e.target.value)}
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
                                    min='1'
                                    step='1'
                                    value={height}
                                    onChange={(e) => this.updateCurrentUserInfo('height', e.target.value)}
                                    required
                                />
                            </li>
                            <li>
                                <label htmlFor='weight'>Weight:  </label>
                                <input
                                    type='number'
                                    id='weight'
                                    name='weight'
                                    min='1'
                                    step='1'
                                    value={weight}
                                    onChange={(e) => this.updateCurrentUserInfo('weight', e.target.value)}
                                    required
                                />
                            </li>
                            <li>
                                <label htmlFor='age'>Age:  </label>
                                <input
                                    type='number'
                                    id='age'
                                    name='age'
                                    min='1'
                                    step='1'
                                    value={age}
                                    onChange={(e) => this.updateCurrentUserInfo('age', e.target.value)}
                                    required
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

export default withRouter(UpdateInfo);