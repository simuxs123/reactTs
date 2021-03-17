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
exports.mapStateToProps = void 0;
var react_1 = require("react");
var Button_1 = require("../../../components/UI/Button/Button");
var Input_1 = require("../../../components/UI/Input/Input");
var ContactData_module_scss_1 = require("./ContactData.module.scss");
var Spinner_1 = require("../../../components/UI/Spinner/Spinner");
var react_redux_1 = require("react-redux");
var actions = require("../../../store/actions");
var utility_1 = require("../../../shared/utility");
var ContactData = function (props) {
    var _a = react_1.useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your ZIP code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '', displayValue: 'Delivery' },
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'slowest', displayValue: 'Slowest' },
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    }), orderForm = _a[0], setOrderForm = _a[1];
    var _b = react_1.useState(false), formIsValid = _b[0], setFormIsValid = _b[1];
    var orderHandler = function (event) {
        event.preventDefault();
        var formData = {};
        for (var _i = 0, _a = Object.entries(orderForm); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            formData[key] = value.value;
        }
        var order = {
            ingridients: props.ingridients,
            price: +props.totalPrice.toFixed(2),
            orderData: formData,
            userId: props.userId
        };
        props.onpPurchaseBurgerStart(order, props.token);
    };
    var changeHandler = function (event, inputIndetifier) {
        var updatedFormOrder = __assign({}, orderForm);
        var updatedFormElement = __assign({}, updatedFormOrder[inputIndetifier]);
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = utility_1.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFormOrder[inputIndetifier] = updatedFormElement;
        var formIsValid = true;
        for (var _i = 0, _a = Object.entries(updatedFormOrder); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            formIsValid = value.valid && formIsValid;
        }
        setOrderForm(updatedFormOrder);
        setFormIsValid(formIsValid);
    };
    var formElementsArray = [];
    for (var _i = 0, _c = Object.entries(orderForm); _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        formElementsArray.push({
            id: key,
            config: value
        });
    }
    var form = (react_1["default"].createElement("form", { onSubmit: orderHandler },
        formElementsArray.map(function (_a) {
            var id = _a.id, config = _a.config;
            return (react_1["default"].createElement(Input_1.Input, { key: id, elementType: config.elementType, value: config.value, elementConfig: config.elementConfig, changed: function (event) { return changeHandler(event, id); }, invalid: !config.valid, touched: config.touched }));
        }),
        react_1["default"].createElement(Button_1.Button, { btnType: "Success", disabled: !formIsValid }, "Order")));
    if (props.loading) {
        form = react_1["default"].createElement(Spinner_1.Spinner, null);
    }
    return (react_1["default"].createElement("div", { className: ContactData_module_scss_1["default"].ContactData },
        react_1["default"].createElement("h4", null, "Enter your contact data"),
        form));
};
exports.mapStateToProps = function (_a) {
    var burgerBuilder = _a.burgerBuilder, order = _a.order, auth = _a.auth;
    return {
        ingridients: burgerBuilder.ingridients,
        totalPrice: burgerBuilder.totalPrice,
        loading: order.loading,
        token: auth.token,
        userId: auth.userId
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onpPurchaseBurgerStart: function (orderData, token) {
            return dispatch(actions.purchaseBurgerStart(orderData, token));
        }
    };
};
exports["default"] = react_redux_1.connect(exports.mapStateToProps, mapDispatchToProps)(ContactData);
