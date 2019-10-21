import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";


import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import fetchDataReducer from './reducers/index';


const middleWares = [thunk, ]

const store = createStore(
    fetchDataReducer,
    applyMiddleware(...middleWares),
); 

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
