const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async(req,res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email:email});

        if(!user){
            return res.json({
                success:false,
                message:"Your Email is not registered with us"
            });
        }

        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
                                                {email:email},
                                                {
                                                    token:token,
                                                    resetPasswordExpires : Date.now() + 5*60*1000,
                                                },
                                                {
                                                    new:true,
                                                });
        
        console.log("Details",updatedDetails);
        
        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(email,
                        "Password Reset",
                        `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        res.json({
            success:true,
            message:"email sent successfully, please check email and change and change pwd",
        });
    }
    catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:'Something went wrong while reset pwd mail', 
        })
    }

};


exports.resetPassword = async(req,res) => {

    try{
        const {password, confirmPassword,token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'password not matching',
            });
        }

        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.json({
                succees:false,
                message:'Token is invalid',
            });
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token is expired, please regenerate your token',
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:'Password reset successfully',
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail',
        })
    }

}


