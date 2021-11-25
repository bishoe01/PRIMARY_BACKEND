const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);


// api 11번. 잔여 좌석 조회 API
router.get("/:movieScheduleID", async (req,res) => {
    const {movieScheduleID} = req.params;

    const restSeatsQuery = `select Seat.seat_id from Seat
                                                         inner join Hall H on Seat.hall_id = H.hall_id
                                                         inner join Movie_schedule Ms on H.hall_id = Ms.hall_id
                                                         inner join Reservation R on Ms.movie_schedule_id = R.movie_schedule_id
                                                         left join Booked_seat Bs on Seat.seat_id = Bs.seat_id
                            where Ms.movie_schedule_id = :movie_schedule_id and Bs.seat_id is null
                            group by Seat.seat_id;`


    let restSeats = await sequelize.query(
        restSeatsQuery,
        {
            replacements: {movie_schedule_id : movieScheduleID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({restSeats});

});

module.exports = router;