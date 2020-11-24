import React from 'react';
import Context from '../context';
import './search-results.css';
//import PropTypes from 'prop-types';

export default class SearchResults extends React.Component {
  //props or context needs to live here
  static contextType = Context;
  results = this.context.results;

  videoResults = this.results.items.map(item => (
    <li>
        <h4>{item.snippet.title}</h4>
        <p>{item.snippet.description}</p>
        <div class="videoWrapper">
            <iframe width="560" height="315" title="results-video" src="https://www.youtube.com/embed/{item.id.videoId}"
              frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen></iframe>
        </div>
    </li>
))
  
  render() {
    return (
      <div>
        <h2>Search Results:</h2>
        <ul className='results-list'>
          {this.videoResults}
        </ul>
      </div>
    )
  }
  }