import Product from "../modules/product/product.model";
import User from "../modules/auth/auth.model";
import { faker } from "@faker-js/faker";
import { closeConnection, connectDb } from "../shared/database";


connectDb().then(async () => {
    //100 random products
    const products: any[] = [];
    for (let i = 0; i < 100; i++) {

        const product = new Product({
            title: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            productCount: faker.datatype.number({ min: 1, max: 100 })
        });

        products.push(product);
    }

    //10 random users
    const users: any[] = [];
    for (let i = 0; i < 10; i++) {
        const user = new User({
            username: faker.internet.userName(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: faker.internet.password(),
            createdAt: faker.date.past(),
            totalOfSales: faker.datatype.number({ min: 0, max: 1000 }),
            accessToken: faker.datatype.uuid(),
            refreshToken: faker.datatype.uuid(),
        });
        users.push(user);
    }


    try {
        await Product.insertMany(products);
        await User.insertMany(users);
        console.log('Random documents have been inserted into the database.');
    } catch (error) {
        console.error('Error inserting documents:', error);
    } finally {
        closeConnection()
        process.exit(0)
    }
})


