import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import './App.css';

import rootReducer from './rootReducer';
import Header from './interface/Header';
import Board from './board/Board';
import Dashboard from './interface/Dashboard'

const middleware = [logger];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main>
          <Board />
          <Dashboard />
        </main>
      </div>
    </Provider>
  );
}

export default App;
