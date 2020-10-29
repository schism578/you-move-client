import React from 'react';
import config from '../config';
//import { calculateBMR } from '../utility';
//import PropTypes from 'prop-types';

export default class UserForm extends React.Component {
    //props or context needs to live here

    addUserInfo = info => {

        fetch(`${config.USER_API_ENDPOINT}`, {
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
        .then(resJSON => this.props.handleUserForm(resJSON))
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const newInfo = {
        gender: e.target.gender.value,
        height: e.target.height.value,
        weight: e.target.weight.value,
        age: e.target.age.value,
        }
        if (newInfo.gender === '0') {
            this.setState({
                error: 'Please select gender'
            })
        }
        if (newInfo.height === '0') {
            this.setState({
                error: 'Please enter height'
            })
        }
        if (newInfo.weight === '0') {
            this.setState({
                error: 'Please enter weight'
            })
        }
        if (newInfo.age === '0') {
            this.setState({
                error: 'Please enter age'
            })
        } else {
        this.addUserInfo(newInfo);
        this.calculateBMR(newInfo);
        this.props.history.push('/log');
        }
    }

    render() {
        return (
            <div>
                <form className='user-form' onSubmit={this.handleFormSubmit}>
                    <fieldset>
                    <legend>Enter Your Info:</legend>
                        <ul>
                            <li>
                                <label htmlFor='gender'>Gender:</label>
                                <select name='gender' id='gender'>
                                <option value='female'>female</option>
                                <option value='male'>male</option>
                                </select>
                            </li>
                            <li>Height:</li>
                                <input 
                                    type='number' 
                                    id='height' 
                                    name='height' 
                                    placeholder='70 (inches)' 
                                    min='1' 
                                    step='1' 
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

//UserForm.propTypes = {}