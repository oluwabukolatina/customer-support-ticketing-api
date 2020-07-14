// const Model = require('../../../models/Request');
// /**
//  * request services performs all action related to a signed in customer requests
//  *  - fetching all requests,
//  *  creating request,
//  * getting a particular request
//  */
//
// class RequestService {
//   /**
//    * @description Takes a new request object
//    * @param {object} request
//    * @returns {object} created request
//    */
//   static async createARequest(data) {
//     try {
//       return await Model.create(data);
//     } catch (error) {
//       return error;
//     }
//   }
//
//   /**
//    * @description Retrieve and return all requests for a signed in user
//    * @returns {Array} of requests or throw error
//    */
//   static async fetchAllRequests(data) {
//     try {
//       return await Model.find(data)
//         .populate('creator', ['-password'])
//         .populate({
//           path: 'comments',
//           populate: {
//             path: 'commenter',
//             model: 'User',
//             select: 'email role',
//           },
//         });
//     } catch (error) {
//       return error;
//     }
//   }
//
//   static async getOneRequest(data) {
//     try {
//       return await Model.findOne(data);
//     } catch (error) {
//       return error;
//     }
//   }
// }
// export default RequestService;
