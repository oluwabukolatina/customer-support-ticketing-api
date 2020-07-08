const Request = require('../../../../../models/Request');

module.exports = {

  async createRequest(req, res) {
    const { name } = req.body;
    const { user } = req;
    const { id } = user;
    if (!name) return res.status(400).json({ status: false, message: 'All fields required' });

    try {
      const newRequest = {
        name,
        creator: id,
      };
      return Request.create(newRequest, (err, response) => {
        if (err) return res.status(400).json({ message: 'Unable to create request' });
        return res.status(200).json({
          message: 'Request created!',
          request: {
            status: response.status,
            id: response.id,
            name: response.name,
            createdAt: response.createdAt,
          },
        });
      });
    } catch (e) {
      return res.status(400).send('Something went wrong!');
    }
  },
  // users to view status of their previous requests
  async getAUserRequests(req, res) {
    const { id } = req.user;
    try {
      const requests = await Request.find({ creator: id });
      if (!requests) return res.status(400).json({ message: 'Unable to get requests', status: false });
      return res.status(200).json({
        message: 'Fetched requests',
        status: true,
        requests,
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong while getting requests!' });
    }
  },

  // a customer can only get her own request
  async getARequest(req, res) {
    const { id } = req.params;
    const { user } = req;
    try {
      const request = await Request.findOne({ _id: id, creator: user.id });
      if (!request) return res.status(400).json({ message: 'Unable to get request', status: false });
      return res.status(200).json({ message: 'Fetched a request', status: true, request });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong here!' });
    }
  },

};
