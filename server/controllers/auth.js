
// import bcrypt
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// signup route handler
const signup = async (req,res) => {
    try{
        // get data
        const {name,email,password,role} = req.body;

        // check if user already exist
        const existingUser = await User.findOne({email});

        // if user exist, return error
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User with this email already exist"
            })
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10); // In this we pass the password and the salt value which is 10 which is the number of rounds to be performed on the password to generate the hash.
        }
        catch (error) {
            return res.status(500).json({
                success : false,
                message : "Something went wrong"
            })
        }

        // create entry for user in database
        const user = await User.create({
            name, email, password : hashedPassword,role 
        })

        return res.status(200).json({
            success : true,
            message : "User created successfully"
        })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "User cannot be registered, please try again later"
        })
    }
}

// login

const login = async (req,res) => {
    try{
        // data fetch
        const {email,password} = req.body;
        // validation on email and password
        if(!email || !password)
        {
            return res.status(400).json({
                success : false,
                message : "Please fill all the details carefully"
            })
        }

        // check for registered user
        let user = await User.findOne({email});
        // if not a registered user
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            })
        }

        // payload for jwt token
        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        } // Payload is the data which we want to store in the token. We can store the user id, user email, user role, user name, etc. We can store any data which we want to store in the token.
        // verify password and generate a JWT token
        if( await bcrypt.compare(password,user.password))
        {
            // password is matched
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "2h"}); // In this we pass the payload, the secret key and the options. In the options we pass the expiry time of the token which is 2 hours.

            user = user.toObject(); // This is done to convert the user object into a plain javascript object. This is done because we cannot add new properties to the user object. So we convert it into a plain javascript object and then add the new properties to it.

            user.token = token;
            user.password = undefined;
            // console.log(user);
            const options = {
                expires : new Date(Date.now() + 1000 * 60 * 60 * 2), // This is the expiry time of the cookie which is 2 hours.
                httpOnly : true, // This means that the cookie is not accessible by the client side javascript code. This is done for security purposes.

            } // These are the options for the cookie which we are sending to the user. We can set the expiry time of the cookie, the domain on which the cookie is valid, the path on which the cookie is valid, whether the cookie is secure or not, whether the cookie is http only or not, and whether the cookie is signed or not. We will be using the signed cookie.

            // set cookie
            // res.cookie() takes 3 arguments, name of the cookie, value of the cookie and an object which contains the options for the cookie.

            res.cookie("token",token,options).status(200).json({
                success : true,
                user,
                token,
                message : "User logged in successfully"
            });
        }
        else{
            // password not matched
            return res.status(403).json({
                success : false,
                message : "Password is incorrect"
            })
        }

    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Login failed, please try again later"
        })
    }
}

// export 
module.exports = {signup, login};