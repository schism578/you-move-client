import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';
//import calculateBMR from '../utility';
//import PropTypes from 'prop-types';

class ResultsVariety extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    calculateBMR() {
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

    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
      }
    
      getVideos(maxResults=3) {
        const bmr = calculateBMR();
        const searchBmr = ((bmr/100).toFixed()*100);
        const calorieQuery = (document.getElementsByClassName('calorie-query')).value
        const caloricDeficit =  calorieQuery - bmr;
        const searchCalories = ((caloricDeficit/100).toFixed()*100);
        const params = {
          key: `${config.VIDEO_API_KEY}`,
          q: `{${searchCalories} calorie ${caloricDeficit} > 0 ? 'workout' : 'recipe'}`,
          part: 'snippet',
          maxResults,
          type: 'video',
          list: `{${caloricDeficit} > 0 ? 'exercise' : 'cooking'}`
        }
      
        const queryString = this.formatQueryParams(params)
        const videoURL = `${config.VIDEO_API_ENDPOINT} + '?' + ${queryString}`
      
        return fetch(videoURL)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then(responseJson => {
            displayInfo(searchBmr, searchCalories)
            displayVideoResults(responseJson)
          })
          
          .catch(err => {
            document.getElementById('error-message').text(`Something went wrong with YouTube: ${err.message}`);
          });
    }

    render() {
        return (
            <div>
                <form className='results-variety-form' onSubmit={this.props.handleResultsVariety}>
                    <fieldset>
                        <legend className='results-variety'>Select a Type of Workout:</legend>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='weights'
                                required='required'
                            />
                                <label htmlFor='weights'>Weights</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='cardio'
                            />               
                                <label htmlFor='cardio'>Cardio</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='crossfit'
                            />               
                                <label htmlFor='crossfit'>Crossfit</label>
                            <input
                                type='radio'
                                name='workout-type'
                                id='workout-type'
                                value='all'
                            />               
                                <label htmlFor='all'>All</label>
                    </fieldset>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ResultsVariety);