const User = require(`../models/User`);
const express = require(`express`);
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "WearelearingREACTJS"

// Create a User using: POST "/api/auth".   Not required auth
router.post(`/create-user`,[
    body('name',"Enter a valid Name").isLength({min:3}),
    body('password',"Enter a valid password").isLength({min: 5}),
    body('email',"Enter a valid email").isEmail()
], async (req,res)=>{
    console.log(req.body)
    // If error return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try{

      // Ge user from db
    let user = await User.findOne({
      email: req.body.email
    })

    if(user){
      return res.status(400).json({error: "User with this email already exist !!"})
    }

    const salt =  await bcrypt.genSalt(10);
    
    const secretPassword = await bcrypt.hash(req.body.password,salt);

    // create a user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword
      })

      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      console.log("jwtData ==>"+authToken)
      res.json({authToken:authToken})
    }catch(error){
       console.log(" create user , error ===>"+error.message);
       res.status(500).send("Error occcur while user login")
    }
})


// Login end point
router.post(`/login`,[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min: 5})
], async (req,res)=>{
   const {email,password} = req.body;
   try{
       let user = await User.findOne({email});
       if(!user){
        return res.status(400).json({error : "Plz try to login with correct credential"});
       }
       const passwordCompare = await bcrypt.compare(password,user.password);
       if(!passwordCompare){
          return res.status(400).json({error: "Please try to login with correct credentials!!"})
       }
       const data = {
            user :{
              id : user.id
            }
       }
       const authToken = jwt.sign(data,JWT_SECRET);
       res.json({authToken})
   }catch(error){
    console.log("Login , error ===>"+error.message);
    res.status(500).send("Error occcur")
   }
});

module.exports = router