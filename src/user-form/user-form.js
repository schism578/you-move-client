import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default class UserForm extends React.Component {
    //props or context needs to live here
    render() {
        return (
            <div>
                <form className='user-form' onSubmit={this.props.handleUserForm}>
                    <fieldset>
                    <legend>Enter Your Info:</legend>
                        <ul>
                            <li>
                                <label htmlFor='gender'>Gender:</label>
                                <select name='gender' id='gender'>
                                <option value='female'>female</option>
                                <option value='male'>male</option>
                                </select>
                            </li>
                            <li>Height:</li>
                                <input 
                                    type='number' 
                                    id='height' 
                                    name='height' 
                                    placeholder='70 (inches)' 
                                    min='1' 
                                    step='1' 
                                    required
                                />
                            <li>Weight:</li>
                                <input 
                                    type='number' 
                                    id='weight' 
                                    name='weight' 
                                    placeholder='170 (pounds)' 
                                    min='1' 
                                    step='1' 
                                    required
                                />
                            <li>Age:</li>
                                <input 
                                    type='number' 
                                    id='age' 
                                    name='age' 
                                    placeholder='23 (years)' 
                                    min='1' 
                                    step='1' 
                                    required
                                />
                        </ul>
                    </fieldset>
                </form>
            </div>
        )
    }
}

//UserForm.propTypes = {}