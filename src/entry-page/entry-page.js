import React from 'react';
import ResultsVariety from '../results-variety/results-variety';

export default function EntryPage(props) {
    return (
        <>
            <ResultsVariety handleResultsVariety={props.handleResultsVariety} />
        </>
    )
}
