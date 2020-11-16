import React from 'react';
import ReactDOM from 'react-dom';
import FoodForm from './food-form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FoodForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});