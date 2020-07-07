const Request = require('../../../models/Request');

module.exports = {
  async createRequest(req, res) {
    const { name } = req.body;

    // const jsonStr = req.query.params
    try {
      if (!name) return res.status(400).json({ status: false, message: 'All fields required' });
      const newRequest = {
        name,
        // body, tags,
        // user: req.user.id,
      };
      // const jsonObj = JSON.parse(jsonStr);
      Request.create(newRequest, (err, response) => {
        if (err) return res.status(400).json({ message: 'Unable to create request' });
        console.log(response);
        return res.status(200).json({ message: 'Request created!', request: response });
      });
    } catch (e) {
      return res.status(400).send('Something went wrong!');
    }
  },
};
