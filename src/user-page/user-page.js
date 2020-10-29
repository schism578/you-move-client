import React from 'react';
//import PropTypes from 'prop-types';
import UserForm from '../user-form/user-form';

export default function UserPage(props) {
    return (
        <>
            <UserForm handleUserForm={props.handleUserForm}/>
        </>
    )
}