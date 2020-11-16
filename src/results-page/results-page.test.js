import React from 'react';
import ReactDOM from 'react-dom';
import ResultsPage from './results-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});