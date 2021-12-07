const router = require("express").Router();
const Iamport = require("iamport");
const iamport = new Iamport({
  impKey: "5662769362287952",
  impSecret:
    "8ae8fc6c1f4c000ca0803abb0c828adde26979d7704b9c5192d3b5458e83f957cf2903446557b0b9",
});
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const orderModel = models.Order;

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ res: "res" });
});

router.post("/complete", async (req, res, next) => {
  const { imp_uid, merchant_uid } = req.body;

  try {
    const result = await iamport.payment.getByImpUid({ imp_uid: imp_uid });
    const { started_at } = result;
    const date = new Date(started_at);

    console.log(result);
    await orderModel.create({ order_date: started_at * 1000, user_id: 4 });

    res.json({ status: "success", message: "일반 결제 성공" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
