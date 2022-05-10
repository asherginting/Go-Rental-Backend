const camelCase = require('camelcase-keys');

const { APP_URL } = process.env;

const get = (request, response, model, countModel, table, username) => {
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

    const res = (count, resultsFin) => {
        const { total } = count[0];
        const last = Math.ceil(total / limit);
        const results = camelCase(resultsFin);
        response.json({
            success: true,
            message: `List ${table}`,
            results,
            pageInfo: {
                prev: page > 1 ? `${APP_URL}/${table}?search=${search}&page=${page - 1}&limit=${limit}` : null,
                next: page < last ? `${APP_URL}/${table}?search=${search}&page=${page + 1}&limit=${limit}` : null,
                totalData: total,
                currentPage: page,
                lastPage: last,
            },
        });
    };

    if (username) {
        return model(username, data, (resultsFin) => {
            countModel(username, data, (count) => res(count, resultsFin));
        });
    }
    return model(data, (resultsFin) => {
        countModel(data, (count) => res(count, resultsFin));
    });
};

module.exports = get;
