module.exports = {
  async makeRequest(req, res) {
    res.send('hello');

    // const jsonStr = req.query.params
    // try {
    //   const jsonObj = JSON.parse(jsonStr)

    //   res.send('Success')
    // } catch (e) {
    //   res.status(400).send('Invalid JSON string')
    // }
  },
};
