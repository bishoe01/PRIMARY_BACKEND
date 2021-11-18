const express = require("express");
const attendant = require("./routes/attendant");
const schedule = require("./routes/schedule");
const Sequelize = require("sequelize");

const PORT = "3000";
const app = express();
app.use(express.json());

app.use("/attendant", attendant);
app.use("/schedule", schedule);

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err instanceof Sequelize.BaseError);
  res.status(500).json({ err: err, stack: err.stack });
});

app.use('/service', ServiceManagerRouter);
app.use('/suggestion',SuggestManager);
app.use('/menu', MenuviewsRouter);
app.use('/check', CheckManagerRouter);
app.use('/employee', ScheduleRouter);
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});


