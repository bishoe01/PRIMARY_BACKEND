const express = require('express');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Employee = models.Employee;

const router = express.Router();

router.get('/:employeeid',async(req,res,next)=>{
    const {employeeid} = req.params;
    try{
        const employees = await Employee.findAll({
            where : {employee_id : 4}
        });
        res.send({employees});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/', function(req,res){
    const {name,email,gender,birth,salary,address,rank,leaves_left,department_id,created_at,updated_at,is_deleted} = req.body;
    Employee.create({
        name : name,
        emial : email,
        gender : gender,
        birth:birth,
        salary:salary,
        address:address,
        rank:rank,
        leaves_left: leaves_left,
        department_id:department_id,
        created_at: created_at,
        updated_at: updated_at,
        is_deleted: is_deleted
    }).then(function(createdemployee){
        res.json({name,email,gender,birth,salary,address,rank,leaves_left,department_id,created_at,updated_at,is_deleted});
    })
});

module.exports = router;