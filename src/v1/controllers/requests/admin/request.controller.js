/* eslint-disable no-underscore-dangle */
const RequestService = require('../../../services/requests/admin/request.service');

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
    try {
      const requests = await RequestService.fetchAllRequests();
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
      const request = await RequestService.getARequest(id);

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

  static async resolveRequest(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const resolved = await RequestService.resolveARequest(status, id);
      if (resolved) {
        res.status(200).json({
          message: 'Status Updated',
          status: true,
          request: {
            status: resolved.status,
            id: resolved._id,
            name: resolved.name,
            createdAt: resolved.createdAt,
          },

        });
      }
      return res.status(400).json({ message: 'Unable to update request', status: false });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!', status: false });
    }
  }
};
