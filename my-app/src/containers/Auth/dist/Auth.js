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
var react_1 = require("react");
var Input_1 = require("../../components/UI/Input/Input");
var Button_1 = require("../../components/UI/Button/Button");
var Spinner_1 = require("../../components/UI/Spinner/Spinner");
var react_router_dom_1 = require("react-router-dom");
var Auth_module_scss_1 = require("./Auth.module.scss");
var actions = require("../../store/actions/index");
var react_redux_1 = require("react-redux");
var utility_1 = require("../../shared/utility");
var Auth = function (props) {
    var _a = react_1.useState(''), emptyError = _a[0], setEmptyError = _a[1];
    var _b = react_1.useState(true), isSignup = _b[0], setisSignup = _b[1];
    var _c = react_1.useState({
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
    }), control = _c[0], setControl = _c[1];
    var building = props.building, authRedirectPath = props.authRedirectPath, onSetAuthRedirectPath = props.onSetAuthRedirectPath;
    react_1.useEffect(function () {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [building, authRedirectPath, onSetAuthRedirectPath]);
    var inputChangedHandler = function (event, controlName) {
        var _a;
        var updatedControls = __assign(__assign({}, control), (_a = {}, _a[controlName] = __assign(__assign({}, control[controlName]), { value: event.target.value, valid: utility_1.checkValidity(event.target.value, control[controlName].validation), touched: true }), _a));
        setControl(updatedControls);
    };
    var submitHandler = function (event) {
        event.preventDefault();
        setEmptyError('Please fill all inputs');
        if (control.email.value && control.password.value) {
            props.onAuth(control.email.value, control.password.value, isSignup);
            control.email.value = '';
            control.password.value = '';
            setEmptyError('');
        }
    };
    var switchAuthModeHandler = function () {
        setisSignup(!isSignup);
    };
    var formElementsArray = [];
    for (var _i = 0, _d = Object.entries(control); _i < _d.length; _i++) {
        var _e = _d[_i], key = _e[0], value = _e[1];
        formElementsArray.push({
            id: key,
            config: value
        });
    }
    var form = formElementsArray.map(function (_a) {
        var id = _a.id, config = _a.config;
        return (react_1["default"].createElement(Input_1.Input, { key: id, elementType: config.elementType, value: config.value, elementConfig: config.elementConfig, changed: function (event) { return inputChangedHandler(event, id); }, invalid: !config.valid, touched: config.touched, error: config.error }));
    });
    if (props.loadingAuth) {
        form = react_1["default"].createElement(Spinner_1.Spinner, null);
    }
    var errorMessage = '';
    if (props.errorAuth) {
        errorMessage = props.errorAuth;
    }
    var authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = react_1["default"].createElement(react_router_dom_1.Redirect, { to: props.authRedirectPath });
    }
    return (react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].Auth },
        authRedirect,
        isSignup ? react_1["default"].createElement("h1", null, "SIGN UP") : react_1["default"].createElement("h1", null, "SIGN IN"),
        react_1["default"].createElement("p", { style: { color: 'red' } }, emptyError ? emptyError : errorMessage),
        react_1["default"].createElement("form", { onSubmit: submitHandler },
            form,
            react_1["default"].createElement(Button_1.Button, { btnType: "Success" }, "Submit")),
        react_1["default"].createElement(Button_1.Button, { clicked: switchAuthModeHandler, btnType: "Danger" },
            "Swith to ",
            isSignup ? 'SIGNIN' : 'SIGNUP')));
};
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
