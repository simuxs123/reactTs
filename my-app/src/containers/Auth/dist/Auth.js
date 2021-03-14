"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Input_1 = require("../../components/UI/Input/Input");
var Button_1 = require("../../components/UI/Button/Button");
var Spinner_1 = require("../../components/UI/Spinner/Spinner");
var react_router_dom_1 = require("react-router-dom");
var Auth_module_scss_1 = require("./Auth.module.scss");
var actions = require("../../store/actions/index");
var react_redux_1 = require("react-redux");
var utility_1 = require("../../shared/utility");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            control: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    error: 'Invalid email',
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Your password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    error: 'Password min length 6 characters',
                    touched: false
                }
            },
            emptyError: '',
            isSignup: true
        };
        _this.inputChangedHandler = function (event, controlName) {
            var _a;
            var updatedControls = __assign(__assign({}, _this.state.control), (_a = {}, _a[controlName] = __assign(__assign({}, _this.state.control[controlName]), { value: event.target.value, valid: utility_1.checkValidity(event.target.value, _this.state.control[controlName].validation), touched: true }), _a));
            _this.setState({ control: updatedControls });
        };
        _this.submitHandler = function (event) {
            event.preventDefault();
            _this.setState(__assign(__assign({}, _this.state.control), { emptyError: 'Please fill all inputs' }));
            if (_this.state.control.email.value && _this.state.control.password.value) {
                _this.props.onAuth(_this.state.control.email.value, _this.state.control.password.value, _this.state.isSignup);
                _this.setState(__assign(__assign({}, _this.state.control), { emptyError: '' }));
            }
        };
        _this.switchAuthModeHandler = function () {
            _this.setState(function (prevState) {
                return { isSignup: !prevState.isSignup };
            });
        };
        return _this;
    }
    Auth.prototype.componentDidMount = function () {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    };
    Auth.prototype.render = function () {
        var _this = this;
        var formElementsArray = [];
        for (var _i = 0, _a = Object.entries(this.state.control); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            formElementsArray.push({
                id: key,
                config: value
            });
        }
        var form = formElementsArray.map(function (_a) {
            var id = _a.id, config = _a.config;
            return (react_1["default"].createElement(Input_1.Input, { key: id, elementType: config.elementType, value: config.value, elementConfig: config.elementConfig, changed: function (event) { return _this.inputChangedHandler(event, id); }, invalid: !config.valid, touched: config.touched, error: config.error }));
        });
        if (this.props.loadingAuth) {
            form = react_1["default"].createElement(Spinner_1.Spinner, null);
        }
        var errorMessage = '';
        if (this.props.errorAuth) {
            errorMessage = this.props.errorAuth;
        }
        var authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = react_1["default"].createElement(react_router_dom_1.Redirect, { to: this.props.authRedirectPath });
        }
        return (react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].Auth },
            authRedirect,
            this.state.isSignup ? react_1["default"].createElement("h1", null, "SIGN UP") : react_1["default"].createElement("h1", null, "SIGN IN"),
            react_1["default"].createElement("p", { style: { color: 'red' } }, this.state.emptyError ? this.state.emptyError : errorMessage),
            react_1["default"].createElement("form", { onSubmit: this.submitHandler },
                form,
                react_1["default"].createElement(Button_1.Button, { btnType: "Success" }, "Submit")),
            react_1["default"].createElement(Button_1.Button, { clicked: this.switchAuthModeHandler, btnType: "Danger" },
                "Swith to ",
                this.state.isSignup ? 'SIGNIN' : 'SIGNUP')));
    };
    return Auth;
}(react_1.Component));
var mapStateToProps = function (_a) {
    var burgerBuilder = _a.burgerBuilder, auth = _a.auth;
    return {
        loadingAuth: auth.loadingAuth,
        errorAuth: auth.errorAuth,
        isAuthenticated: auth.token !== '',
        building: burgerBuilder.building,
        authRedirectPath: auth.authRedirectPath
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onAuth: function (email, password, isSignup) {
            return dispatch(actions.auth(email, password, isSignup));
        },
        onSetAuthRedirectPath: function () { return dispatch(actions.setAuthRedirect('/')); }
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Auth);
