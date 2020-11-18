import React from 'react';
import ReactDOM from 'react-dom';
import CalorieInput from './calorie-input';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <CalorieInput />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});