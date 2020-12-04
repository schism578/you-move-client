import React from 'react';
import config from '../config';
import Context from '../context';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import Calendar from 'react-calendar';
import './user-history.css';

class UserHistory extends React.Component {
  static contextType = Context;

  handleClickDelete = e => {
    e.preventDefault()
    const userId = this.props.userProfile.user_id
    const { history } = this.props;

    fetch(`${config.USER_API_ENDPOINT}/${this.props.userProfile.user_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${config.USER_API_TOKEN}`,
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        history.push('/')
        this.context.deleteUser(userId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { first_name, last_name, email, gender, height, weight, age, bmr } = this.context.userProfile;
    const calories = this.context.calories.map((calorie) => {
      const date = moment(calorie.date)
      calorie.date = date.format('ddd MMM DD YYYY')
      return calorie
    });
    return (
      <>
        <form>
          <fieldset className='history-field'>
            <h2>Your Profile</h2>
            <ul className='profile-list'>
              <li>First Name: {first_name}</li>
              <li>Last Name:  {last_name}</li>
              <li>Email:  {email}</li>
              <li>Password:  </li>
              <NavLink to='/update-profile' className='profile_nav'>Edit</NavLink>
            </ul>
            <ul className='info-list'>
              <li>Gender:  {gender}</li>
              <li>Height:  {height}</li>
              <li>Weight:  {weight}</li>
              <li>Age:  {age}</li>
              <li>BMR: {bmr}</li>
              <NavLink to='/update-info' className='profile_nav'>Edit</NavLink>
            </ul>
          </fieldset>
        </form>
        <div className='user-button'>
          <button
            className='user_delete'
            type='button'
            onClick={this.handleClickDelete}
          >Delete Profile</button>
        </div>
        <Calendar
          calendarType='US'
          defaultView='month'
          tileContent={({ activeStartDate, date, view }) => {
            const current = calories.find(logDate => moment(logDate.date).isSame(date))
            if (current) {
              return <div>{current.calories} <br></br> calories</div>
            } else {
              return ''
            }
          }}
        />
        <NavLink to='/log' className='profile_return'>Go Back</NavLink>
      </>
    )
  }
}

export default withRouter(UserHistory);