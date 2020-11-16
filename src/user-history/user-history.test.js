import React from 'react';
import ReactDOM from 'react-dom';
import UserHistory from './user-history';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserHistory />, div);
  ReactDOM.unmountComponentAtNode(div);
});