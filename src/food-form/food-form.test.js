import React from 'react';
import ReactDOM from 'react-dom';
import FoodForm from './food-form';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <FoodForm />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});