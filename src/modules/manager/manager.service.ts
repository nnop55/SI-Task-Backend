import User from "../auth/auth.model";

export const getManagers = async (
    filters: any
) => {
    const { searchTerm,
        createdAtFrom,
        createdAtTo,
        priceFrom,
        priceTo, } = filters

    let query: any = {};

    // Filter by username, name, or surname if searchTerm is provided
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        query.$or = [
            { username: { $regex: regex } },
            { name: { $regex: regex } },
            { surname: { $regex: regex } }
        ];
    }

    // Filter by createdAt date range
    if (createdAtFrom && createdAtTo) {
        query.createdAt = { $gte: createdAtFrom, $lte: createdAtTo };
    } else if (createdAtFrom) {
        query.createdAt = { $gte: createdAtFrom };
    } else if (createdAtTo) {
        query.createdAt = { $lte: createdAtTo };
    }

    // Filter by price range
    if (priceFrom && priceTo) {
        query.price = { $gte: priceFrom, $lte: priceTo };
    } else if (priceFrom) {
        query.price = { $gte: priceFrom };
    } else if (priceTo) {
        query.price = { $lte: priceTo };
    }

    const getManagers = await User.find(query);

    return getManagers;
}
