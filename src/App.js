import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
//import config from './config';
//import { calculateBMR } from './utility';
import HomePage from './home/home';
import ProfilePage from './profile-page/profile-page';
import EntryPage from './entry-page/entry-page';
import ResultsPage from './results-page/results-page';
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
    newUser: {
      first_name: {
        touched: false,
        value: '',
      },
      last_name: {
        touched: false,
        value: '',
      },
      email: {
        touched: false,
        value: '',
      },
      password: {
        touched: false,
        value: '',
      },
      gender: {
        touched: false,
        value: '',
      },
      height: {
        touched: false,
        value: '',
      },
      weight: {
        touched: false,
        value: '',
      },
      age: {
        touched: false,
        value: '',
      },
      bmr: {
        touched: false,
        value: '',
      },
    },
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

  deleteUser = userId => {
    const newUsers = this.state.userProfile.filter(up =>
      up.id !== userId
    )
    this.setState({
      user: newUsers
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

    fetch(config.FOOD_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.FOOD_API_KEY}`,
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => this.setFoods(data))
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

  updateNewUserData = (input, value) => {
    this.setState({
      newUser: {
          ...this.state.newUser,
        [input]: {
          touched: true,
          value: value,
        },
      },
    })
  }

  handleCreateProfile(e) {
    e.preventDefault() 
    this.props.history.push('/user')
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.history.push('/user')
  }

  handleUserEntry(e) {
    e.preventDefault()
    this.props.history.push('/results')
  }

  handleUserForm(e) {
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
  /*componentDidMount() {
    Promise.all([
      fetch(`${config.FOOD_API_ENDPOINT}`),
      fetch(`${config.VIDEO_API_ENDPOINT}`),
    ])
      .then(([foodsRes, videosRes]) => {
        if (!foodsRes.ok) return foodsRes.json().then(e => Promise.reject(e))
        if (!videosRes.ok)
          return videosRes.json().then(e => Promise.reject(e))

        return Promise.all([foodsRes.json(), videosRes.json()])
      })
      .then(([foods, videos]) => {
        this.setState({ foods, videos })
      })
      .catch(error => {
        console.error({ error })
      })
  }*/

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

  /*renderNavRoutes() {
    return (
      <>
        <Route path="/user/:" component={ResultsPage} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
      </>
    )
  }
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
*/

renderMainRoutes() {
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
          <EntryPage handleUserEntry={this.handleUserEntry.bind(this)}
                     handleUserForm={this.handleUserForm.bind(this)}
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
    return (
        <div className='App'>
          <ErrorBoundary>
          <>
          <header className='App__header'>
            <h1>
              <Link to='/'>YouMove</Link>{' '}
            </h1>
          </header>
          <main className='App__main'>{this.renderMainRoutes()}</main>
          </>
          </ErrorBoundary>
        </div>
    );
  }
}


export default withRouter(App);
