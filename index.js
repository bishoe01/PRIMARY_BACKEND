const express = require("express");
const passport = require("passport");
const passportConfig = require("./config/passport");
const cors = require("cors");

const attendant = require("./routes/attendant");
const schedule = require("./routes/schedule");
const auth = require("./routes/auth");
const payment = require("./routes/payment");

const user = require('./routes/user/user');
const movie = require('./routes/user/movie');
const cast  = require('./routes/user/cast');
const theater  = require('./routes/user/theater');
const movieSchedule  = require('./routes/user/movieSchedule');
const seat  = require('./routes/user/seat');
const review  = require('./routes/user/review');

const ServiceManagerRouter = require("./routes/ServiceManager");
const SuggestManager = require("./routes/SuggestManager");
const MenuviewsRouter = require("./routes/Menuview");
const CheckManagerRouter = require("./routes/CheckManager");
const ScheduleRouter = require("./routes/ScheduleManager");

const PORT = "3000";
const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passportConfig();
// !important! router 'auth' locate before jwt strategy
// if app use jwt
app.use("/payment", payment);
app.use("/auth", auth);
app.use(passport.authenticate("jwt", { session: false }));

app.use("/users", user);
app.use("/movies", movie);
app.use("/cast", cast);
app.use("/theater", theater);
app.use("/movieSchedule", movieSchedule);
app.use("/seats", seat);
app.use("/reviews", review);

app.use("/attendant", attendant);
app.use("/schedule", schedule);

app.use("/service", ServiceManagerRouter);
app.use("/suggestion", SuggestManager);
app.use("/menu", MenuviewsRouter);
app.use("/check", CheckManagerRouter);
app.use("/employee", ScheduleRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ stack: err.stack });
});

app.use(function (req, res, next) {
  res.status(404).send("404 cannot find resource 오타 없는지 확인해주세요");
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
