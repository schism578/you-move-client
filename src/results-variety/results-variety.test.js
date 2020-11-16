import React from 'react';
import ReactDOM from 'react-dom';
import ResultsVariety from './results-variety';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultsVariety />, div);
  ReactDOM.unmountComponentAtNode(div);
});