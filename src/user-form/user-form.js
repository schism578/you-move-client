import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';
//import PropTypes from 'prop-types';

class UserForm extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    state = {
        newInfo: {
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

    updateNewUserInfo = (input, value) => {
        this.setState({
          newInfo: {
              ...this.state.newInfo,
            [input]: {
              touched: true,
              value: value,
            },
          },
        })
    }

    calculateBMR = () => {
        const weightValue = (document.getElementById('weight')).value;
        const heightValue = (document.getElementById('height')).value;
        const ageValue = (document.getElementById('age')).value;
        const weight = parseInt( weightValue );
        const height = parseInt( heightValue );
        const age = parseInt( ageValue );
      
        if ((document.getElementById('gender')).value === 'male') {
          return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
        } else {
          return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
        }
    }

    addUserInfo = info => {
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
                        
                    </fieldset>
                        <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(UserForm);
//UserForm.propTypes = {}