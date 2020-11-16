import React from 'react';
import ReactDOM from 'react-dom';
import EntryPage from './entry-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EntryPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});