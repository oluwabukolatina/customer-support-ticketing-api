import { Request, Response } from 'express';
import { UserInterface } from '../../interfaces/user/user.interface';
/* eslint-disable no-underscore-dangle */
import RequestService from '../../services/requests/admin/request.service';

import SingleRequest from '../../services/requests/shared/request.service';
import ManageService from '../../services/manage/manage.service';
/**
 * super admin requests controller perform -
 * delete requests,
 * get all customers
 * get all admin
 */

class ManageController {
  /**
   * @description delete reqyest
   * @param {object} req
   * @param {object} res
   */
  static async deleteRequest(req: Request, res:Response) {
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

  static async getAllCustomers(req: Request, res:Response) {
    const { email } = req.body;
    const data = { role: 'customer', email };
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

  static async getAllAdmins(req: Request, res:Response) {
    const { email, role } = req.body;
    const data = { role, email };
    try {
      const admins = await ManageService.fetchAdmin(data);
      if (!admins) res.status(400).json({ message: 'Could not get admins', status: false });
      return res.status(200).json({ message: 'Fetched admins', status: true, data: admins });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting users', status: false });
    }
  }

  /**
   * @description upgrade an admin to superadmin
   * @param {object} req
   * @param {object} res
   */
  static async upgradeAdminRole(req: Request, res:Response) {
    const { role } = req.body;
    const { id } = req.params;
    const data = { role };
    try {
      const upgrade = await ManageService.upgradeRole(id, data);
      if (!upgrade) res.status(400).json({ message: 'Could not upgrade user role', status: false });
      return res.status(200).json({
        message: `Updated role to ${role}`,
        status: true,
        data: {
          role: upgrade.role,
          id: upgrade._id,
          email: upgrade.email,
        },
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting users', status: false });
    }
  }

  /**
   * @description retrieve and return single user of all levels
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */

  static async getOneUser(req: Request, res:Response) {
    const { id } = req.params;
    const data = { _id: id };
    try {
      const user = await ManageService.getUser(data);
      if (!user) {
        return res.status(400)
          .json({
            message: 'Could not get user',
            status: false,
          });
      }
      if (user.role === 'customer') res.status(200).json({ message: 'Fetch customer', status: true, user });
      return res.status(200).json({
        message: 'Fetch admin',
        status: true,
        user: {
          role: user.role,
          id: user._id,
          email: user.email,
        },
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting users', status: false });
    }
  }

  /**
   * @description delete an admin
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async deleteAdmin(req: Request, res:Response) {
    const { id } = req.params;
    const data = { _id: id };

    try {
      const user = await ManageService.getUser(data);
      if (!user) res.status(404).json({ message: 'Not Found', status: false });
      const deletedAdmin = await ManageService.deleteUser(id);
      if (!deletedAdmin) return res.status(400).json({ message: 'Unable to delete admin', status: false });
      return res.status(200).json({ message: 'Admin Deleted', status: true });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while deleting user', status: false });
    }
  }
}

export default ManageController;
