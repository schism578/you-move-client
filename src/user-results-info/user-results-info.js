import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { calculateBMR, caloricDeficit } from '../utility';

export default function UserResultsInfo() {
    return (
        $('span').text(`Your BMR is ${calculateBMR} calories. Based on your entered daily calories, 
        you want to have a caloric deficit of ${caloricDeficit} calories. Here are the results
        based on your caloric deficit:`)
    )
}