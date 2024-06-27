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
exports.getSaledProducts = exports.addOrUpdateSaledProduct = exports.updateManagerTotalCount = exports.getManagerById = exports.getManagers = void 0;
const notFoundError_1 = __importDefault(require("../../utils/errors/notFoundError"));
const pagination_1 = require("../../utils/pagination");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const saled_product_model_1 = __importDefault(require("./saled-product.model"));
const getManagers = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, surname, createdAtFrom, createdAtTo, totalOfSalesFrom, totalOfSalesTo, pageSize, pageIndex } = filters;
    const params = {
        pageSize,
        pageIndex
    };
    const query = {};
    if (username) {
        query.username = { contains: username };
    }
    if (name) {
        query.name = { contains: name };
    }
    if (surname) {
        query.surname = { contains: surname };
    }
    if (createdAtFrom && createdAtTo) {
        query.createdAt = { range: { from: new Date(createdAtFrom), to: new Date(createdAtTo) } };
    }
    else if (createdAtFrom) {
        query.createdAt = { from: new Date(createdAtFrom) };
    }
    else if (createdAtTo) {
        query.createdAt = { to: new Date(createdAtTo) };
    }
    if (totalOfSalesFrom && totalOfSalesTo) {
        query.totalOfSales = { range: { from: parseFloat(totalOfSalesFrom), to: parseFloat(totalOfSalesTo) } };
    }
    else if (totalOfSalesFrom) {
        query.totalOfSales = { from: parseFloat(totalOfSalesFrom) };
    }
    else if (totalOfSalesTo) {
        query.totalOfSales = { to: parseFloat(totalOfSalesTo) };
    }
    const paginatedData = yield (0, pagination_1.paginate)(auth_model_1.default, params, query);
    return paginatedData;
});
exports.getManagers = getManagers;
const getManagerById = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = yield auth_model_1.default.findById(managerId);
    if (!manager) {
        throw new notFoundError_1.default('Manager not found');
    }
    return manager;
});
exports.getManagerById = getManagerById;
const updateManagerTotalCount = (managerId, quantity, price) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = yield (0, exports.getManagerById)(managerId);
    const saled = quantity * price;
    manager.totalOfSales += saled;
    yield manager.save();
    return manager;
});
exports.updateManagerTotalCount = updateManagerTotalCount;
const addOrUpdateSaledProduct = (userId, quantity, title, price, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield getSaledProductById(userId, productId);
    if (exist) {
        exist.saledProductCount += quantity;
        yield exist.save();
        return exist;
    }
    const payload = {
        userId,
        title,
        price,
        saledProductCount: quantity,
        productId
    };
    const newProduct = new saled_product_model_1.default(payload);
    yield newProduct.save();
    return newProduct;
});
exports.addOrUpdateSaledProduct = addOrUpdateSaledProduct;
const getSaledProducts = (userId, title) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (title) {
        query['title'] = { $regex: title, $options: 'i' };
    }
    if (userId) {
        query['userId'] = userId;
    }
    const saledProducts = yield saled_product_model_1.default.find(query);
    return saledProducts !== null && saledProducts !== void 0 ? saledProducts : null;
});
exports.getSaledProducts = getSaledProducts;
const getSaledProductById = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield saled_product_model_1.default.findOne({ userId, productId });
    return product !== null && product !== void 0 ? product : null;
});
