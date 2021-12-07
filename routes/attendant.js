const router = require("express").Router();
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const attendantModel = models.Attendant;
const employeeModel = models.Employee;
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { employee_id } = req.query;

  let b;
  let name;
  if (employee_id) {
    name = await employeeModel.findOne({
      where: { employee_id: employee_id },
      attributes: ["name"],
    });
    const time = new Date();
    const weekage = new Date(time.setDate(time.getDate() - 14));
    b = await attendantModel.findAll({
      where: {
        employee_id: employee_id,
        time_in: {
          [Op.gte]: weekage.getTime(),
        },
      },
    });
    res.json({ name: name.name, attendant: b });
  } else {
    b = await attendantModel.findAll({
      where: {
        time_in: {
          [Op.gte]: weekage.getTime(),
        },
      },
    });
    res.json(b);
  }
});

router.post("/", async (req, res) => {
  const { employee_id } = req.body;
  await attendantModel.create({
    employee_id: employee_id,
  });
  res.status(201).end();
});

module.exports = router;
