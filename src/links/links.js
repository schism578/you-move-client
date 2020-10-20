import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default function Links() {
    return (
        <div>
            <h3>Try Something Different:</h3>
            <Link to='https://www.meetup.com/topics/outdoor-yoga/us' target='_blank'>Outdoor Yoga</Link>
            <Link to='https://www.meetup.com/topics/cycling/us/' target='_blank'>Cycling Groups</Link>
            <Link to='https://www.meetup.com/topics/running/us/' target='_blank'>Running Groups</Link>
            <Link to='https://www.meetup.com/topics/fitness/us/' target='_blank'>Fitness Meetups</Link>
            <Link to='https://www.alltrails.com/' target='_blank'>Hiking Trails</Link>
            <Link to='https://www.verywellfit.com/best-online-exercise-classes-4163381' target='_blank'>Online Fitness</Link>
            <Link to='https://www.anytimefitness.com/find-gym/' target='_blank'>Local Gyms</Link>
        </div>
    )
}