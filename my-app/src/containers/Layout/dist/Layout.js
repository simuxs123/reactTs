"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Layout_module_scss_1 = require("./Layout.module.scss");
var Toolbar_1 = require("../../components/Navigation/Toolbar/Toolbar");
var SideDrawer_1 = require("../../components/Navigation/SideDrawer/SideDrawer");
var react_redux_1 = require("react-redux");
var Layout = function (props) {
    var _a = react_1.useState(false), showSiderDrawer = _a[0], setShowSiderDrawer = _a[1];
    var sideDrawerCloseHandler = function () {
        setShowSiderDrawer(!showSiderDrawer);
    };
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(Toolbar_1.Toolbar, { isAuth: props.isAuthenticated, toggle: sideDrawerCloseHandler }),
        react_1["default"].createElement(SideDrawer_1.SideDrawer, { isAuth: props.isAuthenticated, show: showSiderDrawer, moduleClose: sideDrawerCloseHandler }),
        react_1["default"].createElement("main", { className: Layout_module_scss_1["default"].Content }, props.children)));
};
var mapStateToProps = function (_a) {
    var auth = _a.auth;
    return {
        isAuthenticated: auth.token !== ''
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps)(Layout);
