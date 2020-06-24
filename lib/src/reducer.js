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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartReducer = exports.initialState = void 0;
// https://github.com/lodash/lodash/issues/3542
var omit = require("lodash.omit");
var actionTypes_1 = require("./actionTypes");
exports.initialState = {
    addedIds: [],
    quantityById: {},
};
var addedIds = function (state, action) {
    if (state === void 0) { state = exports.initialState.addedIds; }
    var id = action.payload.id;
    switch (action.type) {
        case actionTypes_1.ADD_TO_CART:
            if (state.indexOf(id) !== -1) {
                return state;
            }
            return __spreadArrays(state, [id]);
        case actionTypes_1.REMOVE_FROM_CART:
            return __spreadArrays(state).filter(function (item) { return item !== id; });
        default:
            return state;
    }
};
var quantityById = function (state, action) {
    var _a;
    if (state === void 0) { state = exports.initialState.quantityById; }
    var _b = action.payload, id = _b.id, isUnique = _b.isUnique;
    var handleQuantity = function (add) {
        var _a;
        if (add === void 0) { add = true; }
        var amount = add ? +1 : -1;
        return __assign(__assign({}, state), (_a = {}, _a[id] = (state[id] || 0) + amount, _a));
    };
    switch (action.type) {
        case actionTypes_1.ADD_TO_CART:
            if (isUnique === true) {
                return __assign(__assign({}, state), (_a = {}, _a[id] = 1, _a));
            }
            return handleQuantity();
        case actionTypes_1.REMOVE_FROM_CART:
            return omit(state, id);
        case actionTypes_1.INCREASE_QUANTITY:
            return handleQuantity();
        case actionTypes_1.DECREASE_QUANTITY:
            return handleQuantity(false);
        default:
            return state;
    }
};
exports.cartReducer = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case actionTypes_1.ADD_TO_CART:
        case actionTypes_1.REMOVE_FROM_CART:
        case actionTypes_1.INCREASE_QUANTITY:
        case actionTypes_1.DECREASE_QUANTITY:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action),
            };
        default:
            return state;
    }
};
