"use strict";
exports.__esModule = true;
exports.SideDrawer = void 0;
var react_1 = require("react");
var Logo_1 = require("../../Logo/Logo");
var NavigationItems_1 = require("../NavigationItems/NavigationItems");
var Backdrop_1 = require("../../UI/Backdrop/Backdrop");
var SideDrawer_module_scss_1 = require("./SideDrawer.module.scss");
exports.SideDrawer = function (props) {
    var attachedClasses = [SideDrawer_module_scss_1["default"].SideDrawer, SideDrawer_module_scss_1["default"].Close];
    if (props.show) {
        attachedClasses = [SideDrawer_module_scss_1["default"].SideDrawer, SideDrawer_module_scss_1["default"].Open];
    }
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(Backdrop_1.Backdrop, { show: props.show, moduleClose: props.moduleClose }),
        react_1["default"].createElement("div", { onClick: props.moduleClose, className: attachedClasses.join(' ') },
            react_1["default"].createElement("div", { className: SideDrawer_module_scss_1["default"].Logo },
                react_1["default"].createElement(Logo_1.Logo, null)),
            react_1["default"].createElement("nav", null,
                react_1["default"].createElement(NavigationItems_1.NavigationItems, { isAuthenticated: props.isAuth })))));
};
