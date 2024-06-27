import { Request, Response } from 'express';
import { createProduct, deleteProduct, getProducts, getProductById, updateProduct, saleProduct } from './product.service';
import { updateManagerTotalCount, addOrUpdateSaledProduct } from '../manager/manager.service';

class ProductController {
    public async getProducts(req: Request, res: Response) {
        const data = await getProducts(req.body);
        res.status(200).json({ code: 1, data })
    }

    public async getOneProduct(req: Request, res: Response) {
        const productId = req.params.productId;
        const product = await getProductById(productId);
        res.status(200).json({ code: 1, data: product })
    }

    public async createProduct(req: Request, res: Response) {
        const newProduct = await createProduct(req.body)
        res.status(201).json({ code: 1, data: newProduct })
    }

    public async editProduct(req: Request, res: Response) {
        const productId = req.params.productId;
        const product = await updateProduct(req.body, productId);
        res.status(202).json({ code: 1, data: product })
    }

    public async removeProduct(req: Request, res: Response) {
        const productId = req.params.productId;
        const deletedProduct = await deleteProduct(productId)
        res.status(200).json({ code: 1, data: deletedProduct })
    }

    public async saleProduct(req: Request, res: Response) {
        const { quantity, productId } = req.body
        const saledProduct = await saleProduct(productId, quantity)
        const managerId = (req as any).user['_id'];
        await updateManagerTotalCount(managerId, quantity, saledProduct.price);

        await addOrUpdateSaledProduct(
            managerId,
            quantity,
            saledProduct.title,
            saledProduct.price,
            productId
        )

        res.status(200).json({ code: 1, data: saledProduct })
    }
}

export default new ProductController()