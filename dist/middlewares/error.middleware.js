"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = __importDefault(require("../utils/errors/customError"));
const errorHandler = (err, req, res, next) => {
    console.error(err);
    let status = 500;
    let message = 'Internal Server Error';
    if (err instanceof SyntaxError &&
        err.status === 400 &&
        'body' in err) {
        status = 400;
        message = 'Bad Request';
    }
    else if (err instanceof customError_1.default) {
        status = err.status;
        message = err.message;
    }
    else if (err.code === 11000) {
        status = 400;
        message = 'manager_exist';
    }
    res.status(status).json({
        error: message
    });
};
exports.errorHandler = errorHandler;
