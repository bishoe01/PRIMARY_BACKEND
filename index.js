const express = require("express");
const sequelize = require("./models").sequelize;

const PORT = "3000";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello primary");
});

sequelize.authenticate();

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
