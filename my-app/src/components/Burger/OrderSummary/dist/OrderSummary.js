"use strict";
exports.__esModule = true;
exports.OrderSummary = void 0;
var react_1 = require("react");
var Button_1 = require("../../UI/Button/Button");
exports.OrderSummary = function (props) {
    var ingridientSummary = Object.keys(props.ingridients).map(function (igKey, i) {
        return (react_1["default"].createElement("li", { key: igKey + i },
            react_1["default"].createElement("span", { style: { textTransform: 'capitalize' } }, igKey),
            ":",
            ' ',
            props.ingridients[igKey]));
    });
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement("h3", null, "Your Order"),
        react_1["default"].createElement("p", null, "A delicious burger with the following ingridients:"),
        react_1["default"].createElement("ul", null, ingridientSummary),
        react_1["default"].createElement("p", null,
            "Total Price: ",
            react_1["default"].createElement("strong", null,
                props.totalPrice.toFixed(2),
                "$")),
        react_1["default"].createElement("p", null, "Continue to checkout?"),
        react_1["default"].createElement(Button_1.Button, { clicked: props.moduleClose, btnType: 'Danger' }, "CANCEL"),
        react_1["default"].createElement(Button_1.Button, { clicked: props.continuePurchase, btnType: 'Success' }, "CONTINUE")));
};
