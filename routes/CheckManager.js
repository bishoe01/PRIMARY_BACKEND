const router = require('express').Router();
const Sequelize = require('sequelize');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Status_now = models.Status_now;
const Leave = models.Leave;
const Holiday = models.Holiday;
const Employee = models.Employee;

// router.get('/leave',async(req,res,next)=>{
//     try{
//         const leavelist = await Leave.findAll({
//             attributes : ["leave_id","start_date","end_date","leave_type","created_at"],
//             include :[{model: models.Employee}]
//         });
//         res.send({leavelist});
//     }catch(error){
//         next(error);
//     }
// });

router.get('/leave/list',async(req,res,next)=>{
    try{
        const leave = await Leave.findAll({
            include:[{model: models.Employee, 
                as:"employee",
            attributes: ['name']}]
        ,
            attributes : ["leave_id","start_date","end_date","leave_type"],
            
        });
        res.send({leave});
    }catch(error){
        next(error);
    }
});



router.get('/:employeeID/now',async(req,res,next)=>{
    const {employeeID} = req.params;
    try{
        const statuslist = await Status_now.findAll({
            attributes : ["employee_id","status", "start_date","end_date"],
            
        });
        res.send({statuslist});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/now', function(req,res){
    const {employee_id,status,start_date,end_date,created_at,updated_at,is_deleted} = req.body;
    Status_now.create({
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
router.get('/:employeeID(\\+d+)/leave',async(req,res,next)=>{
    const {employeeID}  = req.params;
    try{
        const leaves = await Leave.findAll({
            attributes : ["employee_id","leave_id", "start_date","end_date","leave_type","reason","is_approved"],
            where : {employee_id : employeeID}
        });
        res.send({leaves});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});
// router.get('/leave',async(req,res,next)=>{
//     try{
//         const leaves = await left.findAll({
//             attributes : ["leave_id","", ""]
//         }
            
//         );
//         res.send({leaves});
//     }catch(error){
//         next(error);
//     }
// });


router.post('/leave', function(req,res){
    const {employee_id,start_date,end_date,leave_type,reason,is_approved, created_at,updated_at,is_deleted} = req.body;
    Leave.create({
        employee_id : employee_id,
        leave_type :  leave_type,
        reason : reason,
        is_approved:is_approved,
        start_date : start_date,
        end_date:end_date
    }).then(function(createLeave){
        res.json({employee_id,start_date,end_date,leave_type,reason,is_approved, created_at,updated_at,is_deleted});
    })
});


router.get('/holiday',async(req,res,next)=>{
    try{
        const holidays = await Holiday.findAll({
            attributes : ["description", "start_date","end_date"],
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