const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const userModel = models.User;

router.post(
  "/user",
  passport.authenticate("userlocal", { session: false }),
  (req, res) => {
    const payload = { user: req.user.toJSON(), type: "user" };
    const token = jwt.sign(payload, "secret");
    res.json({ jwt: token });
  }
);

router.post(
  "/employee",
  passport.authenticate("employeelocal", { session: false }),
  (req, res) => {
    const payload = { user: req.user.toJSON(), type: "employee" };
    const token = jwt.sign(payload, "secret");
    res.json({ jwt: token });
  }
);

// api 2번. 회원가입
router.post("/signup", async (req, res) => {
  const payload = ({
    name,
    login_id,
    password,
    nickname,
    phone_number,
    email,
    birth,
  } = req.body);
  const duplicateUser = await userModel.findOne({
    where: { login_id: login_id },
  });
  if (duplicateUser) {
    res.status(202).json({ message: "duplicate login id" });
  } else {
    userModel.create(payload);
    res.status(201).json({ message: "created" });
  }
});

module.exports = router;
