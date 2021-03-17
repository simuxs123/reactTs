"use strict";
exports.__esModule = true;
exports.mapStateToProps = void 0;
var react_1 = require("react");
var Order_1 = require("../../components/Order/Order");
var axios_orders_1 = require("../../axios-orders");
var react_redux_1 = require("react-redux");
var withErrorHandler_1 = require("../../hoc/withErrorHandler/withErrorHandler");
var Spinner_1 = require("../../components/UI/Spinner/Spinner");
var actions = require("../../store/actions");
var Orders = function (props) {
    var onFetchOrders = props.onFetchOrders;
    react_1.useEffect(function () {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);
    var order = react_1["default"].createElement(Spinner_1.Spinner, null);
    if (!props.loading) {
        order = props.orders.map(function (order) { return (react_1["default"].createElement(Order_1.Order, { key: order.id, ingridients: order.ingridients, totalPrice: order.price })); });
    }
    return react_1["default"].createElement("div", null, order);
};
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
