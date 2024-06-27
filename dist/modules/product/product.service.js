"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleProduct =
  exports.updateProduct =
  exports.deleteProduct =
  exports.createProduct =
  exports.getProductById =
  exports.getProducts =
    void 0;
const notFoundError_1 = __importDefault(
  require("../../utils/errors/notFoundError")
);
const validationError_1 = __importDefault(
  require("../../utils/errors/validationError")
);
const pagination_1 = require("../../utils/pagination");
const product_model_1 = __importDefault(require("./product.model"));
const getProducts = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { title, priceFrom, priceTo, productCountFrom, productCountTo } =
      params;
    const filters = {};
    if (title) {
      filters.title = { exact: title };
    }
    if (priceFrom && priceTo) {
      filters.price = {
        range: { from: parseFloat(priceFrom), to: parseFloat(priceTo) },
      };
    } else if (priceFrom) {
      filters.price = { from: parseFloat(priceFrom) };
    } else if (priceTo) {
      filters.price = { to: parseFloat(priceTo) };
    }
    if (productCountFrom && productCountTo) {
      filters.productCount = {
        range: {
          from: parseFloat(productCountFrom),
          to: parseFloat(productCountTo),
        },
      };
    } else if (productCountFrom) {
      filters.productCount = { from: parseFloat(productCountFrom) };
    } else if (productCountTo) {
      filters.productCount = { to: parseFloat(productCountTo) };
    }
    const paginatedData = yield (0, pagination_1.paginate)(
      product_model_1.default,
      params,
      filters
    );
    return paginatedData;
  });
exports.getProducts = getProducts;
const getProductById = (productId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
      throw new notFoundError_1.default("product_not_found");
    }
    return product;
  });
exports.getProductById = getProductById;
const createProduct = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_model_1.default(payload);
    yield newProduct.save();
    return newProduct;
  });
exports.createProduct = createProduct;
const deleteProduct = (productId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.getProductById)(productId);
    yield product.deleteOne();
    return product;
  });
exports.deleteProduct = deleteProduct;
const updateProduct = (payload, productId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.getProductById)(productId);
    Object.assign(product, payload);
    yield product.save();
    return product;
  });
exports.updateProduct = updateProduct;
const saleProduct = (productId, quantity) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.getProductById)(productId);
    if (quantity > product.productCount) {
      throw new validationError_1.default("Invalid input");
    }
    product.productCount -= quantity;
    yield product.save();
    return product;
  });
exports.saleProduct = saleProduct;
