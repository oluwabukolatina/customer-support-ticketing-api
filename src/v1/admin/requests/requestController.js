const request = require('../../../../util/request/request');

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

  // - View the status of a single reques
  async getARequest(req, res) {
    const { id } = req.params;
    request.getARequest(id)
      .then((result) => {
        if (!result) return res.status(400).json({ message: 'Unable to get request', status: false });
        return res.status(200).json({ message: 'Fetched a request', status: true, result });
      }).catch(() => res.status(400).json({ message: 'Something went wrong here!' }));
  },

  async resolveRequest(req, res) {
    console.log('hello');
  },

};
