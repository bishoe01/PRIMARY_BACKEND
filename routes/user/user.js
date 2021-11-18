const router = require("express").Router();

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const userModel = models.User;


// api 2번. 회원가입
router.post("/join", async (req,res) => {
    //const {name, login_id, password, nickname, phone_number, email, birth, } = req.body;

    const userCreate = await userModel.create({
        name : req.body.name,
        login_id : req.body.login_id,
        password : req.body.password,
        nickname : req.body.nickname,
        phone_number : req.body.phone_number,
        email : req.body.email,
        birth : req.body.birth
    });

    return res.json ("success");

})




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