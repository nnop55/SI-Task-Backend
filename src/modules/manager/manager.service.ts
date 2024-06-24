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
    // let query: any = {};

    // // Filter by username, name, or surname if searchTerm is provided
    // if (searchTerm) {
    //     const regex = new RegExp(searchTerm, 'i');
    //     query.$or = [
    //         { username: { $regex: regex } },
    //         { name: { $regex: regex } },
    //         { surname: { $regex: regex } }
    //     ];
    // }

    // // Filter by createdAt date range
    // if (createdAtFrom && createdAtTo) {
    //     query.createdAt = { $gte: createdAtFrom, $lte: createdAtTo };
    // } else if (createdAtFrom) {
    //     query.createdAt = { $gte: createdAtFrom };
    // } else if (createdAtTo) {
    //     query.createdAt = { $lte: createdAtTo };
    // }

    // // Filter by price range
    // if (priceFrom && priceTo) {
    //     query.price = { $gte: priceFrom, $lte: priceTo };
    // } else if (priceFrom) {
    //     query.price = { $gte: priceFrom };
    // } else if (priceTo) {
    //     query.price = { $lte: priceTo };
    // }

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
    }
    if (priceFrom && priceTo) {
        query.totalPrice = { range: { from: parseFloat(priceFrom), to: parseFloat(priceTo) } };
    }
    const paginatedData = await paginate(User, params, query)
    // const getManagers = await User.find(query);

    return paginatedData;
}
