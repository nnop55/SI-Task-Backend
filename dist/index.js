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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const access_middleware_1 = require("./middlewares/access.middleware");
const notFoundError_1 = __importDefault(require("./utils/errors/notFoundError"));
const error_middleware_1 = require("./middlewares/error.middleware");
const database_1 = require("./shared/database");
const product_router_1 = __importDefault(require("./modules/product/product.router"));
const manager_router_1 = __importDefault(require("./modules/manager/manager.router"));
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const config_1 = require("./shared/config");
const app = (0, express_1.default)();
setupMiddleware();
setupRoutes();
setupErrorHandling();
const PORT = process.env.PORT || 3000;
startServer(PORT);
function setupMiddleware() {
    app.use(access_middleware_1.restrictAccess);
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)({
        origin: [config_1.accessUrl],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express_1.default.json());
}
function setupRoutes() {
    app.use('/api/auth', auth_router_1.default);
    app.use('/api/product', product_router_1.default);
    app.use('/api/manager', manager_router_1.default);
}
function setupErrorHandling() {
    app.all("*", (req, res) => {
        throw new notFoundError_1.default();
    });
    app.use(error_middleware_1.errorHandler);
}
function startServer(port) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.connectDb)().then(() => {
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        });
    });
}
