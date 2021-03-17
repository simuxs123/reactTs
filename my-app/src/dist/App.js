"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var Layout_1 = require("./containers/Layout/Layout");
var BurgerBuilder_1 = require("./containers/BurgerBuilder/BurgerBuilder");
var Logout_1 = require("./containers/Auth/Logout/Logout");
var actions = require("./store/actions");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Checkout = react_1.lazy(function () { return Promise.resolve().then(function () { return require('./containers/Checkout/Checkout'); }); }); //nezinau tipo
var Orders = react_1.lazy(function () { return Promise.resolve().then(function () { return require('./containers/Orders/Orders'); }); }); //nezinau tipo
var Auth = react_1.lazy(function () { return Promise.resolve().then(function () { return require('./containers/Auth/Auth'); }); }); //nezinau tipo
var App = function (props) {
    var onTrySignUp = props.onTrySignUp;
    react_1.useEffect(function () {
        onTrySignUp();
    }, [onTrySignUp]);
    var routes = (react_1["default"].createElement(react_router_dom_1.Switch, null,
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/auth", render: function () { return react_1["default"].createElement(Auth, null); } }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/", exact: true, component: BurgerBuilder_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" })));
    if (props.isAuthenticated) {
        routes = (react_1["default"].createElement(react_router_dom_1.Switch, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/checkout", render: function (props) { return react_1["default"].createElement(Checkout, __assign({}, props)); } }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/auth", render: function () { return react_1["default"].createElement(Auth, null); } }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/orders", render: function () { return react_1["default"].createElement(Orders, null); } }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/logout", component: Logout_1["default"] }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", exact: true, component: BurgerBuilder_1["default"] }),
            react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" })));
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Layout_1["default"], null,
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement("p", null, "Loading...") }, routes))));
};
var mapStateToProps = function (_a) {
    var auth = _a.auth;
    return {
        isAuthenticated: auth.token !== ''
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onTrySignUp: function () { return dispatch(actions.authCheckState()); }
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
