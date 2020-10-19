import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import UserForm from '../user-form/user-form';
import FoodForm from '../food-form/food-form';
import CalorieInput from '../calorie-input/calorie-input';
import ResultsVariety from '../results-variety/results-variety';

export default function EntryPage(props) {
    
        return (
            <>
                <UserForm handleUserForm={props.handleUserForm}/>
                <FoodForm handleFoodForm={props.handleFoodForm}/>
                <CalorieInput handleCalorieInput={props.handleCalorieInput}/>
                <ResultsVariety handleUserEntry={props.handleUserEntry}/>
            </>
        )
    }
