
// auth , isStudent , isAdmin

const jwt = require('jsonwebtoken');
require("dotenv").config();

// Now, we will create a middleware function which will check if the user is authenticated or not. If the user is authenticated, then it will allow the user to access the protected routes. If the user is not authenticated, then it will return an error message.

const auth = (req,res,next) => {
    try{
        // extract jwt token 
        // Pending : Other ways to fetch token
        const token = req.body.token || req.cookies.token || req.headers("Authorization").replace("Bearer ","");

        if(!token || token == undefined || token == "")
        {
            return res.status(401).json({
                success : false,
                message : "Token missing",
            })
        }

        // verify token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(error)
        {
            return res.status(401).json({
                success : false,
                message : "Invalid token",
            })
        }
        next();
    }
    catch(error)
    {
        console.error(error);
        return res.status(401).json({
            success : false,
            message : "Something went wrong, while verifying token",
        })
    }
}

const isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student")
        {
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this route, This is a protected route for students",
            })
        }
        next();
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "User role is not matching",
        })
    }
}

const isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin")
        {
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this route, This is a protected route for students",
            })
        }
        next();
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "User role is not matching",
        })
    }
}

module.exports = {auth,isStudent,isAdmin};