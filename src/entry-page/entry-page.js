import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import getVideos from '../utility';
import UserForm from '../user-form/user-form';
import FoodForm from '../food-form/food-form';
import CalorieInput from '../calorie-input/calorie-input';
import ResultsVariety from '../results-variety/results-variety';

export default function EntryPage(props) {
    {getVideos(bmr, caloricDeficit)}
    return (
        <>
            <UserForm />
            <FoodForm />
            <CalorieInput />
            <ResultsVariety />
        </>
    )
}
