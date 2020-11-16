import React from 'react';
import ReactDOM from 'react-dom';
import CalorieInput from './calorie-input';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalorieInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});