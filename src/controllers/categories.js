const categoriesModel = require('../models/categories');
const {
    returningError,
    returningSuccess,
    pageInfoCreator
} = require('../helpers/responseHandler');

const {
    validateId,
    requestMapping
} = require('../helpers/requestHandler');
const {
    baseURL
} = require('../helpers/constant');

exports.listCategories = async (req, res) => {
    try {
        const data = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5
        };

        const categories = await categoriesModel.getCategories(data);

        const resultCount = await categoriesModel.countCategories();
        const totalCategories = resultCount[0].rows;
        const pageInfo = pageInfoCreator(totalCategories, `${baseURL}/categories?`, data);

        return returningSuccess(res, 200, 'Success getting categories', categories, pageInfo);
    } catch (err) {
        console.error(err);
        return returningError(res, 500, 'Internal server error');
    }
};

exports.getCategory = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!validateId(id)) {
            return returningError(res, 400, 'Id not valid');
        }

        const category = await categoriesModel.getCategory(id);
        return returningSuccess(res, 200, 'Success getting category', category[0]);
    } catch (err) {
        console.error(err);
        return returningError(res, 500, 'Internal server error');
    }
};

exports.addCategory = async (req, res) => {
    try {
        const name = req.body.name;

        const rules = {
            name: 'string'
        };

        const data = requestMapping(name, rules);

        for (const key in data) {
            if (data[key] === null) {
                return returningError(res, 400, 'Name not valid');
            }
        }

        // if (!requestMapping(name, rules)) {
        //   return returningError(res, 400, 'Name not valid');
        // }

        const existingCategory = await categoriesModel.getCategoryByName(name);

        if (existingCategory.length > 0) {
            return returningError(res, 400, 'Category already exists');
        }

        const result = await categoriesModel.addCategory({
            name
        });
        const category = await categoriesModel.getCategory(result.insertId);
        return returningSuccess(res, 201, 'Success adding category', category[0]);
    } catch (err) {
        console.error(err);
        return returningError(res, 500, 'Internal server error');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!validateId(id)) {
            return returningError(res, 400, 'Id not valid');
        }

        const category = await categoriesModel.getCategory(id);

        if (category.length < 1) {
            return returningError(res, 404, 'Category not found');
        }

        const result = await categoriesModel.deleteCategory(id);

        if (result.affectedRows === 0) {
            return returningError(res, 500, 'Category not deleted');
        }

        return returningSuccess(res, 200, 'Success deleting category', category[0]);
    } catch (err) {
        console.error(err);
        return returningError(res, 500, 'Internal server error');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!validateId(id)) {
            return returningError(res, 400, 'Id not valid');
        }

        const category = await categoriesModel.getCategory(id);

        if (category.length < 1) {
            return returningError(res, 404, 'Category not found');
        }

        const name = req.body.name;

        const rules = {
            name: 'string'
        };

        const data = requestMapping(name, rules);

        for (const key in data) {
            if (data[key] === null) {
                return returningError(res, 400, 'Name not valid');
            }
        }

        // if (!requestMapping(name, rules)) {
        //   return returningError(res, 400, 'Name not valid');
        // }

        const existingCategory = await categoriesModel.getCategoryByName(name);

        if (existingCategory.length > 0) {
            return returningError(res, 400, 'Category already exists');
        }

        const result = await categoriesModel.updateCategory(id, {
            name
        });

        if (result.affectedRows === 0) {
            return returningError(res, 500, 'Category not updated');
        }

        const categoryUpdated = await categoriesModel.getCategory(id);
        return returningSuccess(res, 200, 'Success updating category', categoryUpdated[0]);
    } catch (err) {
        console.error(err);
        return returningError(res, 500, 'Internal server error');
    }
};