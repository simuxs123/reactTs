import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import burgerOrderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import './assets/style/App.scss';
import thunk from 'redux-thunk';

const composeEnchaser =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: burgerOrderReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, composeEnchaser(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
