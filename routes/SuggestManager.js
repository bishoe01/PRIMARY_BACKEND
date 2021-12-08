const express = require('express');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Employee_Suggestion = models.Suggestion;
const router = express.Router();


router.get('/',async(req,res,next)=>{
    try{
        const suggestions = await Employee_Suggestion.findAll(
            {include :{model: models.Employee, as: "employee",attributes:['name']}}
        );
        res.json({suggestions});
    }catch(error){
        next(error);
    }
});

router.get('/:suggestionID',async(req,res,next)=>{
    const {suggestionID} = req.params;
    try{
        const suggestions = await Employee_Suggestion.findAll({
            include :{model: models.Employee, as: "employee",attributes:['name']},
            where : {suggestion_id : suggestionID}
        });
        res.json({suggestions});
    }catch(error){
        next(error);
    }
});

router.patch('/:suggestionID',async(req,res,next)=>{
    const {suggestionID} = req.params;
    const {result} = req.body;
    const {is_approved} = req.body;
    try{
        await Employee_Suggestion.update({
            result, is_approved
        },{where : {suggestion_id : suggestionID}});
        const updateresult =  await Employee_Suggestion.findByPk(suggestionID);
        res.json(updateresult);
    }catch(error){
        next(error);
    }
});


router.post('/', function(req,res){
    const {title,content,result} = req.body;
    Employee_Suggestion.create({
        content : content,
        title :  title,
        result : result
    }).then(function(createSuggestion){
        res.json({title,content,result});
    })
});


module.exports = router;