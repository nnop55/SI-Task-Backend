import NotFoundError from "../../utils/errors/notFoundError";
import ValidationError from "../../utils/errors/validationError";
import { paginate } from "../../utils/pagination";
import Product from "./product.model";

export const getProducts = async (
    params: any
) => {
    const { title, priceFrom, priceTo, productCountFrom, productCountTo } = params

    const filters: any = {};
    if (title) {
        filters.title = { exact: title };
    }
    if (priceFrom && priceTo) {
        filters.price = { range: { from: parseFloat(priceFrom), to: parseFloat(priceTo) } };
    } else if (priceFrom) {
        filters.price = { from: parseFloat(priceFrom) };
    } else if (priceTo) {
        filters.price = { to: parseFloat(priceTo) };
    }

    if (productCountFrom && productCountTo) {
        filters.productCount = { range: { from: parseFloat(productCountFrom), to: parseFloat(productCountTo) } };
    } else if (productCountFrom) {
        filters.productCount = { from: parseFloat(productCountFrom) };
    } else if (productCountTo) {
        filters.productCount = { to: parseFloat(productCountTo) };
    }

    const paginatedData = await paginate(Product, params, filters);

    return paginatedData;
}

export const getProductById = async (
    productId: string
) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError('product_not_found')
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

    if (quantity > product.productCount) {
        throw new ValidationError('Invalid input')
    }

    product.productCount -= quantity;
    await product.save();
    return product;
}
