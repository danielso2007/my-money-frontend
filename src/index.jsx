import React from "react";
import ReactDOM from "react-dom";

import AuthOrApp from "./main/authOrApp";
import reduces from './main/reducers';

import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(multi, thunk, promise)(createStore)(reduces, devTools);

ReactDOM.render(
    <Provider store={store}>
        <AuthOrApp />
    </Provider>,
  document.getElementById("app")
);