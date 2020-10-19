import React from 'react';
//import PropTypes from 'prop-types';
import { calculateBMR, caloricDeficit } from '../utility';

export default class UserResultsInfo extends React.Component {
    render() {
        return (
            <div>
                <span>{user.firstName}Your BMR is {calculateBMR} calories. Based on your entered daily calories, 
                you want to have a caloric deficit of {caloricDeficit} calories. Here are the results
                based on your caloric deficit:</span>
            </div>
        )
    }
}