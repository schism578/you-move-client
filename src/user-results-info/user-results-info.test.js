import React from 'react';
import ReactDOM from 'react-dom';
import UserResultsInfo from './user-results-info';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <UserResultsInfo />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});