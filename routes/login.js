const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// router.post("/", (req, res) => {
//   console.log("request");
//   passport.authenticate("local", (error, user, info) => {
//     res.send("success");
//   });
// });
router.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign(req.user.toJSON(), "secret");
    res.json({ jwt: token });
  }
);

router.get(
  "/jwt",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user.name);
  }
);

module.exports = router;
