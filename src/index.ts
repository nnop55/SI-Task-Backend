import express, { Express } from 'express'
import cors from 'cors';
import { restrictAccess } from './middlewares/access.middleware';
import NotFoundError from './utils/errors/notFoundError';
import { errorHandler } from './middlewares/error.middleware';
import { connectDb } from './shared/database';

import productRouter from './modules/product/product.router';
import managerRouter from './modules/manager/manager.router';
import authRouter from './modules/auth/auth.router';
import { accessUrl } from './shared/config';

const app: Express = express();

setupMiddleware();
setupRoutes();
setupErrorHandling();

const PORT = process.env.PORT || 3000;
startServer(PORT)

function setupMiddleware() {
    app.use(restrictAccess)
    app.use(cors());
    app.options('*', cors({
        origin: [accessUrl!],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());
}

function setupRoutes() {
    app.use('/api/auth', authRouter)
    app.use('/api/product', productRouter)
    app.use('/api/manager', managerRouter)
}

function setupErrorHandling() {
    app.all("*", (req, res) => {
        throw new NotFoundError()
    });

    app.use(errorHandler);
}

async function startServer(port: number | string) {
    await connectDb().then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
}