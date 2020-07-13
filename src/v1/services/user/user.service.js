import User from '../../../models/user.model';
/**
 * performs all action related to user:
 * getting a user
 */
class UserService {
  /**
     * @description get a user
     * @param { string } email
     * @returns {object} request or throw error
     */
  static async getAUser(email) {
    try {
      return await User.findOne({ email });
    } catch (e) {
      return e;
    }
  }
}
export default UserService;
