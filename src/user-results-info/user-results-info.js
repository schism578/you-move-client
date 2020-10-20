import React from 'react';
//import PropTypes from 'prop-types';
//import { calculateBMR, caloricDeficit } from '../utility';

export default class UserResultsInfo extends React.Component {
    render() {
        return (
            <div>
                <span>USER NAME your BMR is BMR VALUE calories. Based on your entered daily calories, 
                you want to have a caloric deficit of CALORIC DEFICIT calories. Here are the results
                based on your caloric deficit:</span>
            </div>
        )
    }
}