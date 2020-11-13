import React from 'react';
import Context from '../context';
//import PropTypes from 'prop-types';
//import { calculateBMR, caloricDeficit } from '../utility';

export default class UserResultsInfo extends React.Component {
    //props or context needs to live here
    static contextType = Context;
    render() {
        return (
            <div>
                <p>`${this.context.userProfile.first_name} your BMR is  calories. Based on your entered daily calories, 
                you want to have a caloric deficit of CALORIC DEFICIT calories. Here are the results
                based on your caloric deficit:</p>
            </div>
        )
    }
}