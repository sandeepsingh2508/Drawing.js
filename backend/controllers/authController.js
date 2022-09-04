const jwt = require('jsonwebtoken');
const Users = require("../models/userModel");

exports.login = async (req, res, next) => {
    console.log("login")
    const { email, password } = req.body;
    const registerdUser = await Users.findOne({email});
    if( !registerdUser ){
        return res.status(404).json({
            status: "FAIL",
            requestedAt: req.requestTime,
            data: {"error": "Can't find any user for given email"}
        });
    }
    if(registerdUser.password != password){
        return res.status(402).json({
            status: "FAIL",
            requestedAt: req.requestTime,
            data: {"error": "Invalid Password"}
        });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
        status: "SUCCESS",
        requestedAt: req.requestTime,
        data: {token, user:registerdUser}
    });
}

exports.registerUser = async(req, res, next)=>{
    console.log("register")
    const {email, password } = req.body;
    const exisitingUser = await Users.findOne({email});

    if(exisitingUser){
        return res.status(404).json({
            status: "FAIL",
            requestedAt: req.requestTime,
            data: {"error": "Email already exist."}
        });
    }

    let newUser;
    try{
        newUser = await Users.create({email, password});
    }
    catch (error){
        return res.status(402).json({
            status: "FAIL",
            requestedAt: req.requestTime,
            data: {"error": "Password should be in range of 6 to 15 chars"}
        });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    res.status(200).json({
        status: "SUCCESS",
        requestedAt: req.requestTime,
        data: {token, user: newUser}
    });
}