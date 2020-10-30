import React from 'react';
import Context from '../context';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default class CalorieInput extends React.Component {
    //props or context needs to live here
    static contextType = Context;
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
                                min='1' 
                                step='1' 
                                required
                            />
                            <Link to='/history/:user_id'>View Your History</Link>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//CalorieInput.propTypes = {}