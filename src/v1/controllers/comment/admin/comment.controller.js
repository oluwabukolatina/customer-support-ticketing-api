/* eslint-disable no-underscore-dangle */
const CommentService = require('../../../services/comments/comment.service');
const RequestService = require('../../../services/requests/request.service');
const AdminRequestService = require('../../../services/requests/admin/request.service');

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
      if (!request) res.status(404).json({ message: 'Request does not exist sooryy', status: false });
      await CommentService.makeComment(data, id);
      if (request.status !== 'Resolving') {
        const updateRequest = { status: 'Resolving' };
        const updatedRequest = await AdminRequestService.attendToARequest(id, updateRequest);
        if (!updatedRequest) {
          return res
            .status(400)
            .json({ message: 'Unable to update status of the request. Comment has been saved!', status: false });
        }
        return res.status(201).json({
          message: 'Status Updated and comment saved',
          status: true,
          comment,
        });
      }
      return res.status(201).json({
        message: 'Comment Saved',
        status: true,
        comment,
      });
    } catch (error) {
      return res
        .status(400).json({
          message:
            'Something went wrong here while trying to make comment!',
          status: false,
        });
    }
  }
};
