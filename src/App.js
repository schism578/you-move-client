import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import config from './config';
//import { calculateBMR } from './utility';
import HomePage from './home/home';
import ProfilePage from './profile-page/profile-page';
import UserPage from './user-page/user-page';
import EntryPage from './entry-page/entry-page';
import ResultsPage from './results-page/results-page';
import Context from './context';
import './App.css';

class App extends React.Component {
  state = {
    userProfile: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      gender: '',
      height: '',
      weight: '',
      age: '',
      calories: '',
      bmr: '',
      hasError: false,
    },
    foods: [],
    videos: [],
  }

  setUserProfile = profile => {
    this.setState({
      profile,
      error: null,
    })
  }

  setFoods = foods => {
    this.setState({
      foods,
      error: null,
    })
  }

  setVideos = videos => {
    this.setState({
      videos,
      error: null,
    })
  }

  componentDidMount() {
    fetch(config.USER_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.USER_API_KEY}`,
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => this.setUserProfile(data))
      .catch(error => this.setState({ error }))

    fetch(config.VIDEO_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.VIDEO_API_KEY}`,
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => this.setVideos(data))
      .catch(error => this.setState({ error }))
  }

  handleCreateProfile(e) {
    e.preventDefault() 
    this.props.history.push('/user')
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.history.push('/user')
  }

  handleAddUser(e) {
    e.preventDefault()
    this.props.history.push('/log')
  }
  
  handleUserForm(e) {
    e.preventDefault()
    this.props.history.push('/log')
  }

  handleResultsVariety(e) {
    e.preventDefault()
    this.props.history.push('/results')
  }

  handleFoodForm(e) {
    e.preventDefault()
    this.props.history.push('/results')
  }

  handleCalorieInput(e) {
    e.preventDefault()
    this.props.history.push('/results')
  }

  handleDeleteUser = userId => {
    const newUsers = this.state.userProfile.filter(up => up.id !== userId);
    this.setState({
      user: newUsers
    })
  }

  /*formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  getVideos(maxResults=3) {
    const bmr = calculateBMR();
    const searchBmr = ((bmr/100).toFixed()*100);
    const calorieQuery = (document.getElementsByClassName('calorie-query')).value
    const caloricDeficit =  calorieQuery - bmr;
    const searchCalories = ((caloricDeficit/100).toFixed()*100);
    const params = {
      key: `${config.VIDEO_API_KEY}`,
      q: `{${searchCalories} calorie ${caloricDeficit} > 0 ? 'workout' : 'recipe'}`,
      part: 'snippet',
      maxResults,
      type: 'video',
      list: `{${caloricDeficit} > 0 ? 'exercise' : 'cooking'}`
    }
  
    const queryString = this.formatQueryParams(params)
    const videoURL = `${config.VIDEO_API_ENDPOINT} + '?' + ${queryString}`
  
    return fetch(videoURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        //displayInfo(searchBmr, searchCalories)
        //displayVideoResults(responseJson)
      })
      
      .catch(err => {
        document.getElementById('error-message').text(`Something went wrong with YouTube: ${err.message}`);
      });
}*/

renderRoutes() {
    return (
      <>
        <Route exact path='/'> 
          <HomePage />
        </Route>
        <Route path='/profile'> 
          <ProfilePage handleCreateProfile={this.handleCreateProfile.bind(this)}
                       handleLogin={this.handleLogin.bind(this)}
          />
        </Route>
        <Route path='/user'>
          <UserPage handleUserForm={this.handleUserForm.bind(this)} />
        </Route>
        <Route path='/log'>
          <EntryPage handleResultsVariety={this.handleResultsVariety.bind(this)}
                     handleFoodForm={this.handleFoodForm.bind(this)}
                     handleCalorieInput={this.handleCalorieInput.bind(this)}
          />
        </Route> 
        <Route path='/results'>
          <ResultsPage />
        </Route> 
      </>
    )
  }

  render() {
    const value = {
      userProfile: this.state.userProfile,
      foods: this.state.foods,
      videos: this.state.videos,
      newUser: this.state.newUser,
      deleteUser: this.handleDeleteUser,
      updateNewUserData: this.updateNewUserData,
      handleCreateProfile: this.handleCreateProfile,
      handleLogin: this.handleLogin,
      handleUserForm: this.handleUserForm,
      handleFoodForm: this.handleFoodForm,
      handleCalorieInput: this.handleCalorieInput,
      handleResultsVariety: this.handleResultsVariety
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <ErrorBoundary>
          <>
          <header className='App__header'>
            <h1>
              <Link to='/'>YouMove</Link>{' '}
            </h1>
          </header>
          <main className='App__main'>{this.renderRoutes()}</main>
          </>
          </ErrorBoundary>
        </div>
      </ApiContext.Provider>
    );
  }
}


export default withRouter(App);
