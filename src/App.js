import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import HomePage from './home/home';
import ProfilePage from './profile-page/profile-page';
import EntryPage from './entry-page/entry-page';
import UserHistory from './user-history/user-history';
import UpdateProfile from './update-profile/update-profile';
import UpdateInfo from './update-info/update-info';
import ResultsPage from './results-page/results-page';
import PrivateRoute from './utils/private-route';
import PublicOnlyRoute from './utils/public-only-route';
import Context from './context';
import './App.css';

class App extends React.Component {
  state = {
    userProfile: {
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      gender: '',
      height: '',
      weight: '',
      age: '',
      bmr: '',
      hasError: false,
    },
    calories: {
      hasError: false,
      touched: false,
      value: '',
    },
    caloricDeficit: 0,
    results: {
      items: [],
    },
  }

  setUserProfile = profile => {
    this.setState({
      userProfile: profile,
      error: null,
    })
  }

  setUserCalories = value => {
    this.setState({
      calories: value,
      error: null,
    })
    console.log(value)
  }

  handleCreateProfile(e) {
    e.preventDefault()
    this.props.history.push('/log')
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.history.push('/log')
  }


  handleCaloricDeficit = (caloricDeficit) => {
    this.setState({
      caloricDeficit,
      error: null,
    })
  }

  handleUserHistory(e) {
    e.preventDefault()
    this.props.history.push('/log')
  }

  handleUpdateProfile() {
    this.props.history.push('/profile')
  }

  handleUpdateInfo() {
    this.props.history.push('/profile')
  }

  handleResultsVariety(e) {
    e.preventDefault()
    this.props.history.push('/results')
  }

  handleVideoFetch = (responseJson, caloricDeficit) => {
    this.setState({
      results: responseJson,
      caloricDeficit: caloricDeficit
    })
  }

  handleDeleteUser = userId => {
    const newUsers = this.state.userProfile.filter(up => up.id !== userId);
    this.setState({
      user: newUsers
    })
  }

  renderRoutes() {
    return (
      <>
        <PublicOnlyRoute exact path='/'>
          <HomePage />
        </PublicOnlyRoute>

        <PublicOnlyRoute path='/login'>
          <ProfilePage handleCreateProfile={this.handleCreateProfile.bind(this)}
            handleLogin={this.handleLogin.bind(this)}
          />
        </PublicOnlyRoute>

        <PrivateRoute path='/log'>
          <EntryPage handleResultsVariety={this.handleResultsVariety.bind(this)}
          />
        </PrivateRoute>

        <PrivateRoute path='/profile'>
          <UserHistory handleUserHistory={this.handleUserHistory.bind(this)} />
        </PrivateRoute>

        <PrivateRoute path='/update-profile'>
          <UpdateProfile handleUpdateProfile={this.handleUpdateProfile.bind(this)} />
        </PrivateRoute>

        <PrivateRoute path='/update-info'>
          <UpdateInfo handleUpdateInfo={this.handleUpdateInfo.bind(this)} />
        </PrivateRoute>

        <PrivateRoute path='/results'>
          <ResultsPage />
        </PrivateRoute>
      </>
    )
  }

  render() {
    const value = {
      calories: this.state.calories,
      caloricDeficit: this.state.caloricDeficit,
      userProfile: this.state.userProfile,
      results: this.state.results,
      newUser: this.state.newUser,
      deleteUser: this.handleDeleteUser,
      setUserProfile: this.setUserProfile,
      setUserCalories: this.setUserCalories,
      updateNewUserData: this.updateNewUserData,
      handleCreateProfile: this.handleCreateProfile,
      handleLogin: this.handleLogin,
      handleUserForm: this.handleUserForm,
      handleCaloricDeficit: this.handleCaloricDeficit,
      handleUserHistory: this.handleUserHistory,
      handleVideoFetch: this.handleVideoFetch,
      handleResultsVariety: this.handleResultsVariety
    }
    return (
      <Context.Provider value={value}>
        <div className='App'>
          <ErrorBoundary>
            <>
              <header className='App__header'>
                <img src={require('./images/youmove_icon.png')} alt='you move icon' id='app_icon' />
                <h1>
                  <Link to='/' style={{ color: 'white' }}>YouMove</Link>{' '}
                </h1>
              </header>
              <main className='App__main'>{this.renderRoutes()}</main>
            </>
          </ErrorBoundary>
        </div>
      </Context.Provider>
    );
  }
}

export default withRouter(App);