import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';

describe('first test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppRouter />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
