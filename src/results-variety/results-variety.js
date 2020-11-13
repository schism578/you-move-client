import React from 'react';
import config from '../config';
import Context from '../context';
import { withRouter } from 'react-router-dom';
//import calculateBMR from '../utility';
//import PropTypes from 'prop-types';

class ResultsVariety extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    /*state = {
        currentUser: {
            ...userProfile
        }
    }*/

    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
      }
    
      getVideos(maxResults=3) {
        const bmr = `${this.props.userProfile.bmr}`;
        const searchBmr = ((bmr/100).toFixed()*100);
        const calorieQuery = this.context.calories.value
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
            //displayInfo(searchBmr, searchCalories)
            //displayVideoResults(responseJson)
            this.props.history.push('/results');
          })
          
          .catch(err => {
            document.getElementById('error-message').text(`Something went wrong with YouTube: ${err.message}`);
          });
    }

    /*displayVideoResults(responseJson) {
        //$('#results-list').empty();
        for (let i = 0; i < responseJson.items.length; i++){
          $('#results-list').append(
            `<li><h4>${responseJson.items[i].snippet.title}</h4>
            <p>${responseJson.items[i].snippet.description}</p>
            <div class="videoWrapper">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
            </div>
            </li>
            `
          )};
        $('#results').removeClass('hidden');
      }*/

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