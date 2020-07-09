/* eslint-disable no-underscore-dangle */
const Comment = require('../../../../models/Comment');
const Request = require('../../../../models/Request');

/**
 * performs all action related to comment for both user levels:
 * make a comment
 */

module.exports = class CommentService {
  /**
   * @description make a comment on the request
   * @param { int } id
   * @param { object } data
   * @returns {object} request or throw weeror
   */
  static async makeComment(data, id) {
    try {
      return await Comment.create(data)
        .then((comment) => Request.findByIdAndUpdate(id,
          { $push: { comments: comment._id } },
          { new: true, useFindAndModify: false })).catch((err) => err);
    } catch (e) {
      return e;
    }
  }
};
