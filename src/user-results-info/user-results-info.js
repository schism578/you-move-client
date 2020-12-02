import React from 'react';
import Context from '../context';

export default class UserResultsInfo extends React.Component {
    static contextType = Context;

    render() {
        const { first_name, bmr } = this.context.userProfile
        const caloricDeficit = this.context.caloricDeficit
        return (
            <div>
                <p>{first_name} your BMR is {bmr} calories. Based on your entered
                daily calories, you want to have a caloric deficit of {caloricDeficit} {''}
                calories. Here are the results based on your caloric deficit:</p>
            </div>
        )
    }
}