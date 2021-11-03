const express = require("express");
const sequelize = require("./models").sequelize;
const attendant = require("./models").Attendant;

const PORT = "3000";

const app = express();
app.use(express.json());

sequelize.authenticate();

app.get("/", (req, res) => {
  res.send("hello primary");
});

app.get("/test", async (req, res) => {
  const at = await attendant.findAll();
  res.send(at);
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
