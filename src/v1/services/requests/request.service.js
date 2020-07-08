/* eslint-disable import/prefer-default-export */
const Request = require('../../../../models/Request');
/**
 * performs all action related to request for both user levels:
 * getting a particular request
 */

module.exports = class RequestService {
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
