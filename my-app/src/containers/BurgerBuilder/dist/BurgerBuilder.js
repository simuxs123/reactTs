"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Burger_1 = require("../../components/Burger/Burger");
var BuildControls_1 = require("../../components/Burger/BuildControls/BuildControls");
var Modal_1 = require("../../components/UI/Modal/Modal");
var OrderSummary_1 = require("../../components/Burger/OrderSummary/OrderSummary");
var axios_orders_1 = require("../../axios-orders");
var Spinner_1 = require("../../components/UI/Spinner/Spinner");
var withErrorHandler_1 = require("../../hoc/withErrorHandler/withErrorHandler");
var react_redux_1 = require("react-redux");
var actions = require("../../store/actions");
var BurgerBuilder = function (props) {
    var _a = react_1.useState(false), purchasing = _a[0], setPurchasing = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var ingridients = react_redux_1.useSelector(function (_a) {
        var burgerBuilder = _a.burgerBuilder;
        return burgerBuilder.ingridients;
    });
    var totalPrice = react_redux_1.useSelector(function (_a) {
        var burgerBuilder = _a.burgerBuilder;
        return burgerBuilder.totalPrice;
    });
    var error = react_redux_1.useSelector(function (_a) {
        var burgerBuilder = _a.burgerBuilder;
        return burgerBuilder.error;
    });
    var isAuthenticated = react_redux_1.useSelector(function (_a) {
        var auth = _a.auth;
        return auth.token !== '';
    });
    var onIngridientAdded = function (ingName) {
        return dispatch(actions.addIngridients(ingName));
    };
    var onIngridientRemoved = function (ingName) {
        return dispatch(actions.removeIngridients(ingName));
    };
    var onInitIngridients = react_1.useCallback(function () { return dispatch(actions.initIngridients()); }, []);
    var onInitPurchase = function () { return dispatch(actions.purchaseInit()); };
    var onSetAuthRedirect = function (path) {
        return dispatch(actions.setAuthRedirect(path));
    };
    react_1.useEffect(function () {
        onInitIngridients();
    }, [onInitIngridients]);
    var updatePurchaseState = function (ingridients) {
        var sum = Object.entries(ingridients)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return value;
        })
            .reduce(function (sum, el) {
            return sum + el;
        }, 0);
        return sum > 0;
    };
    var purchaseHandler = function () {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    };
    var purchaseCancelHandler = function () {
        setPurchasing(false);
    };
    var purchaseContinueHandler = function () {
        onInitPurchase();
        props.history.push('/checkout');
    };
    var disabledInfo = {};
    for (var key in ingridients) {
        disabledInfo[key] = ingridients[key] <= 0;
    }
    var orderSummary = null;
    var burger = error ? (react_1["default"].createElement("p", null, "Ingridients cant be loaded")) : (react_1["default"].createElement(Spinner_1.Spinner, null));
    if (Object.keys(ingridients).length !== 0) {
        burger = (react_1["default"].createElement(react_1.Fragment, null,
            react_1["default"].createElement(Burger_1.Burger, { ingridients: ingridients }),
            react_1["default"].createElement(BuildControls_1.BuildControls, { ingridientAdded: onIngridientAdded, ingridientRemove: onIngridientRemoved, disable: disabledInfo, totalPrice: totalPrice, purchasable: updatePurchaseState(ingridients), ordered: purchaseHandler, isAuth: isAuthenticated })));
        orderSummary = (react_1["default"].createElement(OrderSummary_1.OrderSummary, { ingridients: ingridients, moduleClose: purchaseCancelHandler, continuePurchase: purchaseContinueHandler, totalPrice: totalPrice }));
    }
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(Modal_1.Modal, { show: purchasing, moduleClose: purchaseCancelHandler }, orderSummary),
        burger));
};
exports["default"] = withErrorHandler_1.withErrorHandler(BurgerBuilder, axios_orders_1.instance);
