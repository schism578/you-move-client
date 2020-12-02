import React from 'react';
import CreateProfile from '../create-profile/create-profile';
import Login from '../login/login';

export default function ProfilePage(props) {
    return (
        <>
            <CreateProfile handleCreateProfile={props.handleCreateProfile}/>
            <Login handleLogin={props.handleLogin}/>
        </>
    )
}