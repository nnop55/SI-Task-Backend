"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("./product.controller"));
const controllerWrapper_middleware_1 = require("../../middlewares/controllerWrapper.middleware");
const token_middleware_1 = require("../../middlewares/token.middleware");
const productRouter = express_1.default.Router();
productRouter.use(token_middleware_1.verifyToken);
productRouter.post("/", (0, controllerWrapper_middleware_1.wrapAsync)(product_controller_1.default.getProducts));
productRouter.post("/add", (0, controllerWrapper_middleware_1.wrapAsync)(product_controller_1.default.createProduct));
productRouter.get("/:productId", (0, controllerWrapper_middleware_1.wrapAsync)(product_controller_1.default.getOneProduct));
productRouter.put("/update/:productId", (0, controllerWrapper_middleware_1.wrapAsync)(product_controller_1.default.editProduct));
productRouter.delete("/delete/:productId", (0, controllerWrapper_middleware_1.wrapAsync)(product_controller_1.default.removeProduct));
productRouter.post("/sale", (0, controllerWrapper_middleware_1.wrapAsync)(product_controller_1.default.saleProduct));
exports.default = productRouter;
