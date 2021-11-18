const express = require('express');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Employee_Suggestion = models.Suggestion;
const router = express.Router();
router.get('/',async(req,res,next)=>{
    try{
        const suggestions = await Employee_Suggestion.findAll();
        res.send({suggestions});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.get('/:suggestionID',async(req,res,next)=>{
    const {suggestionID} = req.params;
    try{
        const suggestions = await Employee_Suggestion.findAll({
            where : {suggestion_id : suggestionID}
        });
        res.send({suggestions});
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
    }).then(function(createSuggestion){
        res.json({title,content,result});
    })
});


module.exports = router;