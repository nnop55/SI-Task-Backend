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
exports.paginate = void 0;
const paginate = (model_1, params_1, ...args_1) => __awaiter(void 0, [model_1, params_1, ...args_1], void 0, function* (model, params, filters = {}) {
    const query = {};
    for (const [key, value] of Object.entries(filters)) {
        const val = value;
        if (val.exact) {
            query[key] = val.exact;
        }
        if (val.contains) {
            query[key] = { $regex: val.contains, $options: 'i' };
        }
        if (val.range) {
            query[key] = { $gte: val.range.from, $lte: val.range.to };
        }
        if (val.from) {
            query[key] = { $gte: val.from };
        }
        if (val.to) {
            query[key] = { $lte: val.to };
        }
    }
    const totalCount = yield model.countDocuments(query);
    const pageSize = parseInt(params.pageSize) || 10;
    const pageIndex = parseInt(params.pageIndex) || 0;
    const pageCount = Math.ceil(totalCount / pageSize);
    const results = yield model.find(query)
        .skip(pageIndex * pageSize)
        .limit(pageSize);
    return {
        totalCount,
        pageCount,
        pageSize,
        pageIndex,
        results
    };
});
exports.paginate = paginate;
