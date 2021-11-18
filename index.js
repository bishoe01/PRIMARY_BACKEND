const express = require("express");
const sequelize = require("./models").sequelize;
const attendant = require("./models").Attendant;
const ServiceManagerRouter = require('./routes/ServiceManager');
const SuggestManager = require('./routes/SuggestManager');
const MenuviewsRouter = require('./routes/Menuview');
const CheckManagerRouter = require('./routes/CheckManager');
const ScheduleRouter = require('./routes/ScheduleManager');
const PORT = "3000";
const app = express();
sequelize.authenticate();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello primary");
});

app.get("/test", async (req, res) => {
  const at = await attendant.findAll();
  res.send(at);
});

app.use('/service', ServiceManagerRouter);
app.use('/suggestion',SuggestManager);
app.use('/menu', MenuviewsRouter);
app.use('/check', CheckManagerRouter);
app.use('/employee', ScheduleRouter);
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});


