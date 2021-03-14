"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var App_1 = require("./App");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var burgerBuilder_1 = require("./store/reducers/burgerBuilder");
var order_1 = require("./store/reducers/order");
var auth_1 = require("./store/reducers/auth");
require("./assets/style/App.scss");
var redux_thunk_1 = require("redux-thunk");
var composeEnchaser = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || redux_1.compose;
var rootReducer = redux_1.combineReducers({
    burgerBuilder: burgerBuilder_1["default"],
    order: order_1["default"],
    auth: auth_1["default"]
});
var store = redux_1.createStore(rootReducer, composeEnchaser(redux_1.applyMiddleware(redux_thunk_1["default"])));
var app = (react_1["default"].createElement(react_redux_1.Provider, { store: store },
    react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(App_1["default"], null))));
react_dom_1["default"].render(app, document.getElementById('root'));
