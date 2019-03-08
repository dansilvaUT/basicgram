const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    let account_creation_date = new Date();
    //receive username, password, user info, and session from front end
    let {
      username,
      password,
      email,
      first_name,
      last_name,
      facebook_url,
      twitter_url,
      user_age,
      privacy_level,
      profile_pic
    } = req.body;
    const { session } = req;

    //check database to see if username is taken. If taken, return status409
    let takenEmail = await db.auth.check_email({ email });
    takenEmail = +takenEmail[0].count;
    if (takenEmail !== 0) {
      res.sendStatus(409);
    }

    //add salt to password and then hash the password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    //attempt to register the user in the database by sending the username, salted+hashed password, and other info. Receive new user from database in response
    let user = await db.auth.register({
      username,
      password: hash,
      email,
      first_name,
      last_name,
      facebook_url,
      twitter_url,
      user_age,
      privacy_level,
      profile_pic,
      account_creation_date
    });
    user = user[0];
    //attach user to session and send user on session back to front end as response
    session.user = user;
    res.status(200).send(session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const { session } = req;

    let user = await db.auth.login({ email });
    user = user[0];
    if (!user) {
      return res.sendStatus(401);
    }

    let authenticated = bcrypt.compareSync(password, user.password);

    if (authenticated) {
      delete user.password;
      session.user = user;
      res.status(200).send(session.user);
    } else {
      res.status(401);
    }
  },
  getUser: (req, res) => {
    const { user } = req.session;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  },
  logout: (req, res) => {
    req.session.destroy(function() {
      res.sendStatus(200);
    });
  },
  deleteUser: (req, res) => {
    const db = req.app.get("db");
    const user_id = ({ id } = req.session.user);

    db.posts.delete_all_user_posts([user_id]).then(resp => {
      db.auth.delete_user([user_id]).then(resp => {
        res.sendStatus(200);
      });
    });
  }
};
