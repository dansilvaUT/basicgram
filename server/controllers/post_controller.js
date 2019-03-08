module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get("db");

    db.posts.get_all_posts().then(resp => {
      res.status(200).send(resp);
    });
  },
  createPost: (req, res) => {
    const db = req.app.get("db");
    const user_id = ({ id } = req.session.user);
    const { img_url } = req.body;
    let date_added = new Date();

    db.posts.create_post([user_id, img_url, date_added]).then(resp => {
      res.status(200).send(resp);
    });
  },

  deletePost: (req, res) => {
    const db = req.app.get("db");
    const user_id = ({ id } = req.session.user);
    const post_id = ({ id } = req.params);

    db.posts.delete_post([post_id, user_id]).then(resp => {
      res.status(200).send(resp);
    });
  }

  //   editPost: (req, res) => {
  //     const db = req.app.get("db");
  //     const post_id = ({ id } = req.params);
  //     const user_id = ({ id } = req.session.user);

  //     db.posts.edit_post([user_id, post_id]).then(resp => {
  //       res.status(200).send(resp);
  //     });
  //   }
};
