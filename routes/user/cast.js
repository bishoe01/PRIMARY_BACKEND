const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const castModel = models.Cast;


// api 10번. 특정 배우/감독 조회
router.get("/:movieID", async (req,res) => {
    const {movieID} = req.params;

    const getActorQuery = `select group_concat(cast_name) as actor from Cast
                           inner join Cast_of_movie Com on Cast.cast_id = Com.cast_id
                           where job =1 and movie_id = :movie_id;`

    const getDirectorQuery = `select group_concat(cast_name) as director from Cast
                           inner join Cast_of_movie Com on Cast.cast_id = Com.cast_id
                           where job =2 and movie_id = :movie_id;`


    let actorOfMovie = await sequelize.query(
        getActorQuery,
        {
            replacements: {movie_id: movieID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });



    let directorOfMovie = await sequelize.query(
        getDirectorQuery,
        {
            replacements: {movie_id : movieID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({actorOfMovie, directorOfMovie});

})


module.exports = router;