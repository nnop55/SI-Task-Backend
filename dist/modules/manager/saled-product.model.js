"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SaledProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    saledProductCount: {
        type: Number,
        required: true,
    },
    saledAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product'
    }
});
exports.default = mongoose_1.default.model("SaledProduct", SaledProductSchema);
