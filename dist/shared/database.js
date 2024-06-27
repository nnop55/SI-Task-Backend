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
exports.closeConnection = exports.connectDb = void 0;
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const uri = `mongodb+srv://${config_1.dbParams.user}:${config_1.dbParams.password}@si-db.4o106tz.mongodb.net/?retryWrites=true&w=majority&appName=SI-DB`;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("MongoDb connection Error:", error);
    }
});
exports.connectDb = connectDb;
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
});
exports.closeConnection = closeConnection;
