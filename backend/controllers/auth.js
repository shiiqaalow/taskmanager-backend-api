import { User } from "../models/user.js"
import { generateToken } from "../utils/generateToken.js"
// register new user
export const register = async (req,res,next) => {
    let { name,email,password,role } = req.body
    try {
        // return all email as small laters
        email = email.toLowerCase()
        // check if the email/user is registed already since the (email) is unique
        const existingUser = await User.findOne({email})
        // return this if the user is registed already.
        if(existingUser) 
            return res.status(400).json({ message: `this Email (${email}) is already registered` })
        // else register the user now
        const user = await User.create({ name,email,password,role })
        const token = generateToken(user._id)
        return res.status(201).json({message:'You have successfully registered your accout.', signup: token})
        
    } catch (error) {
        next(error)
    }
}

// login the user
export const login = async (req,res,next) => {
    let { email,password } = req.body
    try {
        // filter the email to return in small letters
        email.toLowerCase()
        // check if the user's data matches
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password)) )
            return res.status(401).json({ message:'Invalid credentials.' })
        const token = generateToken(user._id)
        res.status(200).json({message: 'You have successfully logged in',signin_token: token})
    } catch (error) {
        next(error)
    }
}

