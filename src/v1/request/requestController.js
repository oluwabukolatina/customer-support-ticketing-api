const Request = require('../../../models/Request');

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
        return res.status(200).json({ message: 'Request created!', request: response });
      });
    } catch (e) {
      return res.status(400).send('Something went wrong!');
    }
  },
};
