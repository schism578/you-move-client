import React from 'react';
import ReactDOM from 'react-dom';
import Links from './links';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Links />, div);
  ReactDOM.unmountComponentAtNode(div);
});