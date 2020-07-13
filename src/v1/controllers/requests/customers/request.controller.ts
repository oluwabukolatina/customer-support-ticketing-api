import { Response, Request } from 'express';
import { IUser } from '../../../../models/User';

import { IRequest } from '../../../../models/Request';
import RequestService from '../../../services/requests/customers/request.service';
import SingleRequest from '../../../services/requests/shared/request.service';

/**
 * authenticated customer requests controller perform -
 * fetching signed in user requests,
 * getting a particular request
 *making a request
 * */

class RequestController {
  /**
   * @description create a request with the id of the curently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async createRequest(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { user }: IUser = req;
    const { id } = user;
    if (!name) return res.status(400).json({ status: false, message: 'Name of request required' });

    try {
      const newRequest = {
        name,
        creator: id,
      };

      const request:IRequest = await RequestService.createARequest(newRequest);
      if (!request) return res.status(400).json({ message: 'Unable to create request' });
      return res.status(201).json({
        message: 'Request created!',
        request: {
          status: request.status,
          id: request.id,
          name: request.name,
          createdAt: request.createdAt,
        },
      });
    } catch (e) {
      return res.status(400).send('Something went wrong!');
    }
  }

  /**
   * @description retrieve and return all signed in user requests
   * @param {object} req
   * @param {object} res
   * @returns {Array}
   */
  static async getAUserRequests(req: Request, res: Response) {
    const { id } = req.user;
    const query = { creator: id };
    try {
      const requests = await RequestService.fetchAllRequests(query);
      if (!requests) return res.status(400).json({ message: 'Unable to get requests', status: false });
      return res.status(200).json({
        message: 'Fetched requests',
        status: true,
        requests,
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting requests!' });
    }
  }

  // a customer can only get her own single request
  /**
   * @description get a specific request belonging to the currently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {object} request
   */
  static async getARequest(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req;
    const query = { _id: id, creator: user.id };
    try {
      const request = await SingleRequest.getARequest(query);
      if (!request) return res.status(404).json({ message: 'Request not found', status: false });
      return res.status(200).json({ message: 'Fetched a request', status: true, request });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong here!' });
    }
  }
}
export default RequestController;
