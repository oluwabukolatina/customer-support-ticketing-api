/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import Request from '../../../models/Request';
/**
 * performs all action related to request:
 * fetching all requests,
 * getting a particular request
 *  resolving a existing request
 *  delet request
 */

class RequestService {
  /**
   * @description Retrieve and return all requests - either with, query; closed tickets within a time frame, status
   * @returns {Array} of requests or throw error
   */

  static async fetchRequests(query:any) {
    const { status } = query;
    if (status) {
      try {
        return await Request.find(query)
          .populate({ path: 'creator', select: 'role email createdAt _id' })
          .populate({
            path: 'comments',
            options: { sort: { createdAt: -1 } },
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
            options: { sort: { createdAt: -1 } },
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
   * @returns {object} request or throw error
   */
  static async attendToARequest(id: any, data: any) {
    try {
      return await Request.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * @description delete a request
   * @param { int } id
   * @returns {object} request or throw error
   */
  static async deleteRequest(id: string) {
    try {
      return await Request.deleteOne({ _id: id });
    } catch (e) {
      return e;
    }
  }
}

export default RequestService;
