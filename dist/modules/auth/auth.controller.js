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
const auth_1 = require("../../utils/auth");
const auth_service_1 = require("./auth.service");
const config_1 = require("../../shared/config");
const validationError_1 = __importDefault(require("../../utils/errors/validationError"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield (0, auth_service_1.getUserByColumn)('username', username);
            const isMatch = (0, auth_1.comparePasswords)(password, user.password);
            if (!isMatch) {
                throw new validationError_1.default('invalid_password');
            }
            const accessToken = (0, auth_1.getJwt)({ id: user.id, username: user.username }, config_1.JWTSecretKey);
            const refreshToken = (0, auth_1.getJwt)({ id: user.id, username: user.username }, config_1.JWTRefreshTokenSecretKey, '3d');
            yield (0, auth_service_1.updateUserAccessToken)('username', username, 'accessToken', accessToken);
            yield (0, auth_service_1.updateUserAccessToken)('username', username, 'refreshToken', refreshToken);
            res.status(200).json({ code: 1, data: { accessToken, refreshToken } });
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username } = req.user;
            const accessToken = (0, auth_1.getJwt)({ id, username }, config_1.JWTSecretKey);
            yield (0, auth_service_1.updateUserAccessToken)('_id', id, 'accessToken', accessToken);
            res.status(200).json({ code: 1, data: { accessToken } });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield (0, auth_service_1.insertUser)(req.body);
            res.status(201).json({ code: 1, data: newUser });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            yield (0, auth_service_1.updateUserAccessToken)('_id', id, 'accessToken', null);
            yield (0, auth_service_1.updateUserAccessToken)('_id', id, 'refreshToken', null);
            res.send({ code: 1, data: null });
        });
    }
}
exports.default = new AuthController();
