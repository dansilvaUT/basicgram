require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

// CONTROLLERS
const ac = require("./controllers/auth_controller");
const pc = require("./controllers/post_controller");

// ENV
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

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

//POST ENDPOINTS
app.get("/api/posts", pc.getPosts);
app.post("/api/postuserinfo", pc.getUserInfo);
app.post("/api/post", pc.createPost);
// app.put("api/post/:id", pc.editPost);
app.delete("/api/post/:id", pc.deletePost);
