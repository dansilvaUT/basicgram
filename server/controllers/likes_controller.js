module.exports = {
  getLikes: (req, res) => {
    const db = req.app.get("db");
    const { id: post_id } = req.params;

    db.likes.get_likes({ post_id }).then(resp => {
      res.status(200).send(resp);
    });
  },

  checkIfLiked: (req, res) => {
    const db = req.app.get("db");
    const { id: post_id } = req.params;
    const { user_id } = req.session.user;

    db.likes.check_if_liked({ post_id, user_id }).then(resp => {
      res.status(200).send(resp);
    });
  },

  addLike: (req, res) => {
    const db = req.app.get("db");
    const { id: post_id } = req.params;
    const { user_id } = req.session.user;

    db.likes.add_like({ post_id, user_id }).then(resp => {
      res.sendStatus(200);
    });
  },

  deleteLike: (req, res) => {
    const db = req.app.get("db");
    const { id: post_id } = req.params;
    const { user_id } = req.session.user;

    db.likes.delete_like({ post_id, user_id }).then(resp => {
      res.sendStatus(200);
    });
  }
};
