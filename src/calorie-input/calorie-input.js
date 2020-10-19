import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default class CalorieInput extends React.Component {
    render() {
        return (
            <div>
                <form className='calorie-input' onSubmit={this.props.handleCalorieInput}>
                    <fieldset>
                        <legend>Or Just Enter Your Daily Calories:</legend>
                            <input 
                                type='number' 
                                className='calorie-query' 
                                placeholder='2000' 
                                min="1" 
                                step="1" 
                                required
                            />
                    </fieldset>
                </form>
            </div>
        )
    }
}

//CalorieInput.propTypes = {}