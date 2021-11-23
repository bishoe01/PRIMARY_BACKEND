const express = require('express');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Status = models.Status_now;
const left = models.Leave;
const Holiday = models.Holiday;
const router = express.Router();


router.get('/:employeeID/now',async(req,res,next)=>{
    const {employeeID} = req.params;
    try{
        const statuslist = await Status.findAll({
            where:{employee_id:employeeID}
        });
        res.send({statuslist});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/now', function(req,res){
    const {employee_id,status,start_date,end_date,created_at,updated_at,is_deleted} = req.body;
    Status.create({
        employee_id : employee_id,
        status :  status,
        start_date : start_date,
        end_date:end_date,
        created_at : created_at,
        updated_at : updated_at,
        is_deleted : is_deleted
    }).then(function(createSuggestion){
        res.json({employee_id,status,start_date,end_date,created_at,updated_at,is_deleted});
    })
});

//휴가
router.get('/:employeeID/leave',async(req,res,next)=>{
    const {employeeID}  = req.params;
    try{
        const leaves = await left.findAll({
            where : {employee_id : employeeID}
        });
        res.send({leaves});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/leave', function(req,res){
    const {employee_id,start_date,end_date,leave_type,reason,is_approved, created_at,updated_at,is_deleted} = req.body;
    left.create({
        employee_id : employee_id,
        leave_type :  leave_type,
        reason : reason,
        is_approved:is_approved,
        start_date : start_date,
        end_date:end_date,
        created_at : created_at,
        updated_at : updated_at,
        is_deleted : is_deleted
    }).then(function(createLeave){
        res.json({employee_id,start_date,end_date,leave_type,reason,is_approved, created_at,updated_at,is_deleted});
    })
});


router.get('/holiday',async(req,res,next)=>{
    try{
        const holidays = await Holiday.findAll({
            where : {holiday_id : 1}
        });
        res.send({holidays});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/holiday', function(req,res){
    const {start_date,end_date,description, created_at,updated_at,is_deleted} = req.body;
    Holiday.create({
        description : description,
        start_date : start_date,
        end_date:end_date,
        created_at : created_at,
        updated_at : updated_at,
        is_deleted : is_deleted
    }).then(function(createLeave){
        res.json({start_date,end_date,description, created_at,updated_at,is_deleted});
    })
});


module.exports = router;