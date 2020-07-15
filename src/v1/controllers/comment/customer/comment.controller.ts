/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { UserParams } from '../../../interfaces/definition';
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
    const { comment } = req.body;
    const data = {
      comment,
      commenter: user.id,
      request: id,
    };
    const query: any = { _id: id };

    try {
      const request = await RequestService.getARequest(query);
      if (!request) res.status(404).json({ message: 'Request does not exist sooryy', status: false });
      if (request.status === 'Resolving') {
        const response = await CommentService.makeComment(data, id);
        if (!response) {
          return res.status(400)
            .json({
              message: 'Unable to comment on request',
              status: false,
            });
        }
        return res.status(201).json({
          message: 'Comment saved',
          status: true,
          comment,
        });
      }
      return res
        .status(400).json({
          message: 'You can not reply to a request that is yet to be attended to',
          status: false,
        });

      // if (user.id === request.creator._id) {
      //   if (request.status !== 'Resolving') {
      //     res.status(400)
      //       .json({ message: 'You can not comment on a request that is yet to be attended to by the admin' });
      //   } else {
      //     const response = await CommentService.makeComment(data, id);
      //     if (!response) {
      //       return res.status(400)
      //         .json({
      //           message: 'Unable to comment on request',
      //           status: false,
      //         });
      //     }
      //     return res.status(201).json({
      //       message: 'Comment saved',
      //       status: true,
      //       //     request: {
      //       //       id: response._id,
      //       //       comment,
      //       //       createdAt: response.createdAt,
      //       //     },
      //     });
      //   }
      // } else {
      //   return res.status(400)
      //     .json({
      //       message: 'You can not comment on a request that is not yours',
      //       status: false,
      //     });
      // }
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong here sorry!', status: false });
    }
  }
}

export default CommentController;
