module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get("db");

    db.posts.get_all_posts().then(resp => {
      res.status(200).send(resp);
    });
  },
  getUserInfo: (req, res) => {
    const db = req.app.get("db");
    console.log(req.body);
    const { post_id } = req.body;

    db.posts.get_user_info({ post_id }).then(resp => {
      res.status(200).send(resp);
    });
  },
  createPost: (req, res) => {
    const db = req.app.get("db");
    const { user_id, username } = req.session.user;
    let { img_url } = req.body;
    let post_privacy_level = 0;
    let post_rating = 0;
    let date_added = new Date();

    // if (img_url === "") {
    //   img_url = "https://source.unsplash.com/random/800x600";
    // }

    db.posts
      .create_post([
        user_id,
        img_url,
        date_added,
        post_privacy_level,
        post_rating,
        username
      ])
      .then(resp => {
        res.sendStatus(200);
      });
  },

  deletePost: (req, res) => {
    const db = req.app.get("db");
    const { id: user_id } = req.session.user;
    const { id: post_id } = req.params;

    db.posts.delete_post({ post_id, user_id }).then(resp => {
      res.status(200).send(resp);
    });
  },

  editPostCaption: (req, res) => {
    const db = req.app.get("db");
    const { caption } = req.body;
    const { id: post_id } = req.params;

    db.posts.edit_post_caption({ post_id, caption }).then(resp => {
      res.status(200).send(resp);
    });
  }
};
