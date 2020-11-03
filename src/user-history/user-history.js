import React from 'react';
import Context from '../context';
import { NavLink, withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';

class UserHistory extends React.Component {
    static contextType = Context;

    render() {
        return (
            <>
                <h2>Your Profile</h2>
                <ul>
                    <NavLink to='/update-profile'>Edit</NavLink>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Email</li>
                    <li>Password</li>
                </ul>
                <ul>
                    <NavLink to='/update-info'>Edit</NavLink>
                    <li>Gender</li>
                    <li>Height</li>
                    <li>Weight</li>
                    <li>Age</li>
                </ul>
                <Calendar 
                    calendarType='US'
                    defaultView='month'
                    tileContent='calories logged'
                />
                <NavLink to='/log'>Go Back</NavLink>
            </>
        )
    }
}

export default withRouter(UserHistory);