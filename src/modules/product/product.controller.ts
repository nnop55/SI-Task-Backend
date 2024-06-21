import { Request, Response } from 'express';
import { createProduct, deleteProduct, getProducts, getProductById, updateProduct, saleProduct } from './product.service';

class ProductController {
    public async getProducts(req: Request, res: Response) {
        const { searchTitle } = req.body;
        const data = await getProducts(searchTitle ?? null);
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
        const productId = req.params.productId;
        const saledProduct = await saleProduct(productId)
        res.status(200).json({ code: 1, data: saledProduct })
    }
}

export default new ProductController()