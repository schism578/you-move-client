import React from 'react';
import ReactDOM from 'react-dom';
import Links from './links';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Links />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});