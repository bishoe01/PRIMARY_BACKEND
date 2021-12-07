const express = require('express');
const m = require("../models/init-models");
const Sequelize = require('sequelize');
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const Menu = models.Menu;
const Employee = models.Employee;
const router = express.Router();
router.get('/',async(req,res,next)=>{
    const {type} = req.query;
    try{
        const menus = await Menu.findAll({
            where : {menu_type : type}
        });
        res.send({menus});
    }catch(error){
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
        next(error);
    }
});

router.get('/employee',async(req,res,next)=>{
    const {menu_want} = req.query;
    return res.json ( await sequelize.query(
        `SELECT employee_id,name,department_id from Menu
        inner join Employee
        where menu_want = ${menu_want};
        `,
        {
            replacements: {menu_want: menu_want},
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        })
    )
})

router.get('/employee/:menu_type',async(req,res,next)=>{
    const {menu_type} = req.params;
    if(menu_type == 'B'){
        return res.json ( await sequelize.query(
            `SELECT employee_id,name,department_id from Menu
            inner join Employee
            where menu_want = 1 or menu_want = 4 or menu_want =5;
            `,
            {
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        )
    }
    else if (menu_type =='L'){
        return res.json ( await sequelize.query(
            `SELECT employee_id,name,department_id from Menu
            inner join Employee
            where menu_want = 2 or menu_want = 4 or menu_want =6;
            `,
            {
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        )
    }
    else if (menu_type =='D'){
        return res.json ( await sequelize.query(
            `SELECT employee_id,name,department_id from Menu
            inner join Employee
            where menu_want = 3 or menu_want = 5 or menu_want =6;
            `,
            {
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        )
    }
    
})

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