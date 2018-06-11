var express=require('express');
var router=express.Router();

/*GET homepage*/
router.get('/',function(req,res,next){
    res.render('art');
});

module.exports=router;