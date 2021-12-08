const router = require('express').Router();
const Sequelize = require('sequelize');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Compliment = models.Compliment;
const Employee_notice = models.Employee_notice;
const Employee_event = models.Event;
//notice , event , compliment

// router.get('/notice/:noticeID',async(req,res,next)=>{
//     const {noticeID} = req.params;
//     try{
//         const notices = await Employee_notice.findAll({
//             where : {employee_notice_id :noticeID }
//         });
//         res.send({notices});
//     }catch(error){
//         console.log.error(error);
//         next(error);
//     }
// });


// router.patch('/notice/:emplyee_notice_id',async(req,res,next)=>{
//     const {employee_notice_id} = req.params;
//     const {is_deleted} = req.body;
//         try
//         {
//         await Employee_notice.update({
//             is_deleted
//         },{where : {employee_notice_id : employee_notice_id}});
//         res.send("is_deleted");
//     }catch(error){
//         next(error);
//     }
// });


router.patch('/notice/:employee_notice_id',async(req,res,next)=>{
    const {employee_notice_id} = req.params;
    const {notice_writer} = req.body;
    const {notice_title} = req.body;
    const {notice_content} = req.body;
    const {is_deleted} = req.body;
    if(is_deleted == 'Y'){try
        {
        await Employee_notice.update({
            is_deleted
        },{where : {employee_notice_id : employee_notice_id}});
        res.send("is_deleted");
    }catch(error){
        next(error);
    }}
    else{
        try
        {
        await Employee_notice.update({
            notice_title, notice_content,notice_writer
        },{where : {employee_notice_id : employee_notice_id}});
        const updateresult =  await Employee_notice.findAll(
            {where: {employee_notice_id : employee_notice_id},
            order :[['created_at','ASC']]}
        );
        res.json(updateresult);
    }catch(error){
        next(error);
    }}
});



router.get('/notice/:emplyee_notice_id',async(req,res,next)=>{
    const {emplyee_notice_id} = req.params;
    {   await sequelize.query(`UPDATE Employee_notice SET view_count=view_count+1 where employee_notice_id=1;`,
            {
                type: Sequelize.QueryTypes.UPDATE,
                raw: true
            })
        const notices = await Employee_notice.findAll({
                where : {employee_notice_id :emplyee_notice_id, is_deleted : 'N'},
                order :[['created_at','ASC']]
            });
            res.send({notices});
    }
});


router.get('/notice',async(req,res,next)=>{
    
    try{
        const notices = await Employee_notice.findAll(
            {where : {is_deleted : 'N'},order :[['created_at','ASC']]}
        );
        res.send({notices});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});


// router.get('/notice/:noticeID',async(req,res,next)=>{
//     const {noticeID} = req.params;
//     try{
//         Employee_notice.update({
//             view_count
//         },{where : {notice_id: noticeID}}
//         )
//         const notices = await Employee_notice.findAll({
//             where : {notice_id : noticeID}}
//         );
//         res.send({notices});
//     }catch(error){
//         console.log.error(error);
//         next(error);
//     }
// });
    
router.get('/compliment/:employee_id',async(req,res,next)=>{
    const {employee_id} = req.params;
    try{
    const {complimentlist} = await Compliment.findAll({
        include :{model: models.Employee, as: "employee",attributes:['name']},
        where : {employee_id : employee_id}
    });
    res.json({complimentlist});
    }catch(error){
        next(error);
    }
});




       
// router.get('/compliment/ranking',async(req,res,next)=>{
//     const complimentRank = await Compliment.findAll({
//         limit :3,
//         attributes : ["name", "compliment_count"],
        
//         order : [['compliment_count', 'DESC']]
//         });
//         return res.json({complimentRank});
// });

router.get('/compliment/rank',async(req,res,next)=>{
    {
        return res.json ( await sequelize.query(
            `SELECT name, compliment_count from Compliment
            inner join Employee E on Compliment.employee_id = E.employee_id
            ORDER BY compliment_count DESC;`,
            {
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        )
    }
});


router.get('/event',async(req,res,next)=>{
    try{
        const events = await Employee_event.findAll({
            where : {event_id : 1 }
        });
        res.send({events});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});




router.post('/notice', function(req,res){
    const {notice_title, notice_content,notice_writer} = req.body;
    Employee_notice.create({
        notice_title : notice_title,
        notice_content : notice_content,
        notice_writer :  notice_writer
    }).then(function(createdNotice){
        res.json({Employee_notice, notice_title, notice_writer});
    })
});

router.post('/event', function(req,res){
    const {event_name, title,description,end_date} = req.body;
    Employee_event.create({
        event_name : event_name,
        title : title,
        description :  description,
        end_date : end_date
    }).then(function(createdEvent){
        res.json({event_name, title, description,end_date});
    })
});


router.post('/compliment', function(req,res){
    const {employee_id, content,compliment_count} = req.body;
    Compliment.create({
        employee_id : employee_id,
        content : content,
        compliment_count :  compliment_count+1
    }).then(function(createdCompliment){
        res.json({employee_id, content, compliment_count});
    })
});

module.exports = router;