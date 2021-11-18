const router = require("express").Router();

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const theaterModel = models.Theater;


// api 11번. 극장 목록 조회
router.get("", async (req,res) => {

    const theaterList = await theaterModel.findAll({
        attributes : ["theater_name"],
        where : {is_deleted: 'N'}
    });

    return res.json ({theaterList});

})


// api 12번. 특정 극장 조회
router.get("/:theaterID", async (req,res) => {
    const {theaterID} = req.params;

    const theaterInfo = await theaterModel.findAll({
        attributes : ["theater_name", "theater_image","address", "address_code", "introduction"],
        where :{theater_id : theaterID}
    });

    return res.json ({theaterInfo});

})



module.exports = router;