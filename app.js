const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");
const router = require("./routes/index");
const pgPool = require("./db/pool");

const app = express();
const pgSession = require("connect-pg-simple")(session);
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);
app.use(passport.session());
app.use(express.static(assetsPath));

// Parse form data into req.body
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const port = process.env.PORT || 3154;
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
