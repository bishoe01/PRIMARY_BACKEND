const router = require("express").Router();

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);

const movieModel = models.Movie;
// const GenreOfMovieModel = require("../../models").Genre_of_movie;

// api 5번. 영화 상태별 전체 리스트 조회
// 쿼리 스트링 어떻게 받아오는지? 일단 path variable로 구현함

router.get("/", async (req,res) => {
    const {status} = req.query;
    //const {status} = req.params;

        //현재 상영작만 조회
        const currentMovies = await movieModel.findAll({
            attributes : ["title", "poster_image", "running_time","open_date"],

            where: {status: 1},
        });

        //현재 상영작 + 상영 예정작 조회
        const allMovies = await movieModel.findAll({
            attributes : ["title", "poster_image", "running_time", "open_date"],

        });


        if (status == 1) {
            //현재 상영작 조회
            return res.json ({currentMovies});

        } else if (status == 2) {
            //현재 상영작 + 상영 예정작 조회
            return res.json({allMovies});
        }

    })

// api 6번. 영화 장르별 리스트 조회
// 쿼리 스트링 어떻게 받아오는지? 일단 path variable로 구현함

router.get("/genre/:genreID", async (req,res) => {

    const {genreID} = req.params;

    //조인?
    const moviesByGenre = await movieModel.findAll({
        attributes : ["title", "poster_image", "running_time", "open_date"],
        include : [
            {
                model : models.Genre_of_movie,
                as : "Genre_of_movies",
                where: {genre_id: genreID}
            }
        ],
    });

        return res.json({moviesByGenre});

})


// api 7번. 영화 국가별 리스트 조회
// 쿼리 스트링 어떻게 받아오는지? 일단 path variable로 구현함

router.get("/country/:countryID", async (req,res) => {
    const {countryID} = req.params;

    //조인?
    const moviesByCountry = await movieModel.findAll({
        attributes : ["title", "poster_image", "running_time", "open_date"],
        include : [
            {
                model : GenreOfMovieModel ,
            }
        ],
        where: {country_id: countryID},
    });

    return res.json({moviesByCountry});

})

module.exports = router;