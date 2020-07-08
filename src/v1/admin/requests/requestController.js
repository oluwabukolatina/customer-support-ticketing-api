const Request = require('../../../../models/Request');

module.exports = {
  // admin can see all requests
  async getAllRequests(req, res) {
    try {
      const requests = await Request.find().populate('creator');
      if (!requests) return res.status(400).json({ message: 'Unable to get requests', status: false });
      return res.status(200).json({
        message: 'Fetched all requests',
        status: true,
        requests,
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting requests!' });
    }
  },

};
