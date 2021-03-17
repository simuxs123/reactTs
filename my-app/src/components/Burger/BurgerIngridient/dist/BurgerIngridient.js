"use strict";
exports.__esModule = true;
exports.BurgerIngridient = void 0;
var react_1 = require("react");
var BurgerIngridient_module_scss_1 = require("./BurgerIngridient.module.scss");
exports.BurgerIngridient = function (props) {
    var ingridients = null;
    switch (props.type) {
        case 'bread-bottom':
            ingridients = react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].BreadBottom });
            break;
        case 'bread-top':
            ingridients = (react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].BreadTop },
                react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].Seeds1 }),
                react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].Seeds2 })));
            break;
        case 'meat':
            ingridients = react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].Meat });
            break;
        case 'cheese':
            ingridients = react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].Cheese });
            break;
        case 'salad':
            ingridients = react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].Salad });
            break;
        case 'bacon':
            ingridients = react_1["default"].createElement("div", { className: BurgerIngridient_module_scss_1["default"].Bacon });
            break;
        default:
            ingridients = null;
    }
    return ingridients;
};
