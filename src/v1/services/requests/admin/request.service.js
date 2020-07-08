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
      return await Request.find().populate('creator', ['-password']);
    } catch (e) {
      return e;
    }
  }

  /**
   * @description Finds a request
   * @param { int } id
   * @returns {object} request or throw weeror
   */
  static async getARequest(id) {
    try {
      return await Request.findById(id).populate('creator', ['-password']);
    } catch (e) {
      return e;
    }
  }
};
