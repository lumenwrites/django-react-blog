import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
/* import promise from 'redux-promise';*/
import reduxThunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

// Connect reduxThunk to middleware so I could dispatch actions.
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// store contains the state
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if user has a token - sign him in
if (token) {
    store.dispatch({ type: AUTH_USER });
    console.log(">>>> src/index.js:");	    
    console.log("localStorage contains token, so sign user in.");    
}



ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
  , document.querySelector('.app'));
