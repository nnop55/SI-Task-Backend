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
const product_model_1 = __importDefault(require("../modules/product/product.model"));
const auth_model_1 = __importDefault(require("../modules/auth/auth.model"));
const faker_1 = require("@faker-js/faker");
const database_1 = require("../shared/database");
(0, database_1.connectDb)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    //100 random products
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = new product_model_1.default({
            title: faker_1.faker.commerce.productName(),
            price: parseFloat(faker_1.faker.commerce.price()),
            productCount: faker_1.faker.datatype.number({ min: 1, max: 100 })
        });
        products.push(product);
    }
    //10 random users
    const users = [];
    for (let i = 0; i < 10; i++) {
        const user = new auth_model_1.default({
            username: faker_1.faker.internet.userName(),
            name: faker_1.faker.name.firstName(),
            surname: faker_1.faker.name.lastName(),
            password: faker_1.faker.internet.password(),
            createdAt: faker_1.faker.date.past(),
            totalOfSales: faker_1.faker.datatype.number({ min: 0, max: 1000 }),
            accessToken: faker_1.faker.datatype.uuid(),
            refreshToken: faker_1.faker.datatype.uuid(),
        });
        users.push(user);
    }
    try {
        yield product_model_1.default.insertMany(products);
        yield auth_model_1.default.insertMany(users);
        console.log('Random documents have been inserted into the database.');
    }
    catch (error) {
        console.error('Error inserting documents:', error);
    }
    finally {
        (0, database_1.closeConnection)();
        process.exit(0);
    }
}));
