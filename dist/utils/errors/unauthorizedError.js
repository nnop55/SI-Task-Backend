"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class UnauthorizedError extends customError_1.default {
    constructor(message = "Unauthorized: Access token is missing") {
        super(401, message);
    }
}
exports.default = UnauthorizedError;
