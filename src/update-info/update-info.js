import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';

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
        }
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
            console.log(JSON.stringify(info))
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
        return (
            <div>
                <form className='update-info-form' onSubmit={this.handleFormSubmit}>
                    <fieldset>
                    <legend>Enter Your Info:</legend>
                        <ul>
                            <li>
                                <label htmlFor='gender'>Gender:</label>
                                <select 
                                    name='gender' 
                                    id='gender' 
                                    value={this.context.userProfile.gender}
                                    onChange={(e) => this.updateCurrentUserInfo('gender', e.target.value)}
                                >
                                <option value='female'>female</option>
                                <option value='male'>male</option>
                                </select>
                            </li>
                            <label htmlFor='height'>Height:</label>
                                <input 
                                    type='number' 
                                    id='height' 
                                    name='height' 
                                    placeholder='70 (inches)' 
                                    min='1' 
                                    step='1' 
                                    value={this.context.userProfile.height}
                                    onChange={(e) => this.updateCurrentUserInfo('height', e.target.value)}
                                    required
                                />
                            <li>Weight:</li>
                                <input 
                                    type='number' 
                                    id='weight' 
                                    name='weight' 
                                    placeholder='170 (pounds)' 
                                    min='1' 
                                    step='1'
                                    value={this.context.userProfile.weight}
                                    onChange={(e) => this.updateCurrentUserInfo('weight', e.target.value)} 
                                    required
                                />
                            <li>Age:</li>
                                <input 
                                    type='number' 
                                    id='age' 
                                    name='age' 
                                    placeholder='23 (years)' 
                                    min='1' 
                                    step='1'
                                    value={this.context.userProfile.age}
                                    onChange={(e) => this.updateCurrentUserInfo('age', e.target.value)} 
                                    required
                                />
                        </ul>
                    </fieldset>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(UpdateInfo);