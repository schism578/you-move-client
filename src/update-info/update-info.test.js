import React from 'react';
import ReactDOM from 'react-dom';
import UpdateInfo from './update-info';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});