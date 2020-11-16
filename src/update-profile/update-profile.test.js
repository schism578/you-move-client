import React from 'react';
import ReactDOM from 'react-dom';
import UpdateProfile from './update-profile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});