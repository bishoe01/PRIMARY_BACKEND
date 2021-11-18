const express = require("express");
const sequelize = require("./models").sequelize;
const attendant = require("./models").Attendant;

const PORT = "3000";

//


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

  const user = require('./routes/user/user');
  app.use("/users", user);

  const movie = require('./routes/user/movie');
  app.use("/movies", movie);

  const cast  = require('./routes/user/cast');
  app.use("/cast", cast);

  const theater  = require('./routes/user/theater');
  app.use("/theater", theater);

  app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
  });



// }
