"use strict";
exports.__esModule = true;
exports.mapStateToProps = void 0;
var react_1 = require("react");
var CheckoutSummary_1 = require("../../components/Order/CheckoutSummary/CheckoutSummary");
var react_router_dom_1 = require("react-router-dom");
var ContactData_1 = require("../Checkout/ContactData/ContactData");
var react_redux_1 = require("react-redux");
var Checkout = function (props) {
    var checkoutCancelledHandler = function () {
        props.history.goBack();
    };
    var checkoutContinuedHandler = function () {
        props.history.replace('/checkout/contact-data');
    };
    var summary = react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" });
    if (Object.keys(props.ingridients).length !== 0) {
        var purchasedRedirect = props.purchased ? react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" }) : null;
        summary = (react_1["default"].createElement("div", null,
            purchasedRedirect,
            react_1["default"].createElement(CheckoutSummary_1.CheckoutSummary, { checkoutCancelled: checkoutCancelledHandler, checkoutContinued: checkoutContinuedHandler, ingridients: props.ingridients }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: props.match.path + '/contact-data', component: ContactData_1["default"] })));
    }
    return summary;
};
exports.mapStateToProps = function (_a) {
    var burgerBuilder = _a.burgerBuilder, order = _a.order;
    return {
        ingridients: burgerBuilder.ingridients,
        purchased: order.purchased
    };
};
exports["default"] = react_redux_1.connect(exports.mapStateToProps)(Checkout);
