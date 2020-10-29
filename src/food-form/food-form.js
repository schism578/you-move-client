import React from 'react';
import config from '../config';
//import PropTypes from 'prop-types';

export default class FoodForm extends React.Component {
    //props or context needs to live here
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
                                <li>Food Item:</li>
                                    <input 
                                        type='text' 
                                        id='food-item' 
                                        name='food-item' 
                                        placeholder='fat free yogurt'
                                    />
                                <li>Quantity:</li>
                                    <input
                                        type='text'
                                        id='quantity'
                                        name='quantity'
                                        placeholder='2/3 cup'
                                    />
                            </ul>
                            <button type='submit'>Add Item</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//FoodForm.propTypes = {}