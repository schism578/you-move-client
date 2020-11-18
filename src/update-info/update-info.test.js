import React from 'react';
import ReactDOM from 'react-dom';
import UpdateInfo from './update-info';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <UpdateInfo />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});