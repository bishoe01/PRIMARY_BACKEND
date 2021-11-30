const router = require('express').Router();
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Compliment = models.Compliment;

const Employee_notice = models.Employee_notice;
const Employee_event = models.Event;
//notice , event , compliment

//get
router.get('/notice/:noticeID',async(req,res,next)=>{
    const {noticeID} = req.params;
    try{
        const notices = await Employee_notice.findAll({
            where : {employee_notice_id :noticeID }
        });
        res.send({notices});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.get('/notice',async(req,res,next)=>{
    try{
        const notices = await Employee_notice.findAll();
        res.send({notices});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});
    
router.get('/compliment/:employeeID(\\d+)',async(req,res,next)=>{
    const {employeeID} = req.params;
    const complimentE = await Compliment.findAll({
        attributes : ["employee_id","compliment_id", "content","compliment_count"],
        where : {employee_id: employeeID},
        });
        return res.json({complimentE});
});

       
router.get('/compliment/ranking',async(req,res,next)=>{
    const complimentRank = await Compliment.findAll({
        attributes : ["employee_id", "compliment_count"],
        
        order : [['compliment_count', 'DESC']]
        });
        return res.json({complimentRank});
});


router.get('/compliment',async(req,res,next)=>{
    const complimentE = await Compliment.findAll();
        return res.json({complimentE});
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