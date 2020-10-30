import React from 'react';
import config from '../config';
import Context from '../context';
import CalorieInput from '../calorie-input/calorie-input';
//import PropTypes from 'prop-types';

export default class FoodForm extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    updateAddFood = (input, value) => {
        this.setState({
            addFood: {
              ...this.state.addFood,
            [input]: {
              touched: true,
              value: value,
            },
          },
        })
    }

    addFood = food => {
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
            .then(data => this.setFoods(data))
            .catch(error => this.setState({ error }))
        }

    render() {
        return (
            <div>
                <form className='food-form' onSubmit={this.props.handleFoodForm}>
                    <fieldset>
                        <legend>Enter Your Food:</legend>
                            <ul>
                                <label htmlFor='food-item'>Food Item:</label>
                                    <input 
                                        type='text' 
                                        id='food-item' 
                                        name='food-item' 
                                        placeholder='fat free yogurt'
                                        onChange={(e) => this.updateAddFood('food-item', e.target.value)}
                                    />
                                <label htmlFor='quantity'>Quantity:</label>
                                    <input
                                        type='text'
                                        id='quantity'
                                        name='quantity'
                                        placeholder='2/3 cup'
                                        onChange={(e) => this.updateAddFood('quantity', e.target.value)}
                                    />
                            </ul>
                            <button type='submit'>Add Item</button>
                    </fieldset>
                </form>
                <CalorieInput 
                    sumCalories={this.sumCalories}
                />
            </div>
        )
    }
}

//FoodForm.propTypes = {}