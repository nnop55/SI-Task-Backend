"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.getJwt = exports.hashPassword = exports.comparePasswords = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const comparePasswords = (password, hashedPassword) => {
    return bcrypt_1.default.compareSync(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
const hashPassword = (password) => {
    return bcrypt_1.default.hashSync(password, 10);
};
exports.hashPassword = hashPassword;
const getJwt = (payload, secretKey, time = '3h') => {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: time });
};
exports.getJwt = getJwt;
const verifyJwt = (token, secretKey) => {
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.verifyJwt = verifyJwt;
