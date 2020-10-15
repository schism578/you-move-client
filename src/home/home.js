import React from 'react';
//import { Link } from 'react-router-dom';
import './home.css';

export default function HomePage() {
    return (
        <div>
            <p>Enter your gender, height, weight, and age to yield your BMR, or
                basal metabolic rate (how many calories you burn in a day just 
                sitting still).</p> 
            <p>Then enter your daily calorie intake to calculate a "goal caloric deficit" 
                based against your BMR.</p>
            <p>Workout videos or healthy recipes you can do at home will display or follow one of the 
                links below them to try something different!</p>
            <button type="button" class="start-button">Get Started!</button>
        </div>
    )
}
