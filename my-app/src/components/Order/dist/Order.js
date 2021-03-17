"use strict";
exports.__esModule = true;
exports.Order = void 0;
var react_1 = require("react");
var Order_module_scss_1 = require("./Order.module.scss");
exports.Order = function (props) {
    var ingridients = [];
    for (var ingridient in props.ingridients) {
        ingridients.push({
            name: ingridient,
            amount: props.ingridients[ingridient]
        });
    }
    var ingridientsOutput = ingridients.map(function (ig) {
        return (react_1["default"].createElement("span", { style: {
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }, key: ig.name },
            ig.name,
            "(",
            ig.amount,
            ")"));
    });
    return (react_1["default"].createElement("div", { className: Order_module_scss_1["default"].Order },
        react_1["default"].createElement("p", null,
            "Ingridients:",
            ingridientsOutput),
        react_1["default"].createElement("p", null,
            "Price: ",
            react_1["default"].createElement("strong", null,
                "USD ",
                props.totalPrice))));
};
