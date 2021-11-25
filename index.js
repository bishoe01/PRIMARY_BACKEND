const express = require("express");
const Sequelize = require("sequelize");

const attendant = require("./routes/attendant");
const schedule = require("./routes/schedule");

const user = require('./routes/user/user');
const movie = require('./routes/user/movie');
const cast  = require('./routes/user/cast');
const theater  = require('./routes/user/theater');
const movieSchedule  = require('./routes/user/movieSchedule');
const seat  = require('./routes/user/seat');

const ServiceManagerRouter = require('./routes/ServiceManager');
const SuggestManager = require('./routes/SuggestManager');
const MenuviewsRouter = require('./routes/Menuview');
const CheckManagerRouter = require('./routes/CheckManager');
const ScheduleRouter = require('./routes/ScheduleManager');

const PORT = "3000";
const app = express();
app.use(express.json());

app.use("/users", user);
app.use("/movies", movie);
app.use("/cast", cast);
app.use("/theater", theater);
app.use("/movieSchedule", movieSchedule);
app.use("/seats", seat);

app.use("/attendant", attendant);
app.use("/schedule", schedule);

app.use('/service', ServiceManagerRouter);
app.use('/suggestion',SuggestManager);
app.use('/menu', MenuviewsRouter);
app.use('/check', CheckManagerRouter);
app.use('/employee', ScheduleRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err instanceof Sequelize.BaseError);
  res.status(500).json({ err: err, stack: err.stack });
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

