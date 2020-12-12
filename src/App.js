import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import Header from './header/header';
import HomePage from './home/home';
import ProfilePage from './profile-page/profile-page';
import EntryPage from './entry-page/entry-page';
import UserHistory from './user-history/user-history';
import UpdateProfile from './update-profile/update-profile';
import UpdateInfo from './update-info/update-info';
import ResultsPage from './results-page/results-page';
import PublicOnlyRoute from './utils/public-only-route';
import PrivateRoute from './utils/private-route';
import TokenService from './services/token-service';
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
    calories: [],
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
  }

  addNewUserCalories = value => {
    this.setState({
      calories: [...this.state.calories, value]
    })
  }

  handleProfilePage = () => {
    this.props.history.push('/login')
  }

  handleCreateProfile = () => {
    this.props.history.push('/log')
  }

  handleLogin = () => {
    this.props.history.push('/log')
  }


  handleCaloricDeficit = (caloricDeficit) => {
    this.setState({
      caloricDeficit,
      error: null,
    })
  }

  handleUserHistory = (e) => {
    e.preventDefault()
    this.props.history.push('/log')
  }

  handleUpdateProfile = profile => {
    this.setState({
      userProfile: profile,
      error: null,
    })
    this.props.history.push('/profile')
  }

  handleUpdateInfo = profile => {
    this.setState({
      userProfile: profile,
      error: null,
    })
    this.props.history.push('/profile')
  }

  handleResultsVariety = (e) => {
    e.preventDefault()
    this.props.history.push('/results')
  }

  handleVideoFetch = (responseJson, caloricDeficit) => {
    this.setState({
      results: responseJson,
      caloricDeficit: caloricDeficit
    })
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
}

  handleDeleteUser = userId => {
    const newUsers = this.state.userProfile.filter(up => up.userId !== userId);
    this.setState({
      user: newUsers
    })
  }

  renderRoutes() {
    return (
      <>
        <PublicOnlyRoute exact path={'/'} component={HomePage} />

        <PublicOnlyRoute path={'/login'} component={ProfilePage} />

        <PrivateRoute path={'/log'} component={EntryPage} />

        <PrivateRoute path={'/profile'} component={UserHistory} />

        <PrivateRoute path={'/update-profile'} component={UpdateProfile} />

        <PrivateRoute path={'/update-info'} component={UpdateInfo} />

        <PrivateRoute path={'/results'} component={ResultsPage} />
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
      addNewUserCalories: this.addNewUserCalories,
      updateNewUserData: this.updateNewUserData,
      handleCreateProfile: this.handleCreateProfile,
      handleLogin: this.handleLogin,
      handleUserForm: this.handleUserForm,
      handleCaloricDeficit: this.handleCaloricDeficit,
      handleUserHistory: this.handleUserHistory,
      handleUpdateProfile: this.handleUpdateProfile,
      handleUpdateInfo: this.handleUpdateInfo,
      handleVideoFetch: this.handleVideoFetch,
      handleResultsVariety: this.handleResultsVariety,
      handleLogoutClick: this.handleLogoutClick,
      handleDeleteUser: this.handleDeleteUser,
    }
    return (
      <Context.Provider value={value}>
        <div className='App'>
          <ErrorBoundary>
            <>
              <header className='App__header'>
                <h1>
                  <Header />
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