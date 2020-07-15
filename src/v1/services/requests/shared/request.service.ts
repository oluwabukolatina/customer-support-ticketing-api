/* eslint-disable @typescript-eslint/no-explicit-any */
import Request from '../../../models/Request';
/**
 * performs all action related to request for both user levels:
 * getting a particular request
 */

class RequestService {
  /**
   * @description Finds a request
   * @param { int } id
   * @returns {object} request or throw weeror
   */
  static async getARequest(query:string) {
    // using a find one query cecause this
    // is used for customer where it is multiple query being passed to search for the id
    try {
      return await Request.findById(query)
        .populate('creator', ['-password'])
        .populate({
          path: 'comments',
          populate: {
            path: 'commenter',
            model: 'User',
            select: 'email role',
            options: { sort: { createdAt: -1 } },

          },
        });
    } catch (e) {
      return e;
    }
  }
}
export default RequestService;
