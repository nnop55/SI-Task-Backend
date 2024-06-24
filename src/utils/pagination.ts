export const paginate = async (
    model: any,
    params: any,
    filters = {}
) => {
    const query: any = {};
    for (const [key, value] of Object.entries(filters)) {
        const val = value as any;

        if (val.exact) {
            query[key] = val.exact;
        }
        if (val.contains) {
            query[key] = { $regex: val.contains, $options: 'i' };
        }
        if (val.range) {
            query[key] = { $gte: val.range.from, $lte: val.range.to };
        }
    }

    const totalCount = await model.countDocuments(query);

    const pageSize = parseInt(params.pageSize) || 10;
    const pageIndex = parseInt(params.pageIndex) || 0;
    const pageCount = Math.ceil(totalCount / pageSize);

    const results = await model.find(query)
        .skip(pageIndex * pageSize)
        .limit(pageSize);

    return {
        totalCount,
        pageCount,
        pageSize,
        pageIndex,
        results
    };
}