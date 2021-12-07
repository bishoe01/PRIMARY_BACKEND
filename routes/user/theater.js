const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const theaterModel = models.Theater;


// api 11번. 극장 목록

// api 6번. 특정 영화 정보 조회
router.get("", async (req,res) => {

    const theaterListQuery = `select theater_name from Theater where is_deleted = 'N';`


    let theaterList = await sequelize.query(
        theaterListQuery,
        {
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({theaterList});

})

// api 12번. 특정 극장 조회
router.get("/:theaterID", async (req,res) => {
    const {theaterID} = req.params;

    const theaterInfoQuery = `select theater_name, theater_image, address, address_code, introduction from Theater where theater_id = :theater_id;
    `


    let theaterInfo = await sequelize.query(
        theaterInfoQuery,
        {
            replacements: {theater_id : theaterID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({theaterInfo});

})



module.exports = router;