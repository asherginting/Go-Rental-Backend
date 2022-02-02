exports.returningError = (res, status, message) => {
    return res.status(status).json({
        success: false,
        message
    });
};

exports.returningSuccess = (res, status, message, data, pageInfo = null) => {
    if (pageInfo) {
        return res.status(status).json({
            success: true,
            message: message,
            result: data,
            pageInfo
        });
    }

    return res.status(status).json({
        success: true,
        message: message,
        result: data
    });
};

exports.pageCreator = (url, values) => {
    const keys = [];
    let next = url;
    let prev = url;

    for (const key in values) {
        keys.push(key);
    }

    keys.forEach((el, idx) => {
        if (values[el]) {
            if (el === 'page') {
                next += el + '=' + (values[el] + 1) + '&';
                prev += el + '=' + (values[el] - 1) + '&';
            } else if (idx < (keys.length - 1)) {
                next += el + '=' + values[el] + '&';
                prev += el + '=' + values[el] + '&';
            } else {
                next += el + '=' + values[el];
                prev += el + '=' + values[el];
            }
        }
    });

    return ({
        next,
        prev
    });
};
