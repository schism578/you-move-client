import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
//import ValidationError from '../validation-error';
import './results-variety.css';
//import PropTypes from 'prop-types';

class ResultsVariety extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            calories: {
                value: '',
                error: null,
            },
            caloricDeficit: {
                value: ''
            },
            selectedOption: '',
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.resultsVarietyFormSubmit = this.resultsVarietyFormSubmit.bind(this);
    }
    //radio button selection handlers
    onValueChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    resultsVarietyFormSubmit(e) {
        e.preventDefault();
    }

    updateUserCalories = (e) => {
        this.setState({
            calories: {
                value: e.target.value,
            },
        })
    }

    updateCaloricDeficit = (value) => {
        this.setState({
            caloricDeficit: {
                value: value,
            }
        })
    }

    //POST user calories to the API 
    caloriePost = (user_id) => {
        return fetch(`${config.USER_API_ENDPOINT}/log/${user_id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ calories: this.state.calories.value })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(value => {
                this.context.addNewUserCalories(value)
                return value
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }


    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
    }

    getVideos = () => {
        const bmr = this.context.userProfile.bmr;
        const calorieQuery = this.state.calories.value;
        const caloricDeficit = calorieQuery - bmr;
        const searchCalories = ((caloricDeficit / 100).toFixed() * 100);
        const params = {
            key: `${config.VIDEO_API_KEY}`,
            q: `${searchCalories} calorie ${caloricDeficit > 0 ? `workout ${this.state.selectedOption}` : 'recipe'}`,
            part: 'snippet',
            maxResults: 3,
            type: 'video',
            list: `${caloricDeficit}` > 0 ? 'exercise' : 'cooking'
        }

        const queryString = this.formatQueryParams(params)
        const videoURL = `${config.VIDEO_API_ENDPOINT}?${queryString}`

        return fetch(videoURL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                this.context.handleVideoFetch(responseJson, caloricDeficit);
                this.props.history.push('/results');
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const searchCalories = {
            calories: parseInt(this.state.calories.value),
        }
        if (searchCalories.calories === 0) {
            this.setState({
                error: 'Please enter your daily calories'
            })
        } else {
            this.caloriePost()
                .then(() => {
                    this.getVideos(this.state.calories.value)
                    this.props.history.push('/results')
                })
        }
    }

    /*validateCalories = () => {
        if (this.state.calories.value.length === 0) {
            
        } else if (this.state.calories.value > 8000) {
            return 'That number is too large'
        }
    }*/

    render() {
        //const caloriesError = this.validateCalories()
        return (
            <div>
                <form className='results-variety-form' onSubmit={this.resultsVarietyFormSubmit}>
                    <fieldset className='results-variety-field'>
                        <legend>Enter Your Daily Calories:</legend>
                        <span className='results-variety-list-item'>
                            <label htmlFor='calorie-query'>Calories:  </label>
                            <input
                                type='number'
                                id='calorie-query'
                                className='calorie-query'
                                placeholder='2000'
                                onChange={e => this.updateUserCalories(e)}
                                required
                            />
                        </span>
                        {this.state.error &&
                            <h3 className='error'> {this.state.error} </h3>}
                        <br></br>
                        <ul className='results-variety-list'>
                            <label htmlFor='results-variety' className='results-variety-radio'>Select a Type of Workout:  </label>
                            <br></br>
                            <li className='results-variety-radio-item'>
                                <input
                                    type='radio'
                                    name='workout-type'
                                    id='workout-type'
                                    value='weights'
                                    checked={this.state.selectedOption === 'weights'}
                                    onChange={this.onValueChange}
                                />
                                <label htmlFor='weights'>Weights</label>
                            </li>
                            <li className='results-variety-radio-item'>
                                <input
                                    type='radio'
                                    name='workout-type'
                                    id='workout-type'
                                    value='cardio'
                                    checked={this.state.selectedOption === 'cardio'}
                                    onChange={this.onValueChange}
                                />
                                <label htmlFor='cardio'>Cardio</label>
                            </li>
                            <li className='results-variety-radio-item'>
                                <input
                                    type='radio'
                                    name='workout-type'
                                    id='workout-type'
                                    value='crossfit'
                                    checked={this.state.selectedOption === 'crossfit'}
                                    onChange={this.onValueChange}
                                />
                                <label htmlFor='crossfit'>Crossfit</label>
                            </li>
                        </ul>
                    </fieldset>
                    <button type='submit' onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ResultsVariety);