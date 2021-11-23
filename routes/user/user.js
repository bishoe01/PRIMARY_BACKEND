const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const userModel = models.User;


// api 2번. 회원가입
router.post("/join", async (req,res) => {
    const {name, login_id, password, nickname, phone_number, email, birth, } = req.body;

    //아이디 중복확인 필요
    const IDCheck = await userModel.count({
        where : {login_id : login_id}
    });

    if (IDCheck > 0) {
        return res.json("중복된 아이디입니다.")
    }


    const userCreate = await userModel.create({

        name : name,
        login_id : login_id,
        password : password,
        nickname : nickname,
        phone_number : phone_number,
        email : email,
        birth : birth

    });

    return res.json ("success Join");

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


// // api 3번. 특정 유저 프로필 조회  - raw query 사용
// router.get("/:userID", async (req,res) => {
//     const {userID} = req.params;
//
//     const userQuery = `SELECT * FROM User`
//
//
//     let user = await sequelize.query(
//         userQuery,
//         {
//             //replacements: {personId: person.id},
//             type: Sequelize.QueryTypes.SELECT,
//             raw: true
//         });
//
//     console.log(user);
//     return res.json ({user});
//
// })
//



module.exports = router;