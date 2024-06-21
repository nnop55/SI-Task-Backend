import express from "express";
import ProductController from "./product.controller";
import { wrapAsync } from "../../middlewares/controllerWrapper.middleware";
import { verifyToken } from "../../middlewares/token.middleware";


const productRouter = express.Router();

productRouter.use(verifyToken)

productRouter.post(
    "/",
    wrapAsync(ProductController.getProducts)
);

productRouter.post(
    "/add",
    wrapAsync(ProductController.createProduct)
);

productRouter.get(
    "/:productId",
    wrapAsync(ProductController.getOneProduct)
);

productRouter.put(
    "/update/:productId",
    wrapAsync(ProductController.editProduct)
);

productRouter.delete(
    "/delete/:productId",
    wrapAsync(ProductController.removeProduct)
);

productRouter.post(
    "/sale",
    wrapAsync(ProductController.saleProduct)
);

export default productRouter;
