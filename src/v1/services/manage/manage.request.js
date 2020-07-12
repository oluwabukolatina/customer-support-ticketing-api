const User = require('../../../../models/User');
/**
 * performs all action related to managing:
 * fetching all customers,

 * */
module.exports = class ManageService {
  /**
   * @description Retrieve and return all users
   * - either with, query; email
   * @returns {Array} of users or throw error
   */
  static async fetchUsers(data) {
    try {
      return await User.find(data, '-password');
    } catch (e) {
      return e;
    }
  }
};
