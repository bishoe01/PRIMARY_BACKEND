const express = require('express');
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Menu = models.Menu;
const router = express.Router();
router.get('/',async(req,res,next)=>{
    const {type} = req.query;
    try{
        const menus = await Menu.findAll({
            where : {menu_type : type}
        });
        res.send({menus});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.get('/list',async(req,res,next)=>{
    try{
        const menus = await Menu.findAll(
            {attributes : ["menu_id","menu_image", "menu_list"]}
        );
        res.send({menus});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.get('/:menuID',async(req,res,next)=>{
    const {menuID} = req.params;
    try{
        const menus = await Menu.findAll({
            where : {menu_id: menuID}
        });
        res.send({menus});
    }catch(error){
        console.log.error(error);
        next(error);
    }
});

router.post('/', function(req,res){
    const {menu_type,menu_details, menu_list, menu_image,created_at,updated_at,is_deleted} = req.body;
    Menu.create({
        menu_type : menu_type,
        menu_details :  menu_details,
        menu_list : menu_list,
        menu_image : menu_image,
        created_at: created_at,
        updated_at : updated_at,
        is_deleted : is_deleted
    }).then(function(createmenu){
        res.json({menu_type,menu_details, menu_list, menu_image,created_at,updated_at,is_deleted});
    })
});

module.exports = router;