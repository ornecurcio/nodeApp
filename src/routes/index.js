const router = require('express').Router(); 

//renderiza a index y about.hbs
router.get('/index', (req, res)=>{
    res.render('index'); 
})
router.get('/about', (req, res)=>{
    res.render('about'); 
})
module.exports = router; 