import { Response, Request } from 'express';
import { RequestInterface } from '../../../interfaces/request/request.interface';
import { UserParams } from '../../../middlewares/auth';
/* eslint-disable no-underscore-dangle */
import AdminRequestService from '../../../services/requests/admin/request.service';

import RequestService from '../../../services/requests/shared/request.service';

import CommentService from '../../../services/comments/shared/comment.service';

/**
 * comments controller perform -
 * make comment on a particular request
 */

class CommentController {
  /**
   * @description comment on a specific request
   * @param {object} req
   * @param {object} res
    * @returns {object} request
   */
  static async commentOnRequest(req: UserParams, res: Response) {
    const { params, user } = req;
    const { id } = params;
    console.log(typeof id);
    const { comment } = req.body;
    const data:any = {
      comment,
      commenter: user.id,
      request: params.id,
    };
    try {
      const request = await RequestService.getARequest(params.id);
      if (!request) res.status(404).json({ message: 'Request does not exist sooryy', status: false });
      const status = { request };
      await CommentService.makeComment(data, id);
      if (String(status) !== 'Resolving') {
        const updateRequest = { status: 'Resolving' };
        const updatedRequest = await AdminRequestService.attendToARequest(params.id, updateRequest);
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
      console.log(error);
      return res
        .status(400).json({
          message:
            'Something went wrong here while trying to make comment!',
          status: false,
        });
    }
  }
}

export default CommentController;
