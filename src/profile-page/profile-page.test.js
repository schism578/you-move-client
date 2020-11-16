import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from './profile-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfilePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});