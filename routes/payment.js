const router = require("express").Router();

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ res: "res" });
});

module.exports = router;
