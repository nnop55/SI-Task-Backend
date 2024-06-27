"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictAccess = restrictAccess;
const config_1 = require("../shared/config");
const customError_1 = __importDefault(require("../utils/errors/customError"));
function restrictAccess(req, res, next) {
    const isDevMode = process.env.NODE_ENV === 'development';
    const isPostmanRequest = req.header('user-agent') && req.header('user-agent').includes('Postman');
    const isLocalhostRequest = req.headers.origin && req.headers.origin.includes('http://localhost:');
    const isWebsiteRequest = req.headers.origin && req.headers.origin === config_1.accessUrl;
    if (isDevMode && (isPostmanRequest || isLocalhostRequest)) {
        return next();
    }
    if (!isDevMode && isWebsiteRequest) {
        return next();
    }
    throw new customError_1.default(403, 'Forbidden');
}
