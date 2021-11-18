const router = require("express").Router();

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const movieModel = models.Movie;
const genreOfMovieModel = models.Genre_of_movie;
const countryOfMovieModel = models.Country_of_movie;


// api 5번. 영화 상태별 전체 리스트 조회
// api 6번. 영화 장르별 리스트 조회
router.get("/", async (req,res) => {
    const {status, genreID, countryID, rating} = req.query;
    // const {genreID} = req.query;
    // const {countryID} = req.query;
    // const {rating} = req.query;


    if (status) {
        if (status ==1) {
            //현재 상영작 조회
            return res.json ( await movieModel.findAll({
                attributes : ["title", "poster_image", "running_time","open_date"],

                where: {status: 1},
            })

            );

        } else if (status == 2) {
            //현재 상영작 + 상영 예정작 조회
            return res.json(await movieModel.findAll({
                attributes : ["title", "poster_image", "running_time", "open_date"],

            })
            );
        }
    } else if (genreID) {
        //장르별 조회
        return res.json(await movieModel.findAll({
            attributes : ["title", "poster_image", "running_time", "open_date"],
            include : [
                {
                    model : models.Genre_of_movie,
                    as : "Genre_of_movies",
                    attributes : [],
                    where: {genre_id: genreID}
                }
            ]

        })
        )
    } else if (countryID) {
        //국가별 조회
        return res.json(await movieModel.findAll({
            attributes : ["title", "poster_image", "running_time", "open_date"],
            include : [
                {
                    model : models.Country_of_movie,
                    as : "Country_of_movies",
                    attributes : [],
                    where: {country_id: countryID}
                }
            ],

        })
        )
    }  else if (rating) {
        //국가별 조회
        return res.json(await movieModel.findAll({
            attributes : ["title", "poster_image", "running_time", "open_date"],
            where : {rating: rating}

        })
    )
    }


        //영화 상태별 전체 리스트 조회 - 현재 상영작만 조회
        // const currentMovies = await movieModel.findAll({
        //     attributes : ["title", "poster_image", "running_time","open_date"],
        //
        //     where: {status: 1},
        // });

        //영화 상태별 전체 리스트 조회 - 현재 상영작 + 상영 예정작 조회
        // const allMovies = await movieModel.findAll({
        //     attributes : ["title", "poster_image", "running_time", "open_date"],
        //
        // });

        //장르별 조회
        // const moviesByGenre = await movieModel.findAll({
        //     attributes : ["title", "poster_image", "running_time", "open_date"],
        //     include : [
        //         {
        //             model : models.Genre_of_movie,
        //             as : "Genre_of_movies",
        //             attributes : [],
        //             where: {genre_id: genreID}
        //         }
        //     ]
        //
        // });

        //국가별 조회
        // const moviesByCountry = await movieModel.findAll({
        //     attributes : ["title", "poster_image", "running_time", "open_date"],
        //     include : [
        //         {
        //             model : models.Country_of_movie,
        //             as : "Country_of_movies",
        //             attributes : [],
        //             where: {country_id: countryID}
        //         }
        //     ],
        //
        // });

        // 관람등급별 조회
        // const moviesByRating = await movieModel.findAll({
        //     attributes : ["title", "poster_image", "running_time", "open_date"],
        //     where : {rating: rating}
        //
        // });


        // if (status) {
        //     if (status ==1) {
        //         //현재 상영작 조회
        //         return res.json ({currentMovies});
        //
        //     } else if (status == 2) {
        //         //현재 상영작 + 상영 예정작 조회
        //         return res.json({allMovies});
        //     }
        // } else if (genreID) {
        //     //장르별 조회
        //     return res.json({moviesByGenre})
        //  } else if (countryID) {
        //     //국가별 조회
        //     return res.json({moviesByCountry})
        // }  else if (rating) {
        //     //국가별 조회
        //     return res.json({moviesByRating})
        // }

    });


// api 번. 특정 영화 정보 조회
router.get("/:movieID", async (req,res) => {
    const {movieID} = req.params;

    const movieInfo = await movieModel.findAll({
        attributes : ["title", "poster_image", "running_time", "open_date"],
        include : [
            {
                model : models.Cast_of_movie ,
                as : "Cast_of_movies",
                attributes : ["cast_id"],
                include : [
                    {
                        model : models.Cast ,
                        as : "cast",
                        attributes : ["cast_name"],
                        //where : {movie_id : movieID}

                    }
                ],

            },

            //movie-cast 연관없어서 안됨 cast_of_movies 필요
        // include : [
        //     {
        //         model : models.Cast ,
        //         as : "cast",
        //         attributes : ["cast_name"],
        //         include : [
        //             {
        //                 model : models.Cast_of_movie ,
        //                 as : "Cast_of_movies",
        //                 //attributes : ["cast_name"],
        //                // where : {movie_id : movieID}
        //
        //             }
        //         ],
        //         where : {movie_id : movieID}
        //
        //     },

            // {
            //     model : models.Genre ,
            //     as : "genre",
            //     attributes : ["genre_name"],
            //     include : [
            //         {
            //             model : models.Genre_of_movie ,
            //             as : "Genre_of_movies",
            //             where : {movie_id : movieID}
            //
            //         }
            //     ]
            // },
            //
            // {
            //     model : models.Country ,
            //     as : "country",
            //     attributes : ["country_name"],
            //     include : [
            //         {
            //             model : models.Country_of_movie ,
            //             as : "Country_of_movies",
            //             where : {movie_id : movieID}
            //
            //         }
            //     ]
            // },


        ],
        where: {movie_id: movieID},
    });

    return res.json ({movieInfo});

})


module.exports = router;