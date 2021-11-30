const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);


// api 10번. 극장 - 날짜별 영화, 상영스케줄 목록 조회 API
router.get("/", async (req,res) => {
    const {theaterID, date} = req.query;

    if (!theaterID) {
        //theaterID 빈 값인 경우
        return res.json ("theaterID를 입력하시오.")
    } else if (!date) {
        //date 빈 값인 경우
        return res.json ("date를 입력하시오.")
    } else {
        //극장 - 날짜별 영화, 상영스케줄 목록 조회
        return res.json ( await sequelize.query(
            `select title,running_time,group_concat(genre_name) as genre,open_date, hall_name, if (H.type = 1, '2D', '3D') as type, date_format(start_time,'%Y.%m.%d %H:%i') as start_time, date_format(end_time,'%Y.%m.%d %H:%i') as end_time
             from Movie_schedule

                      inner join Movie M on Movie_schedule.movie_id = M.movie_id
                      inner join Genre_of_movie Gom on M.movie_id = Gom.movie_id
                      inner join Genre G on Gom.genre_id = G.genre_id
                      inner join Hall H on Movie_schedule.hall_id = H.hall_id
                      inner join Theater T on H.theater_id = T.theater_id

             where T.theater_id = :theater_id and date(start_time) = :date
             group by movie_schedule_id;`,
            {
                replacements: {theater_id: theaterID, date: date},
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        )


    }

});

module.exports = router;