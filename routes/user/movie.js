const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const movieModel = models.Movie;
const genreOfMovieModel = models.Genre_of_movie;
const countryOfMovieModel = models.Country_of_movie;

// api 5번. 필터별 영화 목록 조회 API
router.get("/", async (req,res) => {
    const {status, genreID, countryID, rating} = req.query;

    if (status) {
            //현재 상영작 조회
            return res.json ( await sequelize.query(
                `select title,poster_image, running_time, DATE_FORMAT(open_date, '%Y-%m-%d') as open_date from Movie where status = :status and Movie.is_deleted = 'N';`,
                {
                    replacements: {status : status},
                    type: Sequelize.QueryTypes.SELECT,
                    raw: true
                })
            );


            } else if (genreID) {
                //장르별 조회
                return res.json ( await sequelize.query(
                    `select title,poster_image, running_time,  DATE_FORMAT(open_date, '%Y-%m-%d') as open_date from Movie
                                inner join Genre_of_movie Gom on Movie.movie_id = Gom.movie_id
                                where genre_id = :genre_id and Movie.is_deleted = 'N';`,
                    {
                        replacements: {genre_id : genreID},
                        type: Sequelize.QueryTypes.SELECT,
                        raw: true
                    })
                );
            } else if (countryID) {
                //국가별 조회
                return res.json ( await sequelize.query(
                    `select title,poster_image, running_time,  DATE_FORMAT(open_date, '%Y-%m-%d') as open_date from Movie
                                  inner join Country_of_movie Com on Movie.movie_id = Com.movie_id
                                  where country_id = :country_id and Movie.is_deleted = 'N';`,
                    {
                        replacements: {country_id : countryID},
                        type: Sequelize.QueryTypes.SELECT,
                        raw: true
                    })
                );
            }  else if (rating) {
                //국가별 조회
                return res.json ( await sequelize.query(
                    `select title,poster_image, running_time,  DATE_FORMAT(open_date, '%Y-%m-%d') as open_date from Movie
                                 where rating= :rating and Movie.is_deleted = 'N';`,
                    {
                        replacements: {rating : rating},
                        type: Sequelize.QueryTypes.SELECT,
                        raw: true
                    })
                );
            }

        });
// api 6번. 특정 영화 정보 조회
router.get("/:movieID", async (req,res) => {
    const {movieID} = req.params;

    const movieInfoQuery = `select title, poster_image, running_time, open_date, group_concat(distinct genre_name) as genre, group_concat(distinct cast_name) as cast, country_name
                            from Movie
                                inner join Genre_of_movie Gom on Movie.movie_id = Gom.movie_id
                                inner join Genre G on Gom.genre_id = G.genre_id
                                inner join Country_of_movie Com on Movie.movie_id = Com.movie_id
                                inner join Country C on Com.country_id = C.country_id
                                inner join Cast_of_movie m on Movie.movie_id = m.movie_id
                                inner join Cast C2 on m.cast_id = C2.cast_id
                            where Movie.movie_id = :movie_id and Movie.is_deleted = 'N'
                            group by Movie.movie_id;`


    let movieInfo = await sequelize.query(
        movieInfoQuery,
        {
            replacements: {movie_id : movieID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({movieInfo});

})


// api 17번. 영화별 리뷰 전체 조회 API
router.get("/:movieID/reviews", async (req,res) => {
    const {movieID} = req.params;

    const reviewOfMovieListQuery = `select reveiw_title, text,Date(Review.create_at)as date, login_id from Review
        inner join User U on Review.user_id = U.user_id
                                        inner join Movie M on Review.movie_id = M.movie_id
                                    where M.movie_id = :movie_id;`


    let reviewOfMovieList = await sequelize.query(
        reviewOfMovieListQuery,
        {
            replacements: {movie_id : movieID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({reviewOfMovieList});

})

module.exports = router;