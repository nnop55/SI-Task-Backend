"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class NotFoundError extends customError_1.default {
    constructor(message = "Not Found") {
        super(404, message);
    }
}
exports.default = NotFoundError;
