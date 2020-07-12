/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const RequestService = require('../../../services/requests/admin/request.service');
const SingleRequest = require('../../../services/requests/request.service');

/**
 * admin requests controller perform -
 * fetching requests,
 * getting a particular request
 */

module.exports = class RequestController {
  /**
   * @description retrieve and return all requests
   * @param {object} req
   * @param {object} res
   * @returns {Array}
   */
  static async getAllRequests(req, res) {
    const { status } = req.body;
    const query = { status: { $regex: new RegExp(status, 'i') } };
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
  static async getARequest(req, res) {
    const { id } = req.params;
    try {
      const request = await SingleRequest.getARequest(id);

      if (!request) return res.status(404).json({ message: 'Request Not Found!', status: false });
      return res.status(200).json({ message: 'Fetched a request', status: true, request });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong here!' });
    }
  }

  /**
   * @description get a specific request
   * @param {object} req
   * @param {object} res
  //  * @returns {object} request
   */

  static async attendToRequest(req, res) {
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

  static async searchForClosedRequestsInOneMonth(req, res) {
    const query = {
      status: 'Closed',
      createdAt: {
        $gte: moment().subtract(1, 'months').format('YYYY-MM-DD')
        ,
      },
    };
    try {
      const requests = await RequestService.fetchRequests(query);
      if (!requests) return res.status(400).json({ message: 'Could get requests!', status: false });
      return res.status(200)
        .json({
          requests,
          status: true,
          message: 'Fectched closed requests in the last one month',
        });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong!', status: false });
    }
  }
};
