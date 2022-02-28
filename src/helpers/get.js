/* eslint-disable radix */
const camelCase = require('camelcase-keys');

const get = (request, response, model, countModel, table) => {
    let { search, page, limit } = request.query;

    search = search || '';
    if (page) {
        if (/\D/g.test(page)) {
            return response.json({
                success: false,
                message: 'page must be number',
            });
        }
        page = parseInt(page);
    }
    if (!page) {
        page = 1;
    }

    if (limit) {
        if (/\D/g.test(limit)) {
            return response.json({
                success: false,
                message: 'limit must be number',
            });
        }
        limit = parseInt(limit);
    }
    if (!limit) {
        limit = 5;
    }

    const offset = (page - 1) * limit;
    const data = { search, limit, offset };

    return model(data, (resultsFin) => {
        if (resultsFin.length > 0) {
            return countModel(data, (count) => {
                const { total } = count[0];
                const last = Math.ceil(total / limit);
                const results = camelCase(resultsFin);
                response.json({
                    success: true,
                    message: `List ${table}`,
                    results,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:5000/${table}?search=${search}&page=${page - 1}&limit=${limit}` : null,
                        next: page < last ? `http://localhost:5000/${table}?search=${search}&page=${page + 1}&limit=${limit}` : null,
                        totalData: total,
                        currentPage: page,
                        lastPage: last,
                    },
                });
            });
        }
        return response.json({
            success: false,
            message: `${search} not found`,
        });
    });
};

module.exports = get;
