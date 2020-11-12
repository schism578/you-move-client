import React from 'react';
import Context from '../context';
import { NavLink, withRouter } from 'react-router-dom';
import './calorie-input.css';
//import PropTypes from 'prop-types';

class CalorieInput extends React.Component {
    //props or context needs to live here
    static contextType = Context;

    render() {
        return (
            <div>
                <form className='calorie-input' onSubmit={this.props.handleCalorieInput}>
                    <fieldset>
                        <legend>Or Just Enter Your Daily Calories</legend>
                            <input 
                                type='number' 
                                className='calorie-query' 
                                placeholder='2000' 
                                min='1' 
                                step='1' 
                                required
                            />
                            <br></br>
                            <NavLink to='/profile' className='nav_link'>View Your History</NavLink>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default withRouter(CalorieInput);
//CalorieInput.propTypes = {}