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
   * @description Retrieve and return all requests - either with, query; closed tickets within a time frame, status
   * @returns {Array} of requests or throw error
   */

  static async fetchRequests(data) {
    const { status } = data;
    if (status) {
      try {
        return await Request.find(data)

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
    } else {
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
  }

  /**
   * @description resolve a request
   * @param { int } id
   * @param { string } status
   * @returns {object} request or throw weeror
   */
  static async attendToARequest(id, data) {
    try {
      return await Request.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }
};
