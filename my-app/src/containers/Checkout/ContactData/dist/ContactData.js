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
exports.mapStateToProps = void 0;
var react_1 = require("react");
var Button_1 = require("../../../components/UI/Button/Button");
var Input_1 = require("../../../components/UI/Input/Input");
var ContactData_module_scss_1 = require("./ContactData.module.scss");
var Spinner_1 = require("../../../components/UI/Spinner/Spinner");
var react_redux_1 = require("react-redux");
var actions = require("../../../store/actions");
var utility_1 = require("../../../shared/utility");
var ContactData = /** @class */ (function (_super) {
    __extends(ContactData, _super);
    function ContactData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            orderForm: {
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
            },
            formIsValid: false
        };
        _this.orderHandler = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var formData, _i, _a, _b, key, value, order;
            return __generator(this, function (_c) {
                event.preventDefault();
                formData = {};
                for (_i = 0, _a = Object.entries(this.state.orderForm); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    formData[key] = value.value;
                }
                order = {
                    ingridients: this.props.ingridients,
                    price: +this.props.totalPrice.toFixed(2),
                    orderData: formData,
                    userId: this.props.userId
                };
                this.props.onpPurchaseBurgerStart(order, this.props.token);
                return [2 /*return*/];
            });
        }); };
        _this.changeHandler = function (event, inputIndetifier) {
            var updatedFormOrder = __assign({}, _this.state.orderForm);
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
            _this.setState({ orderForm: updatedFormOrder, formIsValid: formIsValid });
        };
        return _this;
    }
    ContactData.prototype.render = function () {
        var _this = this;
        var formElementsArray = [];
        for (var _i = 0, _a = Object.entries(this.state.orderForm); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            formElementsArray.push({
                id: key,
                config: value
            });
        }
        var form = (react_1["default"].createElement("form", { onSubmit: this.orderHandler },
            formElementsArray.map(function (_a) {
                var id = _a.id, config = _a.config;
                return (react_1["default"].createElement(Input_1.Input, { key: id, elementType: config.elementType, value: config.value, elementConfig: config.elementConfig, changed: function (event) { return _this.changeHandler(event, id); }, invalid: !config.valid, touched: config.touched }));
            }),
            react_1["default"].createElement(Button_1.Button, { btnType: "Success", disabled: !this.state.formIsValid }, "Order")));
        if (this.props.loading) {
            form = react_1["default"].createElement(Spinner_1.Spinner, null);
        }
        return (react_1["default"].createElement("div", { className: ContactData_module_scss_1["default"].ContactData },
            react_1["default"].createElement("h4", null, "Enter your contact data"),
            form));
    };
    return ContactData;
}(react_1.Component));
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
