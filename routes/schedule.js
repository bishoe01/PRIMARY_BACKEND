const router = require("express").Router();
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const scheduleModel = models.Schedule;
const employeeModel = models.Employee;

router.get("/", async (req, res) => {
  const { employeeId, deptId } = req.query;
  let r;
  if (employeeId) {
    r = await scheduleModel.findAll({ where: { employee_id: employeeId } });
  } else if (deptId) {
    r = await scheduleModel.findAll({
      include: [
        {
          model: employeeModel,
          as: "employee",
          where: { department_id: deptId },
          attributes: ["employee_id", "department_id"],
        },
      ],
    });
  } else {
    r = await scheduleModel.findAll();
  }
  res.json(r);
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    start_date,
    end_date,
    attend_time,
    leave_time,
    is_approved,
    schedule_type,
    employee_id,
    totalwork_time,
  } = req.body;
  await scheduleModel.create({
    title,
    description,
    start_date,
    end_date,
    attend_time,
    leave_time,
    is_approved,
    schedule_type,
    employee_id,
    totalwork_time,
  });

  res.status(201).end();
});

router.put("/", (req, res) => {
  const { employee_id } = req.query;
  const { title } = req.body;
  scheduleModel.update(
    { title: title },
    { where: { employee_id: employee_id } }
  );
});

module.exports = router;
