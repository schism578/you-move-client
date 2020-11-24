import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter, NavLink } from 'react-router-dom';
//import calculateBMR from '../utility';
//import PropTypes from 'prop-types';

class ResultsVariety extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            calories: {
                error: null,
            },
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.resultsVarietyFormSubmit = this.resultsVarietyFormSubmit.bind(this);
      } 

    onValueChange(e) {
        this.setState({
          selectedOption: e.target.value
        });
    }
    
    resultsVarietyFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.selectedOption)
    }

    handleFormSubmit = e => {
        e.preventDefault(e)
        const searchCalories = {
            calories: parseInt(this.state.calories.value),
        }
        if (searchCalories.calories === '0') {
            this.setState({
                error: 'Please enter your daily calories'
            })
        } else {
            this.context.handleAddCalories()
            this.getVideos(this.state.calories)
            this.props.history.push('/results')
        }
    }

    updateUserCalories = (input, value) => {
        console.log('updated calories')
        this.setState({
            userCalories: {
              ...this.state.calories,
            [input]: {
              touched: true,
              value: value,
            },
          },
        })
    }

    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
    }
    
    getVideos = () => {
        console.log(this.context.userProfile)
        const bmr = this.context.userProfile.bmr;
        const calorieQuery = 2400;
        const caloricDeficit =  calorieQuery - bmr;
        const searchCalories = ((caloricDeficit/100).toFixed()*100);
        const params = {
            key: `${config.VIDEO_API_KEY}`,
            q: `${searchCalories} calorie ${caloricDeficit > 0 ? 'workout' : 'recipe'}`,
            part: 'snippet',
            maxResults: 3,
            type: 'video',
            list: `${caloricDeficit}` > 0 ? `${this.state.selectedOption}` : 'cooking'
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
                this.context.handleVideoFetch(responseJson);
                this.props.history.push('/results');
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        return (
            <div>
                <form className='calorie-input' onSubmit={this.props.handleUpdateCalories}>
                    <fieldset>
                        <legend>Enter Your Daily Calories</legend>
                        <label htmlFor='calorie-query'>Serving:  </label>
                            <input 
                                type='number' 
                                id='calorie-query'
                                className='calorie-query' 
                                placeholder='2000' 
                                min='1' 
                                step='1' 
                                onChange={(e) => this.updateUserCalories('calorie-query', e.target.value)}
                                value={this.context.calories}
                                required
                            />
                            <br></br>
                            <NavLink to='/profile' className='nav_link'>View Your History</NavLink>
                    </fieldset>
                </form>
                <form className='results-variety-form' onSubmit={this.resultsVarietyFormSubmit}>
                    <fieldset>
                        <legend className='results-variety'>Select a Type of Workout:</legend>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='weights'
                                checked={this.state.selectedOption === 'weights'}
                                onChange={this.onValueChange}
                            />
                                <label htmlFor='weights'>Weights</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='cardio'
                                checked={this.state.selectedOption === 'cardio'}
                                onChange={this.onValueChange}
                            />               
                                <label htmlFor='cardio'>Cardio</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='crossfit'
                                checked={this.state.selectedOption === 'crossfit'}
                                onChange={this.onValueChange}
                            />               
                                <label htmlFor='crossfit'>Crossfit</label>
                            {/*<input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='all'
                                checked={this.state.selectedOption === 'weights' && 'cardio' && 'crossfit'}
                                onChange={this.onValueChange}
                            />               
                            <label htmlFor='all'>All</label>*/}
                    </fieldset>
                    <button type='submit' onClick={this.getVideos}>Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ResultsVariety);