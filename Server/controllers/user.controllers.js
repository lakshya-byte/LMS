import { User } from '../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from '../middlewares/sendMail.js';
import TryCatch from '../middlewares/TryCatch.js';

export const register = TryCatch(async (req, res) => { //register user
    try {
        const { email, name, password } = req.body; // taking entries from user

        let user = await User.findOne({ email }); // finding the user from database

        if (user) { // if user already exists
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10); // encrypted password

        user = { // creating new user
            name,
            email,
            password: hashPassword,
        };

        const otp = Math.floor(Math.random() * 1000000); // creating otp

        const activationToken = jwt.sign({ // otp function
            user,
            otp,
        }, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });

        const data = {
            name, otp
        };
        await sendMail(
            email,
            "E Learning",
            data
        );

        res.status(200).json({
            message: "Otp sent to your mail successfully",
            activationToken
        });


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
);

export const verifyUser = TryCatch(async (req, res) => {//verifying user
    const { otp, activationToken } = req.body

    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET)

    if (!verify) return res.status(400).json({
        message: " Otp expired",

    })
    if (verify.otp !== otp) {
        return res.status(400).json({
            message: " Wrong Otp",

        })
    }
    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password,
    })

    res.json({
        message:" User created"
    })

})

export const loginUser = TryCatch(async(req,res) =>{//login user
    const { email, password}= req.body

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"no user with this email"
        })
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword) return res.status(400).json({
        message: "Wrong Password",
    })

    const token =await jwt.sign({_id : user._id}, process.env.jwt_Sec, {
        expiresIn:"15d"
    })
    res.json({
        message:`Welcome back ${user.name}`,
        token,
        user
    })
})

export const myProfile = TryCatch(async(req,res) =>{
    const user = await User.findById(req.user._id)
    res.json({
        user
    })
})