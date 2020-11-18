import React from 'react';
import ReactDOM from 'react-dom';
import ResultsPage from './results-page';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <ResultsPage />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});