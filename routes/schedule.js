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

router.post("/", async (req, res, next) => {
  const payload = ({
    title,
    description,
    start_date,
    end_date,
    attend_time,
    leave_time,
    schedule_type,
    employee_id,
    totalwork_time,
  } = req.body);
  try {
    await scheduleModel.create(payload);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

router.patch("/:schedule_id", async (req, res, next) => {
  const { schedule_id } = req.params;
  const payload = req.body;
  try {
    const a = await scheduleModel.update(payload, {
      where: { schedule_id: schedule_id },
    });
    res.send(a);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
