"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerRouter = void 0;
const express_1 = require("express");
const controllerWrapper_middleware_1 = require("../../middlewares/controllerWrapper.middleware");
const token_middleware_1 = require("../../middlewares/token.middleware");
const manager_controller_1 = __importDefault(require("./manager.controller"));
exports.managerRouter = (0, express_1.Router)();
exports.managerRouter.post('/', token_middleware_1.verifyToken, (0, controllerWrapper_middleware_1.wrapAsync)(manager_controller_1.default.getManagers));
exports.managerRouter.post('/saled-products', token_middleware_1.verifyToken, (0, controllerWrapper_middleware_1.wrapAsync)(manager_controller_1.default.getSaledProducts));
exports.default = exports.managerRouter;
