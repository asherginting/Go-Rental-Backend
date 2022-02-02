exports.dataValidator = (data) => {
    const dump = [];

    for (const el in data) {
        if (Object.prototype.hasOwnProperty.call(data, el)) {
            if (typeof data[el] === 'string') {
                dump.push(data[el].trim());
            } else {
                dump.push(data[el]);
            }
        }
    }

    return dump.every((el) => el);
};

exports.validateId = (id) => {
    if (isNaN(Number(id))) {
        return false;
    }
    return true;
};

exports.requestReceiver = (data, keys) => {
    const dump = {};
    for (const key of keys) {
        dump[key] = null;
    }

    for (const key in data) {
        if (keys.includes(key)) {
            dump[key] = data[key];
        }
    }

    return dump;
};

exports.newRequestReceiver = (data, keys) => {
    const dump = {};
    const keysCollection = [];

    for (const k in data) {
        keysCollection.push(k);
    }

    for (const k in data) {
        if (keysCollection.includes(k)) {
            if (keys[k] === 'string') {
                dump[k] = data[k];
            }
            if (keys[k] === 'number') {
                if (isNaN(Number(data[k]))) {
                    dump[k] = null;
                } else {
                    dump[k] = data[k];
                }
            }
            if (keys[k] === 'boolean') {
                data[k] = String(data[k]);
                if (data[k] === 'true' || data[k] === '1') {
                    dump[k] = 1;
                } else if (data[k] === 'false' || data[k] === '0') {
                    dump[k] = 0;
                } else {
                    dump[k] = null;
                }
            }
        }
    }
};
