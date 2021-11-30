const express = require('express');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Employee_Request = models.Request;
const router = express.Router();
router.get('/',async(req,res,next)=>{
    try{
        const requests = await Employee_Request.findAll();
        res.send({requests});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.get('/:requestID',async(req,res,next)=>{
    const {requestID} = req.params;
    try{
        const requests = await Employee_Request.findAll({
            where : {request_id : requestID}
        });
        res.send({requests});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.patch('/:requestID',async(req,res,next)=>{
    const {requestID} = req.params;
    const {result} = req.body;
    const {is_approved} = req.body;
    try{
        await Employee_Request.update({
            result, is_approved
        },{where : {request_id : requestID}});
        const updateresult =  await Employee_Request.findByPk(requestID);
        res.json(updateresult);
    }catch(error){
        console.log.error(error);
        next(error);
    }
});


router.post('/', function(req,res){
    const {title,content,result} = req.body;
    Employee_Suggestion.create({
        content : content,
        title :  title,
        result : result
    }).then(function(createRequest){
        res.json({title,content,result});
    })
});


module.exports = router;