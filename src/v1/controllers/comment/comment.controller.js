/* eslint-disable no-underscore-dangle */
const CommentService = require('../../services/comments/comment.service');
const RequestService = require('../../services/requests/request.service');

/**
 * comments controller perform -
 * make comment on a particular request
 */

module.exports = class CommentController {
  /**
   * @description comment on a specific request
   * @param {object} req
   * @param {object} res
    * @returns {object} request
   */
  static async commentOnRequest(req, res) {
    const { params, user } = req;
    const { id } = params;

    const { comment } = req.body;
    const data = {
      comment,
      commenter: user.id,
      request: id,
    };

    try {
      const request = await RequestService.getARequest(id);
      if (request) {
        const response = await CommentService.makeComment(data, id);
        if (!response) return res.status(400).json({ message: 'Unable to comment on request', status: false });
        return res.status(201).json({
          message: 'Status Updated',
          status: true,

          request: {
            id: response._id,
            comment,
            createdAt: response.createdAt,
          },

        });
      }
      return res.status(404).json({ message: 'Request does not exist', status: false });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!', status: false });
    }
  }
};
