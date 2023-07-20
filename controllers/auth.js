import User from "../models/Users.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import _ from "lodash";

export const register = async (req , res , next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser = new User({
            username : _.capitalize(req.body.username),
            email : req.body.email,
            password : hash,
        })

        const savedUser = await newUser.save();
        const {isAdmin, password , ...otherDetails} = savedUser._doc
        res.status(200).json({...otherDetails});
    } catch(err) {
        next(err);
    }
}

export const login = async (req , res , next) => {
    const username = _.capitalize(req.body.username)
    try{
        const user = await User.findOne({username : username});
        if(!user) return next(createError(404 , "User not found"));

        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password)
        if(!isCorrectPassword) return next(createError(401 , "Username or password is incorrect"));

        const token = jwt.sign({id : user._id , isAdmin:user.isAdmin} , process.env.JWT);

        const {password , isAdmin , ...otherDetails} = user._doc;

        res.cookie("access_token" , token , {
            httpOnly : true
        }).status(200).json({...otherDetails});
    } catch(err) {
        next(err)
    }
}