import React from 'react';
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

    getFoodItem = (res) => {
        fetch(`${config.FOOD_API_ENDPOINT}/${this.state.newFood.query.value}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${config.FOOD_API_KEY}`,
              'content-type': 'application/json',
            }
          })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                console.log(res.json)
                return res.json()
            })
            .then(res => {
                return res.foods[0].fdcId;
            })
            .then(fdcId => {
                fetch(`${config.CALORIE_API_ENDPOINT}/${fdcId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${config.FOOD_API_KEY}`,
                        'content-type': 'application/json',
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(res.status)
                        }
                        return res.json()
                    })
                    .then(data => {
                        let calories = data.labelNutrients.calories.value;
                        let servingSize = data.servingSize;
                        let itemCalories = (this.state.newFood.serving * 28.35)/servingSize * calories;
                        this.context.handleAddCalories(itemCalories)
                        console.log(itemCalories)
                    })
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        return (
            <div>
                <form className='food-form' onSubmit={this.props.handleFoodForm}>
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
                                            placeholder='2 (ounces)'
                                            onChange={(e) => this.updateAddFood('serving', e.target.value)}
                                        />
                                </li>
                            </ul>
                            <br></br>
                            <button 
                                type='submit' 
                                onClick={(res) => {this.getFoodItem(res)}}>
                                Add Serving
                            </button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//FoodForm.propTypes = {}