import User from '../../models/User';
/**
 * performs all action related to managing:
 * fetching all customers,

 * */
class ManageService {
  /**
   * @description Retrieve and return all users
   * - either with, query; email
   * @returns {Array} of users or throw error
   */
  static async fetchUsers(data:any) {
    const { email, role } = data;
    try {
      if (email) {
        return await User.find(data, '-password');
      }
      return await User.find({ role }, '-password');
    } catch (e) {
      return e;
    }
  }

  /**
   * @description Retrieve and return all aadmin
   * - either with, query; email
   * @returns {Array} of users or throw error
   */
  static async fetchAdmin(data:any) {
    const { email, role } = data;
    try {
      if (email) {
        return await User.find({ email }, '-password -requests');
      }
      return await User.find({ role }, '-password -requests');
    } catch (e) {
      return e;
    }
  }

  /**
   * @description upgrade user role
   * - user id and data(role it should be upgraded to)
   */
  static async upgradeRole(id:string, data:any) {
    try {
      return await User.findByIdAndUpdate(id, data, { new: true });
    } catch (e) {
      return e;
    }
  }

  /**
   * @description Retrieve and return a user
   * - either with, query; email
   * @returns {object} of user or throw error
   */
  static async getUser(data:any) {
    try {
      return await User.findById(data, '-password').populate('requests');
    } catch (e) {
      return e;
    }
  }

  /**
   * @description Delete an admin
   * @param { int } id
   */
  static async deleteUser(id: string) {
    try {
      return await User.findByIdAndDelete(id);
      // .then((deleted) => {
      //   Comment.deleteMany({ commenter: id });
      // });
    } catch (e) {
      return e;
    }
  }
}

export default ManageService;
