"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.authCheckState = exports.auth = exports.authFail = exports.authSucces = exports.authLoading = exports.checkAuthTimeout = exports.setAuthRedirect = exports.logout = void 0;
var actionTypes_1 = require("./actionTypes");
var axios_1 = require("axios");
exports.logout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes_1.ActionTypes.AUTH_LOGOUT
    };
};
exports.setAuthRedirect = function (path) {
    return {
        type: actionTypes_1.ActionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
exports.checkAuthTimeout = function (expirationTime) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch(exports.logout());
        }, +expirationTime * 1000);
    };
};
exports.authLoading = function () {
    return {
        type: actionTypes_1.ActionTypes.AUTH_LOADING
    };
};
exports.authSucces = function (idToken, userId) {
    return {
        type: actionTypes_1.ActionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: userId
    };
};
exports.authFail = function (err) {
    return {
        type: actionTypes_1.ActionTypes.AUTH_FAIL,
        error: err
    };
};
exports.auth = function (email, password, isSignup) {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var authData, url, res, expirationDate, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(exports.authLoading());
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    authData = {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    };
                    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIdArHqkh_GZYeSvw-z9s0RUYStbuHT3w';
                    if (!isSignup) {
                        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIdArHqkh_GZYeSvw-z9s0RUYStbuHT3w';
                    }
                    return [4 /*yield*/, axios_1["default"].post(url, authData)];
                case 2:
                    res = _a.sent();
                    expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate + "");
                    localStorage.setItem('userId', res.data.localId);
                    dispatch(exports.authSucces(res.data.idToken, res.data.localId));
                    if (!isSignup) {
                        dispatch(exports.checkAuthTimeout(res.data.expiresIn));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    dispatch(exports.authFail(err_1.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
exports.authCheckState = function () {
    return function (dispatch) {
        var token = localStorage.getItem('token');
        if (!token) {
            dispatch(exports.logout());
        }
        else {
            var expirationDat = new Date(localStorage.getItem("expirationDate") + "");
            if (expirationDat < new Date()) {
                dispatch(exports.logout());
            }
            else {
                var userId = localStorage.getItem('userId');
                dispatch(exports.authSucces(token, userId));
                dispatch(exports.checkAuthTimeout((expirationDat.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
