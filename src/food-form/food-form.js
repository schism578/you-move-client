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
        calories: {
            value: '',
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

    getCalories = (res) => {
        fetch(config.FOOD_API_ENDPOINT, {
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
                for (let i = 0; i < data.foods.length; i++) {
                    for (let j = 0; j < data.foods[i].foodNutrients.length; j++) {
                        if (data.foods[i].foodNutrients[j].nutrientName === 'Energy')
                            {calories.push({
                                name: data.foods[i].description, 
                                nutrientValue: data.foods[i].foodNutrients[j].value
                                })
                            }
                    }
                }
                this.context.handleAddCalories(calories)
                console.log(this.calories)
            })
            .catch(error => this.setState({ error }))
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
                            </ul>
                            <br></br>
                            <button 
                                type='submit' 
                                onClick={(e) => this.getCalories()}>
                                Add Item
                            </button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//FoodForm.propTypes = {}