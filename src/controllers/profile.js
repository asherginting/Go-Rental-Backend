const modelProfile = require('../models/profile');
const response = require('../helpers/response');

const getProfile = (req, res) => {
  const { id } = req.params;
  modelProfile(id, (results) => {
    if (results.length > 0) {
      return response(req, res, `Detail profile with id ${id}`, results[0]);
    }
    return response(req, res, `User with id ${id} not found`, null, null, 404);
  });
};

module.exports = getProfile;
