import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default class FoodForm extends React.Component {
    //props or context needs to live here
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