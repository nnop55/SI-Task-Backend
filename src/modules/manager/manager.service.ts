import { paginate } from "../../utils/pagination";
import User from "../auth/auth.model";

export const getManagers = async (
    filters: any
) => {
    const { username,
        name,
        surname,
        createdAtFrom,
        createdAtTo,
        priceFrom,
        priceTo,
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
    if (priceFrom && priceTo) {
        query.totalPrice = { range: { from: parseFloat(priceFrom), to: parseFloat(priceTo) } };
    } else if (priceFrom) {
        query.totalPrice = { from: parseFloat(priceFrom) };
    } else if (priceTo) {
        query.totalPrice = { to: parseFloat(priceTo) };
    }
    const paginatedData = await paginate(User, params, query)

    return paginatedData;
}
