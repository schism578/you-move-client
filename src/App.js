import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import './App.css';

class App extends React.Component {
  state = {

  }

  componentDidMount() {
    /*componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }*/
  }

  renderNavRoutes() {
    /*return (
      <>
        <Route path="/note/:noteId" component={NotePageNav} />
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
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
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
