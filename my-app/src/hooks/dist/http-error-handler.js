"use strict";
exports.__esModule = true;
var react_1 = require("react");
exports["default"] = (function (httpClient) {
    var _a = react_1.useState(""), error = _a[0], setError = _a[1];
    var reqInterceptor = httpClient.interceptors.request.use(function (req) {
        setError("");
        return req;
    });
    var resInterceptor = httpClient.interceptors.response.use(function (res) { return res; }, function (error) {
        setError(error.message);
    });
    react_1.useEffect(function () {
        return function () {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);
    var errorConfirmedHandler = function () {
        setError("");
    };
    return [error, errorConfirmedHandler];
});
