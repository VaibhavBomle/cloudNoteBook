const User = require(`../models/User`);
const express = require(`express`);
const router = express.Router();

// Create a User using: POST "/api/auth".   Not required auth
router.post(`/`,(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save()
     res.send(req.body);
})

module.exports = router