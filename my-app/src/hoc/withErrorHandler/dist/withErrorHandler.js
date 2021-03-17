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
exports.withErrorHandler = void 0;
var react_1 = require("react");
var Modal_1 = require("../../components/UI/Modal/Modal");
var http_error_handler_1 = require("../../hooks/http-error-handler");
exports.withErrorHandler = function (WrappedComponent, instance) {
    return function (props) {
        var _a = http_error_handler_1["default"](instance), error = _a[0], errorClear = _a[1];
        return (react_1["default"].createElement(react_1.Fragment, null,
            react_1["default"].createElement(Modal_1.Modal, { show: error ? true : false, moduleClose: errorClear }, error ? error : null),
            react_1["default"].createElement(WrappedComponent, __assign({}, props))));
    };
};
