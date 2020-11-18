import React from 'react';
import ReactDOM from 'react-dom';
import EntryPage from './entry-page';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <EntryPage />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});