const router = require("express").Router();

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const castModel = models.Cast;


// api 10번. 특정 배우/감독 조회
router.get("/:castID", async (req,res) => {
    const {castID} = req.params;

    const castInfo = await castModel.findAll({
        attributes : ["cast_name", "nationality", "cast_birth", "job"],
        where: {cast_id: castID},
    });

    return res.json ({castInfo});

})



module.exports = router;