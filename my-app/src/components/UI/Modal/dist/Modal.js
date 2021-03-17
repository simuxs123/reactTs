"use strict";
exports.__esModule = true;
exports.Modal = void 0;
var react_1 = require("react");
var Modal_module_scss_1 = require("./Modal.module.scss");
var Backdrop_1 = require("../Backdrop/Backdrop");
exports.Modal = react_1["default"].memo(function (props) {
    // shouldComponentUpdate(nextProps: Props) {
    //   return (
    //     nextProps.show !== this.props.show ||
    //     nextProps.children !== this.props.children
    //   );
    // }
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(Backdrop_1.Backdrop, { show: props.show, moduleClose: props.moduleClose }),
        react_1["default"].createElement("div", { style: {
                transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
                opacity: props.show ? 1 : 0
            }, className: Modal_module_scss_1["default"].Modal }, props.children)));
}, function (prevProps, nextProps) {
    return nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children;
});
