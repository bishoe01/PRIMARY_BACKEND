const router = require("express").Router();
const Sequelize = require('sequelize');

const m = require("../../models/init-models");
const sequelize = require("../../models").sequelize;
const models = m(sequelize);


// api 19번. 리뷰 작성하기
// router.post("", async (req,res) => {
//     const {review_title, text, star_point,user_id, movie_id} = req.body;
//
//     const postReview = await userModel.create({
//
//         review_title : review_title,
//         text : text,
//         star_point : star_point,
//         user_id : user_id,
//         movie_id : movie_id
//
//     });
//
//     return res.json ("success posting review");
//
// })

// api 12번. 특정 극장 조회
router.post("", async (req,res) => {
    const {review_title, text, star_point,user_id, movie_id} = req.body;

    const postReveiwQuery = `insert into Review(reveiw_title, text, star_point, user_id, movie_id) VALUES ( :review_title, :text, :star_point, :user_id, movie_id);
    `


    let postReview = await sequelize.query(
        postReveiwQuery,
        {
            replacements: {review_title: review_title, text: text, star_point:star_point, user_id:user_id, movie_id:movie_id},
            type: Sequelize.QueryTypes.INSERT,
            raw: true
        });

    return res.json ("success posting review");

})

router.patch("", async (req,res) => {
    const {review_title, text, star_point, user_id, movie_id} = req.body;

    // let postReview = await sequelize.query(
    //     postReveiwQuery,
    //     {
    //         replacements: {review_title: review_title, text: text, star_point:star_point, user_id:user_id, movie_id:movie_id},
    //         type: Sequelize.QueryTypes.INSERT,
    //         raw: true
    //     });

    if(review_title) {
        await sequelize.query(
            `update Review set reveiw_title = :review_title where user_id =:user_id and movie_id =:movie_id;`,
            {
                replacements: {review_title: review_title, user_id:user_id, movie_id:movie_id},
                type: Sequelize.QueryTypes.UPDATE,
                raw: true
            })

    } if (text){ await sequelize.query(
        `update Review set text = :text where user_id =:user_id and movie_id =:movie_id;`,
        {
            replacements: {text: text, user_id:user_id, movie_id:movie_id},
            type: Sequelize.QueryTypes.UPDATE,
            raw: true
        })

    } if(star_point) {await sequelize.query(
        `update Review set star_point = :star_point where user_id =:user_id and movie_id =:movie_id;`,
        {
            replacements: {star_point: star_point, user_id:user_id, movie_id:movie_id},
            type: Sequelize.QueryTypes.UPDATE,
            raw: true
        })

    }

    return res.json ("success update review");

})





module.exports = router;