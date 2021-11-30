const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const theaterModel = models.Theater;


// api 11번. 극장 목록

router.get("/", async (req,res) => {
    const {theaterAddress} = req.query;

    if (!theaterAddress) {
        //theaterID 빈 값인 경우
        return res.json ("theaterAddress를 입력하시오.")
    } else {
        //지역별 극장 조회
        return res.json ( await sequelize.query(
            `select theater_name from Theater where address = :theaterAddress and is_deleted = 'N';`,
            {
                replacements: {theaterAddress: theaterAddress},
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        )


    }

});

// api 12번. 특정 극장 조회
router.get("/:theaterID", async (req,res) => {
    const {theaterID} = req.params;

    const theaterInfoQuery = `select theater_name, theater_image, address_detail, address_code, introduction from Theater where theater_id = :theater_id;
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