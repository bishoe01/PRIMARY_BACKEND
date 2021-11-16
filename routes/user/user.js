const router = require("express").Router();

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const userModel = models.User;


// api 3번. 특정 유저 프로필 조회
router.get("/:userID", async (req,res) => {
const {userID} = req.params;

const userInfo = await userModel.findAll({
    attributes : ["name", "login_id", "nickname", "phone_number", "email", "birth", "point"],
    include : [
        {
        model : models.Membership ,
        as : "membership",
        attributes : ["membership_name"]
        }
    ],
    where: {user_id: userID},
    });

return res.json ({userInfo});

})

module.exports = router;