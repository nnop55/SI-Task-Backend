"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = void 0;
const config_1 = require("../shared/config");
const auth_1 = require("../utils/auth");
const auth_service_1 = require("../modules/auth/auth.service");
const unauthorizedError_1 = __importDefault(require("../utils/errors/unauthorizedError"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return next(new unauthorizedError_1.default());
    }
    try {
        const decoded = (0, auth_1.verifyJwt)(token, config_1.JWTSecretKey);
        const instance = yield (0, auth_service_1.getUserByColumn)('_id', decoded.id);
        if (!decoded || !instance) {
            throw new unauthorizedError_1.default();
        }
        req.user = instance;
        return next();
    }
    catch (err) {
        //await updateUserAccessToken('accessToken', token, 'accessToken', null)
        next(new unauthorizedError_1.default('Invalid Token'));
    }
});
exports.verifyToken = verifyToken;
const verifyRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return next(new unauthorizedError_1.default());
    }
    try {
        const decoded = (0, auth_1.verifyJwt)(refreshToken, config_1.JWTRefreshTokenSecretKey);
        const instance = yield (0, auth_service_1.getUserByColumn)('_id', decoded.id);
        if (!decoded || !instance) {
            throw new unauthorizedError_1.default();
        }
        req.user = instance;
        return next();
    }
    catch (err) {
        //await updateUserAccessToken('refreshToken', refreshToken, 'refreshToken', null)
        next(new unauthorizedError_1.default('Invalid Token'));
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
