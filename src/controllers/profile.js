const modelProfile = require('../models/profile');

const getProfile = (req, res) => {
    const { id } = req.params;
    modelProfile(id, (results) => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: `Detail profile with id ${id}`,
                results: results[0],
            });
        }
        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found`,
        });
    });
};

module.exports = getProfile;
