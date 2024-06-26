import NotFoundError from "../../utils/errors/notFoundError";
import { paginate } from "../../utils/pagination";
import Manager from "../auth/auth.model";
import SaledProduct from "./saled-product.model";

export const getManagers = async (
    filters: any
) => {
    const { username,
        name,
        surname,
        createdAtFrom,
        createdAtTo,
        totalOfSalesFrom,
        totalOfSalesTo,
        pageSize,
        pageIndex } = filters

    const params = {
        pageSize,
        pageIndex
    }

    const query: any = {};
    if (username) {
        query.username = { contains: username };
    }
    if (name) {
        query.name = { contains: name };
    }
    if (surname) {
        query.surname = { contains: surname };
    }
    if (createdAtFrom && createdAtTo) {
        query.createdAt = { range: { from: new Date(createdAtFrom), to: new Date(createdAtTo) } };
    } else if (createdAtFrom) {
        query.createdAt = { from: new Date(createdAtFrom) };
    } else if (createdAtTo) {
        query.createdAt = { to: new Date(createdAtTo) };
    }
    if (totalOfSalesFrom && totalOfSalesTo) {
        query.totalOfSales = { range: { from: parseFloat(totalOfSalesFrom), to: parseFloat(totalOfSalesTo) } };
    } else if (totalOfSalesFrom) {
        query.totalOfSales = { from: parseFloat(totalOfSalesFrom) };
    } else if (totalOfSalesTo) {
        query.totalOfSales = { to: parseFloat(totalOfSalesTo) };
    }
    const paginatedData = await paginate(Manager, params, query)

    return paginatedData;
}

export const getManagerById = async (
    managerId: string
) => {
    const manager = await Manager.findById(managerId);

    if (!manager) {
        throw new NotFoundError('Manager not found')
    }
    return manager;
}

export const updateManagerTotalCount = async (
    managerId: string,
    quantity: number
) => {
    const manager = await getManagerById(managerId);
    manager.totalOfSales += quantity;

    await manager.save();
    return manager;
}


export const addOrUpdateSaledProduct = async (
    userId: string,
    quantity: number,
    title: string,
    price: number,
    productId: string
) => {

    const exist = await getSaledProductById(productId)

    if (exist) {
        exist.saledProductCount += quantity;

        await exist.save();
        return exist;
    }

    const payload = {
        userId,
        title,
        price,
        saledProductCount: quantity,
        productId
    }
    const newProduct = new SaledProduct(payload);
    await newProduct.save();
    return newProduct;
}

export const getSaledProducts = async (
    title: string
) => {
    let query: any = {}
    if (title) {
        query['title'] = { $regex: title, $options: 'i' };
    }

    const saledProducts = await SaledProduct.find(query);
    return saledProducts ?? null;
}

const getSaledProductById = async (
    productId: string
) => {
    const product = await SaledProduct.findOne({ productId });
    return product ?? null;
}


