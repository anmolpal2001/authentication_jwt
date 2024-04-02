
// import express
const express = require('express');
const router = express.Router();

// import controller
const {login,signup} = require('../controllers/auth'); 

// import middleware
const {auth, isStudent, isAdmin} = require('../middlewares/auth');

// mount routes
router.post('/login',login);
router.post('/signup',signup);

// testing protected routes for single middleware
router.get("/test",auth,(req,res) => {
    res.json({
        success : true,
        message : "Welcome to the protected route"
    })
})

// mount protected routes
router.get('/student',auth,isStudent, (req,res) => {
    res.json({
        success : true,
        message : "Welcome to the protected route for students"
    })
})

router.get('/admin',auth,isAdmin, (req,res) => {
    res.json({
        success : true,
        message : "Welcome to the protected route for admin"
    })
})

module.exports = router;