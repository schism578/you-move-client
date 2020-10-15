import React from 'react';
import { Route, Link } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import config from './config';
import { formatQueryParams, calculateBMR } from '../utility';
import HomePage from './home-page/home-page';
import ProfilePage from './profile-page/profile-page';
import EntryPage from './entry-page/entry-page';
import ResultsPage from './entry-page/entry-page';
import './App.css';

class App extends React.Component {
  state = {
    foods: [],
    results: []
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

  getVideos(maxResults=3) {
    const bmr = calculateBMR();
    const searchBmr = ((bmr/100).toFixed()*100)
    const caloricDeficit = $('.calorie-query').val() - bmr;
    const searchCalories = ((caloricDeficit/100).toFixed()*100);
    const params = {
      key: googleApiKey,
      q: `{'${searchCalories}' calorie '${caloricDeficit}' > 0 ? 'workout' : 'recipe'}`,
      part: 'snippet',
      maxResults,
      type: 'video',
      list: `{'${caloricDeficit}' > 0 ? 'exercise' : 'cooking'}`
    }
  
    const queryString = formatQueryParams(params)
    const videoURL = videoSearchURL + '?' + queryString
  
    return fetch(videoURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        displayInfo(searchBmr, searchCalories)
        displayVideoResults(responseJson)
      })
      
      .catch(err => {
        $('#error-message').text(`Something went wrong with YouTube: ${err.message}`);
      });
}

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
  }*/

renderMainRoutes() {
    return (
      <>
        <Route exact path="/" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/user" component={EntryPage} />
        <Route path="/results" component={ResultsPage} />
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={HomePage} />
        ))}
      </>
    )
  }

  render() {
    return (
        <div className="App">
          <ErrorBoundary>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">YouMove</Link>{' '}
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
          </ErrorBoundary>
        </div>
    );
  }
}

export default App;
