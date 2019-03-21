module.exports = {
  getComments: (req, res) => {
    const db = req.app.get("db");
    console.log("hit getComments", req.params);
    const { id: post_id } = req.params;

    db.comments.get_comments({ post_id }).then(resp => {
      console.log(resp);
      res.status(200).send(resp);
    });
  },

  createComment: (req, res) => {
    const db = req.app.get("db");

    const { user_id: commenting_user_id } = req.session.user;
    let { post_id, comment } = req.body;
    let date_added = new Date();

    db.comments
      .create_comment({ comment, commenting_user_id, post_id, date_added })
      .then(resp => {
        res.sendStatus(200);
      });
  },

  editComment: (req, res) => {
    const db = req.app.get("db");

    const { comment } = req.body;
    const { id: comment_id } = req.params;

    db.comments.edit_comment({ comment_id, comment }).then(resp => {
      res.status(200).send(resp);
    });
  },

  deleteComment: (req, res) => {
    const db = req.app.get("db");
    const { comment_id } = req.params;
    const { user_id } = req.session.user;

    db.comments.delete_comment({ comment_id }).then(resp => {
      res.status(200).send(resp);
    });
  }
};
