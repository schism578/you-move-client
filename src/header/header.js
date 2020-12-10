import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TokenService from '../services/token-service';
import './header.css';

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <NavLink
                    to='/profile'
                    className='nav_link'
                >
                    View Your Profile
                </NavLink>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/login'
                    className='logout-link'
                >
                    Logout
                </Link>
            </div>
        )
    }

    render() {
        return (
            <div>
                <nav className='Header'>
                    <img src={require('../images/favicon.jpg')} alt='you move icon' id='app_icon' />
                    <h1>
                        <Link 
                            to='/'
                            className='app-link'
                        >
                            YouMove
                        </Link>
                    </h1>
                </nav>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : ''}
            </div>
        )
    }
}