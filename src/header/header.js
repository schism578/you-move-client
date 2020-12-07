import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import './header.css';

export default class Header extends Component {
    handleLogoutClick = () => {
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/login'>
                    Logout
        </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/login'>
                    Register
        </Link>
                <Link
                    to='/login'>
                    Log In
        </Link>
            </div>
        )
    }

    render() {
        return (
            <div>
                <nav className='Header'>
                    <img src={require('../images/youmove_icon.png')} alt='you move icon' id='app_icon' />
                    <h1>
                        <Link to='/' style={{ color: 'white' }}>
                            {' '}
            YouMove
          </Link>
                    </h1>
                </nav>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </div>
        )
    }
}