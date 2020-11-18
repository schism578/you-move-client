import React from 'react';
import ReactDOM from 'react-dom';
import ResultsVariety from './results-variety';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <ResultsVariety />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});