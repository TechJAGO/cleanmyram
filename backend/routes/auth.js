//here we have imported express, User.js epress-validatior and router.
const express = require('express');
const User = require('../models/Users');
const { body , validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require ('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Jating loves coding";
//here yuu created a post request with router.post and defined a few mandatory parameters like name must have min 3 characters , email must be valid and password must be of a correct length.
router.post('/createuser', [
    body('name', 'Minimum 3 charaters required').isLength({ min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Please choose a stronger password, minimum 8 charaters recommended').isLength({ min:8 })
], async (req, res)=>{ 
    let success = false;
    //async returns a promise
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
//here we are using try and catch to find unexpected errors. so it will try something and if error is found that error will be caught in catch. 
    try {
             //await can only be used inside async function.
             // here we check if the email copy already exists.
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({success, error:"Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    
    const data = {
        user:
        {
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.json({user})
    success=true;
    res.json({success, authtoken})

} catch (error) {
  console.error(error.message);
  res.status(500).send("Some error occured");       
}
})

//Authnticate a user

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{ 
    let success = false;
    //async returns a promise
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            success=false;
            return res.status(400).json({success, error: "Please use the correct credentials"});
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare){
            success=false;
            return res.status(400).json({success, error: "Please use the correct credentials"});
        }

        const data = {
            user:
            {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken})

    } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");       
    }
    })

    //Post login processes of a user

    router.post('/getuser', fetchuser, async (req, res)=>{ 
    //here we are using try and catch to find unexpected errors. so it will try something and if error is found that error will be caught in catch. 
        try {
            userId = req.user.id;
            const user = await User.findOne(userId).select("-password")
    } catch (error) {  
        console.error(error.message);
        res.status(500).send("Internal Server Error");     
    }
    })

// here we have to expose router as a module since we have used the require fuctionality.
module.exports = router