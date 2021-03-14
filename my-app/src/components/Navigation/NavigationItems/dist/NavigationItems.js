"use strict";
exports.__esModule = true;
exports.NavigationItems = void 0;
var react_1 = require("react");
var NavigationItems_module_scss_1 = require("./NavigationItems.module.scss");
var NavigationItem_1 = require("./NavigationItem/NavigationItem");
exports.NavigationItems = function (props) {
    return (react_1["default"].createElement("ul", { className: NavigationItems_module_scss_1["default"].NavigationItems },
        react_1["default"].createElement(NavigationItem_1.NavigationItem, { link: '/' }, "Burger Builder"),
        props.isAuthenticated ? (react_1["default"].createElement(react_1.Fragment, null,
            react_1["default"].createElement(NavigationItem_1.NavigationItem, { link: '/orders' }, "Orders"),
            react_1["default"].createElement(NavigationItem_1.NavigationItem, { link: '/logout' }, "Logout"))) : (react_1["default"].createElement(NavigationItem_1.NavigationItem, { link: '/auth' }, "Authenticate"))));
};
