"use strict";
exports.__esModule = true;
exports.NavigationItem = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var NavigationItem_module_scss_1 = require("./NavigationItem.module.scss");
exports.NavigationItem = function (props) { return (react_1["default"].createElement("li", { className: NavigationItem_module_scss_1["default"].NavigationItem },
    react_1["default"].createElement(react_router_dom_1.NavLink, { exact: true, activeClassName: NavigationItem_module_scss_1["default"].active, to: props.link }, props.children))); };
