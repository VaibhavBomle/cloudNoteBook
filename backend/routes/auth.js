const User = require(`../models/User`);
const express = require(`express`);
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth".   Not required auth
router.post(`/`,[
    body('name',"Enter a valid Name").isLength({min:3}),
    body('password',"Enter a valid password").isLength({min: 5}),
    body('email',"Enter a valid email").isEmail()
],(req,res)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(error=> {
        console.log("error====>"+error);
        res.json({error: 'Please enter a unique value ',message : error.message})
    });
})

module.exports = router