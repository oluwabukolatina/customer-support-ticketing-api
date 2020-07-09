/* eslint-disable import/prefer-default-export */
const Request = require('../../../../../models/Request');
/**
 * performs all action related to request:
 * fetching all requests,
 * getting a particular request
 *  resolving a existing request
 */

module.exports = class RequestService {
  /**
   * @description Retrieve and return all requests
   * @returns {Array} of requests or throw error
   */
  static async fetchAllRequests() {
    try {
      return await Request.find()

        .populate('creator', ['-password'])
        .populate({
          path: 'comments',
          populate: {
            path: 'commenter',
            model: 'User',
            select: 'email role',
          },
        });
    } catch (e) {
      return e;
    }
  }

  /**
   * @description resolve a request
   * @param { int } id
   * @param { string } status
   * @returns {object} request or throw weeror
   */
  static async closeARequest(id) {
    const data = { status: 'Closed' };

    try {
      return await Request.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }
};
