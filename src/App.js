import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Application from './components/Application.jsx';
import reducer from './reducers/reducer.js';

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Application/>
  </Provider>,
  document.getElementById('app')
)
