import Model from '../../../models/Request';
import { RequestInterface } from '../../../interfaces/request/request.interface';
/**
 * request services performs all action related to a signed in customer requests
 *  - fetching all requests,
 *  creating request,
 * getting a particular request
 */

class RequestService {
  /**
   * @description Takes a new request object
   * @param {object} request
   * @returns {object} created request
   */
  static async createARequest(data:RequestInterface) {
    try {
      return await Model.create(data);
    } catch (error) {
      return error;
    }
  }

  /**
   * @description Retrieve and return all requests for a signed in user
   * @returns {Array} of requests or throw error
   */
  static async fetchAllRequests(data:RequestInterface) {
    try {
      return await Model.find(data)
        .sort('-createdAt')
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
    } catch (error) {
      return error;
    }
  }
}
export default RequestService;
