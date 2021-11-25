const router = require("express").Router();
const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const Sequelize = require('sequelize');
const Reservation = models.Reservation;
const User = models.User;

router.get("/:userID", async (req,res) => {
    const {userID} = req.params;

    const userReservationListQuery = `select Reservation.reservation_id, title, date_format(start_time,'%Y.%m.%d %H:%i') as start_time,date_format(end_time,'%Y.%m.%d %H:%i')as end_time,theater_name,hall_name,date(Reservation.create_at) as reservedDate, concat(count(seat_id),'명 관람') as numberOfSeats from Reservation
    inner join Movie_schedule Ms on Reservation.movie_schedule_id = Ms.movie_schedule_id
                                      inner join Movie M on Ms.movie_id = M.movie_id
                                      inner join Booked_seat Bs on Reservation.reservation_id = Bs.reservation_id
                                      inner join Hall H on Ms.hall_id = H.hall_id
                                      inner join Theater T on H.theater_id = T.theater_id
                                  where user_id = :user_id
                                  group by start_time
                                order by Reservation.create_at Desc limit 1;
`


    let userReservationList = await sequelize.query(
        userReservationListQuery,
        {
            replacements: {user_id : userID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({userReservationList});

})



router.patch('/:reservationID',async(req,res,next)=>{
    const {reservationID} = req.params;
    const {is_deleted} = req.body;
    try{
        await Reservation.update({
            is_deleted
        },{where : {reservation_id : reservationID}});
        const cancelreservatation = await Reservation.findByPk(reservationID);
        res.json(cancelreservatation);
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/', function(req,res){
    const {parking_barcode,user_id,movie_schedule_id} = req.body;
    Reservation.create({
        parking_barcode : parking_barcode,
        user_id :  user_id,
        movie_schedule_id : movie_schedule_id
    }).then(function(createReservation){
        res.json({parking_barcode,user_id,movie_schedule_id});
    })
});


module.exports = router;
