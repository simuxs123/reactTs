"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var actions = require("../../../store/actions");
var Logout = function (props) {
    var onLogout = props.onLogout;
    react_1.useEffect(function () {
        onLogout();
    }, [onLogout]);
    return react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" });
};
var mapDispatchToProps = function (dispatch) {
    return {
        onLogout: function () { return dispatch(actions.logout()); }
    };
};
exports["default"] = react_redux_1.connect(null, mapDispatchToProps)(Logout);
