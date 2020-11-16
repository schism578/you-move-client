import React from 'react';
import config from '../config';
import Context from '../context';
//import TokenService from '../services/token-service';
import './food-form.css';
//import PropTypes from 'prop-types';

export default class FoodForm extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    state = {
        newFood: {
            food_item: {
                touched: false,
                value: '',
            },
            quantity: {
                touched: false,
                value: '',
            },
        },
        /*fdcId: {
            value: ''
        },*/
        calories: {
            value: ''
        }
    }

    updateAddFood = (input, value) => {
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
        fetch(`${config.FOOD_API_ENDPOINT}/${query}`, {
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
                return `${res.foods[0].fdcId}`
            })
            .catch(error => this.setState({ error }))
    }

    getCalories = (res) => {
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
                let calories = [];
                let servingSize = [];
                    for (let i = 0; i < data.foods[i].foodNutrients.length; i++) {
                        if (data.foods[i].foodNutrients[i].nutrientName === 'Energy')
                            {calories.push({
                                name: data.foods[i].description, 
                                nutrientValue: data.foods[i].foodNutrients[i].value,
                                })
                            }
                    }
                    {servingSize.push({
                        servingSize: data.foods.servingSize.value,
                    })}
                this.context.handleAddCalories(calories)
                console.log(this.calories, this.servingSize)
            })
    }

    /*displayResults = (responseJson) => {
        const nutrients = getCalories(responseJson);
        
        document.getElementsByClassName('results-list').empty();
            for (let i = 0; i < responseJson.foods.length; i++) {
                document.getElementsByClassName('results-list').append(
                    <ul>
                        <li>
                            <h3>${responseJson.foods[i].description}</h3>
                            <p>${nutrients[i].nutrientValue}</p>
                        </li>
                    </ul>
                );
            }
    }*/

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
                                <br></br>
                                <button 
                                    type='submit' 
                                    onClick={(e) => this.getFoodItem()}>
                                    Add Item
                                </button>
                                <li>
                                    <label htmlFor='quantity'>Quantity:  </label>
                                        <input
                                            type='text'
                                            id='quantity'
                                            name='quantity'
                                            placeholder='2/3 cup'
                                            onChange={(e) => this.updateAddFood('quantity', e.target.value)}
                                        />
                                </li>
                                <br></br>
                                <button 
                                    type='submit' 
                                    onClick={(e) => this.getCalories()}>
                                    Add Serving
                                </button>
                            </ul>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//FoodForm.propTypes = {}