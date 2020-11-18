import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});