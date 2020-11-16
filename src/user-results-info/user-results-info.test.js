import React from 'react';
import ReactDOM from 'react-dom';
import UserResultsInfo from './user-results-info';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserResultsInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});