/* eslint-disable no-underscore-dangle */
const RequestService = require('../../services/requests/admin/request.service');
const SingleRequest = require('../../services/requests/request.service');
const ManageService = require('../../services/manage/manage.request');
/**
 * super admin requests controller perform -
 * delete requests,
 * get all customers
 * get all admin
 */

module.exports = class ManageController {
  /**
   * @description delete reqyest
   * @param {object} req
   * @param {object} res
   */
  static async deleteRequest(req, res) {
    const { id } = req.params;
    try {
      const request = await SingleRequest.getARequest(id);
      if (!request) res.status(400).json({ message: 'Request Not Found', status: false });
      const deletedRequest = await RequestService.deleteRequest(id);
      if (deletedRequest.ok === 1) res.status(200).json({ message: 'Request deleted', status: true });
      return res.status(400).json({ message: 'Unable to delete request', status: false });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while deleting request!' });
    }
  }

  /**
   * @description retrieve and return all customeers
   * @param {object} req
   * @param {object} res
   * @returns {Array}
   */

  static async getAllCustomers(req, res) {
    const data = { role: 'customer' };
    try {
      const customers = await ManageService.fetchUsers(data);
      if (!customers) res.status(400).json({ message: 'Could not get customers', status: false });
      return res.status(200).json({ message: 'Fetched customers', status: true, data: customers });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting users', status: false });
    }
  }
  /**
   * @description retrieve and return all admins
   * @param {object} req
   * @param {object} res
   * @returns {Array}
   */

  static async getAllAdmins(req, res) {
    const data = { role: 'admin' };
    try {
      const admins = await ManageService.fetchUsers(data);
      if (!admins) res.status(400).json({ message: 'Could not get admins', status: false });
      return res.status(200).json({ message: 'Fetched admins', status: true, data: admins });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting users', status: false });
    }
  }
  /**
   * @description delete reqyest
   * @param {object} req
   * @param {object} res
   */
  // static async deleteAdmin(req, res){
  //   const {id} = req.params;
  //   console.log(id);
  //   const
  // }
};
