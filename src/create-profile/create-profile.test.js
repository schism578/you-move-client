import React from 'react';
import ReactDOM from 'react-dom';
import CreateProfile from './create-profile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});