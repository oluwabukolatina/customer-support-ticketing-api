const Comment = require('../../../../models/Comment');
/**
 * performs all action related to request for both user levels:
 * getting a particular request
 */

module.exports = class CommentService {
  /**
   * @description Finds a request
   * @param { int } id
   * @returns {object} request or throw weeror
   */
  static async makeComment(data) {
    try {
      return await Comment.create(data);
    } catch (e) {
      return e;
    }
  }
};
