import React from 'react';
import Context from '../context';
import './search-results.css';

export default class SearchResults extends React.Component {
  static contextType = Context;

  videoResults = () => this.context.results.items.map(item => (
    <li key={`${item.id.videoId}`} className='results-list-item'>
      <h4>{item.snippet.title}</h4>
      <p>{item.snippet.description}</p>
      <div className="videoWrapper">
        <iframe width="560" height="315" title="results-video"
          src={`https://www.youtube.com/embed/${item.id.videoId}`}
          frameBorder="0" allow="accelerometer; autoplay; encrypted-media; 
          gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
      </div>
    </li>
  ))

  render() {
    return (
      <div>
        <h2>Search Results:</h2>
        <ul className='results-list'>
          {this.videoResults()}
        </ul>
      </div>
    )
  }
}