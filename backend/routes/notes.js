const express = require(`express`);
const router = express.Router();


router.get(`/`,(req,res)=>{
     obj = {
         title :"Daily Task",
     }
     res.json(obj);
})

module.exports = router