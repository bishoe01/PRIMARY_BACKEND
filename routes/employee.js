const router = require("express").Router();
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const employeeModel = models.Employee;

router.get("/all", async (req, res) => {
  const employees = await employeeModel.findAll();
  res.json(employees);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await employeeModel.findByPk(id);
  res.json({ employee });
});

module.exports = router;
