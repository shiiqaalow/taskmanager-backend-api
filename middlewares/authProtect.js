import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
export const authProtect = async (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1]
    console.log('TokenHeader > ',token)
    if(!token)
        return res.status(401).json({ message:'No token provided.' })

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log('Decode',decode)
        req.user = await User.findById(decode.userId).select('-password')
        console.log('user',req.user)
        next()
    } catch (error) {
        next(error)
    }

    // res.status(200).json({ message:'You can login now .', Your_Token:{ token } })
}
