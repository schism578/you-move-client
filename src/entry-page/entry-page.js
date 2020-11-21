import React from 'react';
//import PropTypes from 'prop-types';
//import FoodForm from '../food-form/food-form';
//import CalorieInput from '../calorie-input/calorie-input';
import ResultsVariety from '../results-variety/results-variety';

export default function EntryPage(props) {
    return (
        <>
            {/*<FoodForm handleFoodForm={props.handleFoodForm}/>*/}
            {/*<CalorieInput handleCalorieInput={props.handleCalorieInput}/>*/}
            <ResultsVariety handleResultsVariety={props.handleResultsVariety}/>
        </>
    )
}
