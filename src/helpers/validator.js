exports.dataValidator = (data) => {
    const dump = [];

    for (const el in data) {
        if (Object.prototype.hasOwnProperty.call(data, el)) {
            dump.push(data[el]);
        }
    }

    return dump.every((el) => el);
};
