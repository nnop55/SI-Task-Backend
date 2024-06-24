import NotFoundError from "../../utils/errors/notFoundError";
import { paginate } from "../../utils/pagination";
import Product from "./product.model";

export const getProducts = async (
    searchTitle: string,
    params: any
) => {
    // let query = {};

    // if (searchTitle) {
    //     query = { title: { $regex: searchTitle, $options: 'i' } };
    // }

    // const products = await Product.find(query);
    const filters: any = {};
    if (searchTitle) {
        filters.title = { exact: searchTitle };
    }
    const paginatedData = await paginate(Product, params, filters);

    return paginatedData;
}

export const getProductById = async (
    productId: string
) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new NotFoundError('Product not found')
    }
    return product;
}

export const createProduct = async (
    payload: typeof Product
) => {
    const newProduct = new Product(payload);
    await newProduct.save();
    return newProduct;
}

export const deleteProduct = async (
    productId: string
) => {
    const product = await getProductById(productId);
    await product.deleteOne();
    return product;
}

export const updateProduct = async (
    payload: typeof Product,
    productId: string
) => {
    const product = await getProductById(productId);
    Object.assign(product, payload);
    await product.save();
    return product;
}

export const saleProduct = async (
    productId: string,
    quantity: number
) => {
    const product = await getProductById(productId);
    product.productCount -= quantity;
    await product.save();
    return product;
}
