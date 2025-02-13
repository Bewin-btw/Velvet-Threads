import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config" 

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Logic for logining
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "invalid credentials"
            })
        }

        const passVerificated = await bcrypt.compare(password, user.password)
        if (passVerificated) {
            const token = createToken(user._id)
            return res.status(200).json({
                success: true,
                token: token
            })
        } else {
            return res.status(400).json({
                success: false,
                msg: "invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error.message })
    }
}

// Logic for registering
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.status(400).json({
                success: false,
                msg: "user already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                msg: "email is invalid"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.status(200).json({ success: true, token: token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error.message })
    }
}

// Logic for admin loging
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.status(200).json({success:true, token})
        } else {
            res.status(400).json({success:false, msg:"invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error.message })
    }
}

export { loginUser, registerUser, adminLogin }