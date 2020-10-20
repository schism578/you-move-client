import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

export default class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <h2>Search Results:</h2>
        <ul className='results-list'>
          <li>
            <h4>Video Title</h4>
              <p>Video Description</p>
                <div className='videoWrapper'>
                  <iframe width='560' height='315' src='https://www.youtube.com/embed/${responseJson.items[i].id.videoId}' 
                  frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' 
                  allowfullscreen></iframe>
                </div>
                <div className='videoWrapper'>
                  <iframe width='560' height='315' src='https://www.youtube.com/embed/${responseJson.items[i].id.videoId}' 
                  frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' 
                  allowfullscreen></iframe>
                </div>
                <div className='videoWrapper'>
                  <iframe width='560' height='315' src='https://www.youtube.com/embed/${responseJson.items[i].id.videoId}' 
                  frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' 
                  allowfullscreen></iframe>
                </div>
          </li>
        </ul>
      </div>
    )
  }
}


  