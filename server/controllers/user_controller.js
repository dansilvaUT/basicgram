module.exports = {
  getAllUsers: (req, res) => {
    const db = req.app.get("db");

    db.users.get_all_users().then(resp => {
      res.status(200).send(resp);
    });
  }
};
