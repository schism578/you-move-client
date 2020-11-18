import React from 'react';
import ReactDOM from 'react-dom';
import CreateProfile from './create-profile';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <CreateProfile />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});