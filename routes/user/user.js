const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);
const userModel = models.User;


// // api 2번. 회원가입
// router.post("/join", async (req,res) => {
//     const {name, login_id, password, nickname, phone_number, email, birth, } = req.body;
//
//     //아이디 중복확인 필요
//     const IDCheck = await userModel.count({
//         where : {login_id : login_id}
//     });
//     console.log(IDCheck);
//
//     if (IDCheck > 0 ) {
//         return res.json("중복된 아이디입니다.")
//     }
//
//
//     const userCreate = await userModel.create({
//
//         name : name,
//         login_id : login_id,
//         password : password,
//         nickname : nickname,
//         phone_number : phone_number,
//         email : email,
//         birth : birth
//
//     });
//
//     return res.json ("success Join");
//
// })




// // api 3번. 특정 유저 프로필 조회 - 시퀄라이
// router.get("/:userID", async (req,res) => {
// const {userID} = req.params;
//
// const userInfo = await userModel.findAll({
//     attributes : ["name", "login_id", "nickname", "phone_number", "email", "birth", "point"],
//     include : [
//         {
//         model : models.Membership ,
//         as : "membership",
//         attributes : ["membership_name"]
//         }
//     ],
//     where: {user_id: userID},
//     });
//
// return res.json ({userInfo});
//
// })


// api 3번. 특정 유저 프로필 조회  - raw query 사용
router.get("/:userID", async (req,res) => {
    const {userID} = req.params;

    const userQuery = `select concat(name,'님') as name ,login_id,nickname,phone_number,User.email,DATE_FORMAT(User.birth, '%Y-%m-%d') as birth,point,membership_name from User
    inner join Membership M on User.membership_id = M.membership_id

    where user_id = :user_id and User.is_deleted = 'N';`


    let userInfo = await sequelize.query(
        userQuery,
        {
            replacements: {user_id : userID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({userInfo});

})

// api 4번. 특정 유저 예매 내역 리스트 조회 API
router.get("/:userID/reservations", async (req,res) => {
    const {userID} = req.params;

    const userReservationListQuery = `select title, date_format(start_time,'%Y.%m.%d %H:%i') as start_time,date_format(end_time,'%Y.%m.%d %H:%i')as end_time,theater_name,hall_name,date(Reservation.create_at) as reservedDate, concat(count(Bs.seat_id),'명 관람') as numberOfSeats, group_concat(seat_row_col) as seat_row_col, parking_barcode from Reservation
        inner join Movie_schedule Ms on Reservation.movie_schedule_id = Ms.movie_schedule_id
                                          inner join Movie M on Ms.movie_id = M.movie_id
                                          inner join Booked_seat Bs on Reservation.reservation_id = Bs.reservation_id
                                          inner join Hall H on Ms.hall_id = H.hall_id
                                          inner join Theater T on H.theater_id = T.theater_id
                                          inner join Seat S on Bs.seat_id = S.seat_id
                                      where user_id = :user_id
                                      group by start_time;`


    let userReservationList = await sequelize.query(
        userReservationListQuery,
        {
            replacements: {user_id : userID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({userReservationList});

})


// // api 15번. 좋아요누르기
router.post("/likemovie", async (req,res) => {
    const {user_id, movie_id} = req.body;

    const findLikeMovieQuery = `select count(is_deleted) as count from Like_movie where user_id = :user_id and movie_id = :movie_id;`

    const updateToYQuery = `update Like_movie set is_deleted ='Y' ,update_at = now() where user_id = :user_id and movie_id = :movie_id;`

    const updateToNQuery = `update Like_movie set is_deleted ='N' ,update_at = now() where user_id = :user_id and movie_id = :movie_id;`

    const insertLikeMovieQuery = `INSERT INTO Like_movie(user_id, movie_id) VALUES (:user_id, :movie_id);`


    let findInLikeMovie = await sequelize.query(
        findLikeMovieQuery,
        {
            replacements: {user_id : user_id, movie_id : movie_id},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    console.log(findInLikeMovie[0]["count"] + "찾기");

    if (findInLikeMovie[0]["count"] == 0) {await sequelize.query(
        insertLikeMovieQuery,
        {
            replacements: {user_id : user_id, movie_id : movie_id},
            type: Sequelize.QueryTypes.INSERT,
            raw: true
        });
        return res.json ("insert like_movie");
    } else if (findInLikeMovie[0]["is_deleted"] == 'N') {await sequelize.query(
        updateToYQuery,
            {
                replacements: {user_id : user_id, movie_id : movie_id},
                type: Sequelize.QueryTypes.UPDATE,
                raw: true
            });
        return res.json ("update like_movie to Y");

    } else if (findInLikeMovie[0]["is_deleted"] == 'Y') {
        await sequelize.query(
            updateToNQuery,
            {
                replacements: {user_id : user_id, movie_id : movie_id},
                type: Sequelize.QueryTypes.UPDATE,
                raw: true
            });
        return res.json("update like_movie to N");

    }
})



// api 16번. 좋아요 누른 영화 조회 API
router.get("/:userID/likemovie", async (req,res) => {
    const {userID} = req.params;

    const userLikeMovieListQuery = `select title, poster_image from Movie
                                                                        inner join Like_movie Lm on Movie.movie_id = Lm.movie_id
                                                                        inner join User U on Lm.user_id = U.user_id
                                    where U.user_id = :user_id;`


    let userLikeMovieList = await sequelize.query(
        userLikeMovieListQuery,
        {
            replacements: {user_id : userID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({userLikeMovieList});

})

// api 18번. 작성한 리뷰 목록 조회 API
router.get("/:userID/reviews", async (req,res) => {
    const {userID} = req.params;

    const reviewListOfUserQuery = `select reveiw_title, text,Date(Review.create_at)as date, login_id from Review
        inner join User U on Review.user_id = U.user_id
                                       inner join Movie M on Review.movie_id = M.movie_id
                                   where Review.user_id = :user_id;`


    let reviewListOfUse = await sequelize.query(
        reviewListOfUserQuery,
        {
            replacements: {user_id : userID},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

    return res.json ({reviewListOfUse});

})

module.exports = router;