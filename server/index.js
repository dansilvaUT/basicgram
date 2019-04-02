require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);
const aws = require("aws-sdk");

const socket = require("socket.io");

// CONTROLLERS
const ac = require("./controllers/auth_controller");
const pc = require("./controllers/post_controller");
const cc = require("./controllers/comment_controller");
const lc = require("./controllers/likes_controller");
const uc = require("./controllers/user_controller");

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
});

const io = socket(
  app.listen(SERVER_PORT, () => {
    console.log(`10-4 on ${SERVER_PORT}`);
  })
);

//SERVE REACT APP
app.use(express.static(`${__dirname}/../build`));

//AUTH ENDPOINTS
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.get("/api/currentuser", ac.getUser);
app.post("/auth/logout", ac.logout);
app.delete("/auth/delete", ac.deleteUser); //not yet hooked up
app.post("/api/checkemail", ac.checkEmail);
app.put("/api/updateusername", ac.updateUsername);
app.put("/api/updateemail", ac.updateEmail);

//POST ENDPOINTS
app.get("/api/posts", pc.getPosts);
// app.post("/api/postuserinfo", pc.getUserInfo);
app.post("/api/post", pc.createPost);
app.put("/api/post/:id", pc.editPostCaption);
app.delete("/api/post/:id", pc.deletePost);

//COMMENT ENDPOINTS
app.post("/api/comments/:id", cc.getComments);
app.post("/api/comment", cc.createComment);
app.put("/api/comment/:id", cc.editComment); //not yet hooked up
app.delete("/api/comment/:id", cc.deleteComment); //not yet hooked up

//LIKE ENDPOINTS
app.post("/api/likes/:id", lc.getLikes);
app.post("/api/like/:id", lc.addLike);
app.post("/api/likeddelete/:id", lc.deleteLike);
app.post("/api/liked/:id", lc.checkIfLiked);

//USER ENDPOINTS
app.get("/api/users", uc.getAllUsers);

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

//SOCKETS
io.on("connection", function(socket) {
  socket.on("startChat", async function(data) {
    console.log(data);
    const { chatRoomId, viewedUserId, id } = data;
    const db = app.get("db");
    let room = await db.chat.check_room({ id: chatRoomId });
    room = room[0];
    if (!room) {
      db.chat.create_room({
        id: chatRoomId,
        user_1: id,
        user_2: viewedUserId
      });
      socket.join(chatRoomId);
    } else {
      const { id } = room;
      let messages = await db.chat.get_all_messages({ room_id: id });

      socket.join(chatRoomId);
      io.to(chatRoomId).emit("startChat", messages);
    }
  });

  socket.on("endChat", function(chatRoomId) {
    socket.leave(chatRoomId);
  });

  socket.on("sendMsg", async function(data) {
    console.log(data);
    const { user_1, message, room, date } = data;
    const db = app.get("db");
    let messages = await db.chat.create_message({
      room_id: room,
      message,
      user_id: user_1,
      date
    });

    console.log(messages);

    io.to(data.room).emit("sendMsg", messages);
  });
});
