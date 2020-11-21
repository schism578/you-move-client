/*import React from 'react';
import config from '../config';
import Context from '../context';
//import TokenService from '../services/token-service';
import './food-form.css';
//import PropTypes from 'prop-types';

export default class FoodForm extends React.Component {
    static contextType = Context;

    state = {
        newFood: {
            food_item: {
                touched: false,
                value: '',
            },
            query: {
                touched: false,
                value: ''
            },
            calories: {
                value: ''
            },
            serving: {
                touched: false,
                value: '',
            },
        },
    }

    updateAddFood = (input, value) => {
        console.log('updated added food')
        this.setState({
            newFood: {
              ...this.state.newFood,
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

    getFoodItem = (e) => {
        e.preventDefault()
        const params = {
            api_key: `${config.FOOD_API_KEY}`,
            query: `${this.state.newFood.query.value}`,
        };
        const queryString = this.formatQueryParams(params);
        const foodURL = `${config.FOOD_API_ENDPOINT}?${queryString}`;

        fetch(foodURL, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${config.FOOD_API_KEY}`,
              'content-type': 'application/json',
            }
        })
            .then(resJson => {
                if (!resJson.ok) {
                    throw new Error(resJson.status)
                }
                return resJson.json()
            })
            .then(resJson => {
                console.log(resJson)
                let usdaCalories = (resJson.json).find(
                    (nutrientId) => {
                        if (nutrientId === '1008') {
                        return resJson.foods.foodNutrients.value.push(this.context.calories)
                        }
                    } 
                )
                return usdaCalories              
            })
                .then(fdcId => {
                    fetch(`${config.CALORIE_API_ENDPOINT}/${fdcId}?api_key=${config.FOOD_API_KEY}`, {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer ${config.FOOD_API_KEY}`,
                          'content-type': 'application/json',
                        }
                    })
                        .then(resJson => {
                            if (!resJson.ok) {
                                throw new Error(resJson.status)
                            }
                            console.log(resJson)
                            return resJson.json()
                        })
                            
                            if (data.foods[0].foodNutrients.nutrientId === 1008) {
                                return data.foods[0].foodNutrients.nutrientName.value
                            }
                            //let servingSize = data.servingSize;
                            //let itemCalories = (this.state.newFood.serving * 28.35)/servingSize * calories;
                            //this.context.handleAddCalories(itemCalories)
                .catch(error => this.setState({ error }))}

    render() {
        return (
            <div>
                <form className='food-form' onSubmit={this.getFoodItem}>
                    <fieldset>
                        <legend>Enter Your Food:</legend>
                            <ul>
                                <li>
                                    <label htmlFor='query'>Food Item:  </label>
                                        <input 
                                            type='text' 
                                            id='query' 
                                            name='query' 
                                            placeholder='fat free yogurt'
                                            onChange={(e) => this.updateAddFood('query', e.target.value)}
                                        />
                                </li>
                                <li>
                                    <label htmlFor='serving'>Serving:  </label>
                                        <input
                                            type='text'
                                            id='serving'
                                            name='serving'
                                            placeholder='1 or 0.5(based on nutrition label)'
                                            onChange={(e) => this.updateAddFood('serving', e.target.value)}
                                        />
                                </li>
                            </ul>
                            <br></br>
                            <button type='submit'>Add Serving</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

FoodForm.propTypes = {}*/