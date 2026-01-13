const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");
const router = require("./routes/index");
const pgPool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// Parse form data into req.body
app.use(express.urlencoded({ extended: true }));
require("./passport");
app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: "user_sessions", // Use another table-name than the default "session" one
      createTableIfMissing: true,
    }),
    secret: "bird",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 days
  })
);

app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(router);

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const port = process.env.PORT || 3154;
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
