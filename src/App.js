import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import './App.css';

class App extends React.Component {
  state = {
    foods: [],
    results: []
  }

  componentDidMount() {
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
  }

  renderNavRoutes() {
    /*return (
      <>
        <Route path="/user/:" component={ResultsPage} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
      </>
    )*/
  }

  renderMainRoutes() {
    /*return (
      <>
        <Route path="/" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/user" component={EntryPage} />
        <Route path="/results" component={ResultsPage} />
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
      </>
    )*/
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
