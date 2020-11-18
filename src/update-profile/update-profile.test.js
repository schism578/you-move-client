import React from 'react';
import ReactDOM from 'react-dom';
import UpdateProfile from './update-profile';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <UpdateProfile />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});