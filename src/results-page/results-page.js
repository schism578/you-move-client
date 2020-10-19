import React from 'react';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import UserResultsInfo from '../user-results-info/user-results-info';
import SearchResults from '../search-results/search-results';
import Links from '../links/links';

export default function ResultsPage(props) {
    return (
        <>
            <UserResultsInfo handleUserResultsInfo={props.handleUserResultsInfo}/>
            <SearchResults handleSearchResults={props.handleSearchResults}/>
            <Links handleLinks={props.handleLinks}/>
        </>
    )
}