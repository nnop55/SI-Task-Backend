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
exports.ManagerController = void 0;
const manager_service_1 = require("./manager.service");
class ManagerController {
    getManagers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, manager_service_1.getManagers)(req.body);
            res.status(200).json({ code: 1, data });
        });
    }
    getSaledProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const userId = req.user['_id'];
            const data = yield (0, manager_service_1.getSaledProducts)(userId, title);
            res.status(200).json({ code: 1, data });
        });
    }
}
exports.ManagerController = ManagerController;
exports.default = new ManagerController();
