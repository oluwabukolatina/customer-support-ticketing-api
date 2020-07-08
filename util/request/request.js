const Model = require('../../models/Request');

module.exports = {
  async getARequest(id) {
    try {
      return await Model.findById(id).populate('creator', ['-password']);
    } catch (e) {
      return e;
    }
  },
};
