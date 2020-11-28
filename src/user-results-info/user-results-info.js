import React from 'react';
import Context from '../context';
//import PropTypes from 'prop-types';

export default class UserResultsInfo extends React.Component {
    static contextType = Context;

    render() {
        const { first_name, bmr, caloricDeficit } = this.context.userProfile
        return (
            <div>
                <p>{first_name} your BMR is {bmr} calories. Based on your entered 
                daily calories, you want to have a caloric deficit of {caloricDeficit} 
                calories. Here are the results based on your caloric deficit:</p>
            </div>
        )
    }
}