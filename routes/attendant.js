const router = require("express").Router();
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const attendantModel = models.Attendant;
const employeeModel = models.Employee;

router.get("/", async (req, res) => {
  const { employee_id } = req.query;

  let b;
  if (employee_id) {
    b = await attendantModel.findAll({
      where: { employee_id: employee_id },
      include: {
        model: employeeModel,
        as: "employee",
        attributes: ["name"],
      },
    });
  } else {
    b = await attendantModel.findAll();
  }

  res.json(b);
});

router.post("/", async (req, res) => {
  const { employee_id } = req.body;
  await attendantModel.create({
    employee_id: employee_id,
  });
  res.status(201).end();
});

module.exports = router;
