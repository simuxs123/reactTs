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
exports.__esModule = true;
exports.mapStateToProps = void 0;
var react_1 = require("react");
var Order_1 = require("../../components/Order/Order");
var axios_orders_1 = require("../../axios-orders");
var react_redux_1 = require("react-redux");
var withErrorHandler_1 = require("../../hoc/withErrorHandler/withErrorHandler");
var Spinner_1 = require("../../components/UI/Spinner/Spinner");
var actions = require("../../store/actions");
var Orders = /** @class */ (function (_super) {
    __extends(Orders, _super);
    function Orders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Orders.prototype.componentDidMount = function () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    };
    Orders.prototype.render = function () {
        var order = react_1["default"].createElement(Spinner_1.Spinner, null);
        if (!this.props.loading) {
            order = this.props.orders.map(function (order) { return (react_1["default"].createElement(Order_1.Order, { key: order.id, ingridients: order.ingridients, totalPrice: order.price })); });
        }
        return react_1["default"].createElement("div", null, order);
    };
    return Orders;
}(react_1.Component));
exports.mapStateToProps = function (_a) {
    var order = _a.order, auth = _a.auth;
    return {
        orders: order.orders,
        loading: order.loading,
        token: auth.token,
        userId: auth.userId
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onFetchOrders: function (token, userId) {
            return dispatch(actions.fetchOrdersStart(token, userId));
        }
    };
};
exports["default"] = react_redux_1.connect(exports.mapStateToProps, mapDispatchToProps)(withErrorHandler_1.withErrorHandler(Orders, axios_orders_1.instance));
