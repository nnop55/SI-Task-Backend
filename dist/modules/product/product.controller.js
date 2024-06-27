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
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("./product.service");
const manager_service_1 = require("../manager/manager.service");
class ProductController {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, product_service_1.getProducts)(req.body);
            res.status(200).json({ code: 1, data });
        });
    }
    getOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const product = yield (0, product_service_1.getProductById)(productId);
            res.status(200).json({ code: 1, data: product });
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield (0, product_service_1.createProduct)(req.body);
            res.status(201).json({ code: 1, data: newProduct });
        });
    }
    editProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const product = yield (0, product_service_1.updateProduct)(req.body, productId);
            res.status(202).json({ code: 1, data: product });
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const deletedProduct = yield (0, product_service_1.deleteProduct)(productId);
            res.status(200).json({ code: 1, data: deletedProduct });
        });
    }
    saleProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity, productId } = req.body;
            const saledProduct = yield (0, product_service_1.saleProduct)(productId, quantity);
            const managerId = req.user['_id'];
            yield (0, manager_service_1.updateManagerTotalCount)(managerId, quantity, saledProduct.price);
            yield (0, manager_service_1.addOrUpdateSaledProduct)(managerId, quantity, saledProduct.title, saledProduct.price, productId);
            res.status(200).json({ code: 1, data: saledProduct });
        });
    }
}
exports.default = new ProductController();
