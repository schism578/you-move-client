import React from 'react';
import UserResultsInfo from '../user-results-info/user-results-info';
import SearchResults from '../search-results/search-results';
import Links from '../links/links';

export default function ResultsPage() {
    return (
        <>
            <UserResultsInfo />
            <SearchResults />
            <Links />
        </>
    )
}
