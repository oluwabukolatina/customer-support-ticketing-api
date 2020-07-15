/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import moment from 'moment';
import * as converter from 'json-2-csv';
import * as fs from 'fs';
import { RequestInterface } from '../../../interfaces/request/request.interface';
import RequestService from '../../../services/requests/admin/request.service';
import SingleRequest from '../../../services/requests/shared/request.service';
/**
 * admin requests controller perform -
 * fetching requests,
 * getting a particular request
 * attend to request
 * get closed request
 */

class RequestController {
  /**
   * @description retrieve and return all requests
   * @param {object} req
   * @param {object} res
   * @returns {Array}
   */
  static async getAllRequests(req: Request, res: Response) {
    const { status } = req.body;
    const query: any = { status };
    try {
      const requests = await RequestService.fetchRequests(query);

      if (!requests) return res.status(400).json({ message: 'Unable to get requests', status: false });
      return res.status(200).json({
        message: 'Fetched all requests',
        status: true,
        requests,
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting requests!' });
    }
  }

  /**
   * @description get a specific request
   * @param {object} req
   * @param {object} res
   * @returns {object} request
   */
  static async getARequest(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const request:RequestInterface = await SingleRequest.getARequest(id);

      if (!request) return res.status(404).json({ message: 'Request Not Found!', status: false });
      return res.status(200).json({ message: 'Fetched a request', status: true, request });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong here!' });
    }
  }

  /**
   * @description get attend to a single request; marking as closed
   * @param {object} req
   * @param {object} res
  //  * @returns {object} request
   */

  static async attendToRequest(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const data = {
      status,
    };

    try {
      const resolved = await RequestService.attendToARequest(id, data);
      if (!resolved) return res.status(400).json({ message: 'Unable to update request', status: false });
      return res.status(200).json({
        message: 'Status Updated',
        status: true,
        request: {
          status: resolved.status,
          id: resolved._id,
          name: resolved.name,
          createdAt: resolved.createdAt,
        },

      });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!', status: false });
    }
  }

  /**
   * @description get closed request in the last one month
   * @param {object} req
   * @param {object} res
   * @returns {Array} requests
   */

  static async searchForClosedRequestsInOneMonth(req: Request, res: Response) {
    // const today = moment().startOf('day');
    // console.log(today.toDate());
    // console.log(moment().toDate());
    // console.log(moment().subtract(1, 'months').format('YYYY-MM-DD'));

    const query = {
      status: 'Closed',
      createdAt: {
        // $gte: moment().subtract(1, 'months').format('YYYY-MM-DD')
        $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
        ,
      },
    };
    // console.log(query);
    try {
      const requests = await RequestService.fetchRequests(query);

      if (!requests) return res.status(400).json({ message: 'Could get requests!', status: false });

      const dl = requests.map((request:RequestInterface) => ({
        // name: request.name,
        // userName: request.email,
        // userRole: request.user.role,
        // userEmail: request.user.email,
        status: request.status,
      }));

      const csvData = await converter.json2csvAsync(dl);

      await fs.writeFileSync('reports.csv', csvData);

      return res.status(200)
        .json({
          requests,
          status: true,
          message: 'Fetched closed requests in the last one month',
        });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong!', status: false });
    }
  }
}

export default RequestController;
