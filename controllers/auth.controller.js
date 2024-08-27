import { UserModel } from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/getToken.js'

export const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        if (!email || !userName || !password) return res.status(401).json({ message: "Please fill all the fields" })

        const existingUser = await UserModel.findOne({ $or: [{ email }, { userName }] })

        if (existingUser) return res.status(400).json({ message: "email or user name already existed" })

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            userName,
            email,
            password: hashPassword
        })
        await newUser.save()
        const userResponse = {
            _id: newUser._id,
            email: newUser.email,
            userName: newUser.userName
        }

        const token = generateToken(newUser._id)

        return res.status(201).json({ message: "user registered successfully", user: userResponse, token: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during the register" })
    }
}

export const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: "Please fill all the fields" })

        const user = await UserModel.findOne({ email })
        if (!user) return res.status(404).json({ message: "Invalid email" })

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return res.status(404).json({ message: "Invalid credentials" })

        const userResponse = {
            _id: user._id,
            email: user.email,
            userName: user.userName
        }

        const token = generateToken(user._id)

        return res.status(200).json({ message: "user login successfully", user: userResponse, token: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during the login" })
    }
}