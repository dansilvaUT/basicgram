require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

// CONTROLLERS
const ac = require("./controllers/auth_controller");

// ENV
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

//SESSION TO DATABASE CONNECTION
const pgPool = new pg.Pool(CONNECTION_STRING);

//SESSION
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      pruneSessionInterval: 60 * 60 * 24 // <-- Once a day
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // <-- One Week
    }
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

// ENDPOINTS
