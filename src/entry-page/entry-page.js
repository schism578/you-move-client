import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import UserForm from '../user-form/user-form';
import FoodForm from '../food-form/food-form';
import CalorieInput from '../calorie-input/calorie-input';
import ResultsVariety from '../results-variety/results-variety';

export default function EntryPage() {
    
        return (
            <div>
                <UserForm />
                <FoodForm />
                <CalorieInput />
                <ResultsVariety />
            </div>
        )
    }
