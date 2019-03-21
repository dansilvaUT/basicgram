require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

// CONTROLLERS
const ac = require("./controllers/auth_controller");
const pc = require("./controllers/post_controller");
const cc = require("./controllers/comment_controller");

// ENV
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

const app = express();

app.use(express.json());

//SESSION TO DATABASE CONNECTION
var pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
});

//SESSION
app.use(
  session({
    // store: new pgSession({
    //   pool: pgPool,
    //   pruneSessionInterval: 60 * 60 * 24 // <-- Once a day
    // }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })
);

//DATABASE AND SERVER CONNECTIONS

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database connected");

  app.listen(SERVER_PORT, () => {
    console.log(`10-4 on ${SERVER_PORT}`);
  });
});

//AUTH ENDPOINTS
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.get("/api/currentuser", ac.getUser);
app.post("/auth/logout", ac.logout);
app.delete("/auth/delete", ac.deleteUser);
app.post("/api/checkemail", ac.checkEmail);

//POST ENDPOINTS
app.get("/api/posts", pc.getPosts);
// app.post("/api/postuserinfo", pc.getUserInfo);
app.post("/api/post", pc.createPost);
app.put("/api/post/:id", pc.editPostCaption);
app.delete("/api/post/:id", pc.deletePost);

//COMMENT ENDPOINTS
app.post("/api/comments/:id", cc.getComments);
app.post("/api/comment", cc.createComment);
app.put("/api/comment/:id", cc.editComment);
app.delete("/api/comment/:id", cc.deleteComment);

//AWS
const aws = require("aws-sdk");

//AWS ENDPOINT
app.get("/api/signs3", (req, res) => {
  aws.config = {
    region: "us-west-1",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };

  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData);
  });
});
