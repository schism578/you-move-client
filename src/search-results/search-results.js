import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { getVideos } from '../utility';

export default function SearchResults(responseJson) {
    {getVideos(bmr, caloricDeficit)}
    $('#results-list').empty();
    for (let i = 0; i < responseJson.items.length; i++){
      $('#results-list').append(
        `<li><h4>${responseJson.items[i].snippet.title}</h4>
        <p>${responseJson.items[i].snippet.description}</p>
        <div class="videoWrapper">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
        </div>
        </li>
        `
      )};
    $('#results').removeClass('hidden');
}


  