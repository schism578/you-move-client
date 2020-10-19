import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import CreateProfile from '../create-profile/create-profile';
import Login from '../login/login';

export default function ProfilePage(props) {
    return (
        <>
            <CreateProfile handleProfileCreate={props.handleCreateProfile}/>
            <Login handleLogin={props.handleLogin}/>
        </>
    )
}