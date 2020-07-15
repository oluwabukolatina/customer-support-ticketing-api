/* eslint-disable no-underscore-dangle */
import Comment from '../../../models/Comment';
import Request from '../../../models/Request';

/**
 * performs all action related to comment for both user levels:
 * make a comment
 */

class CommentService {
  /**
   * @description make a comment on the request
   * @param { int }
   * @param { object } data
   * @returns {object} request or throw weeror
   */
  static async makeComment(data:any, id:string) {
    try {
      return await Comment.create(data)
        .then((comment) => Request.findByIdAndUpdate(id,
          { $push: { comments: comment._id } },
          { new: true, useFindAndModify: false })).catch((err) => err);
    } catch (e) {
      return e;
    }
  }
}

export default CommentService;
