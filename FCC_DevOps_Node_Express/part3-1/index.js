// [ import ]
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const session = require("express-session");
const cors = require("cors");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require("./config/config");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

// [ express ]
const app = express();
app.use(express.json());

// [ connect mongo database ]
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false      // no longer supported options. (always false)
    })
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

// [ trust proxy ]
app.enable("trust proxy");

// [ cross origin access ]
app.use(cors({}));

// [ session ]
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 60000,
  }
}));

// [ routing ]
app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi There!! compose!!</h2>");
  console.log("yarh it ran!");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// [ listen ]
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
