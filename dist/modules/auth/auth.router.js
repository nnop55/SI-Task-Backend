"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const controllerWrapper_middleware_1 = require("../../middlewares/controllerWrapper.middleware");
const inputValidation_middleware_1 = require("../../middlewares/inputValidation.middleware");
const loginUser_dto_1 = require("./dtos/loginUser.dto");
const registerUser_dto_1 = require("./dtos/registerUser.dto");
const token_middleware_1 = require("../../middlewares/token.middleware");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/register', (0, inputValidation_middleware_1.inputValidationMiddleware)(registerUser_dto_1.RegisterUserDto), (0, controllerWrapper_middleware_1.wrapAsync)(auth_controller_1.default.register));
exports.authRouter.post('/login', (0, inputValidation_middleware_1.inputValidationMiddleware)(loginUser_dto_1.LoginUserDto), (0, controllerWrapper_middleware_1.wrapAsync)(auth_controller_1.default.login));
exports.authRouter.post('/refresh-token', token_middleware_1.verifyRefreshToken, (0, controllerWrapper_middleware_1.wrapAsync)(auth_controller_1.default.refreshToken));
exports.authRouter.post('/logout', token_middleware_1.verifyToken, (0, controllerWrapper_middleware_1.wrapAsync)(auth_controller_1.default.logout));
exports.default = exports.authRouter;
