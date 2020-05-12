const express = require("express");
const expressGraphQL = require("express-graphql");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const schema = require("./schema/schema");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./server/services/auth");
const MongoStore = require("connect-mongo")(session);
const db = require("./config/keys").mongoURI;
const path = require("path");

const app = express();
const schema = require("./server/schema/schema");


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "aaabbbccc",
    store: new MongoStore({
      url: db,
      autoReconnect: true,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT || 5000}`)
);