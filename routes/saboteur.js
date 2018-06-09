var express=require('express');
var router=express.Router();

// var io=require('socket.io');

/*GET homepage*/
router.get('/',function(req,res,next){
    res.render('saboteur');
    
});

module.exports=router;