import { User } from "../models/user.js"
// get all users
export const getUsers = async (req,res,next) => {
    try {
        // check if the users are registered or not
        const users = await User.find()
        if(users.length === 0) {
            return res.status(404).json({ message: 'No users found.' })
        }
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}
// get a single user by ( ID )
export const getUser = async (req,res,next) => {
    try {
        // check if the user is registered or not
        const user_id = req.params.id
        const user = await User.findById(user_id)
        if(!user){
            return res.status(404).json({ message: 'NO user found.' })
        }
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}


// update user 
export const updateUser = async (req,res,next) => {
    const user_id = req.params.id
    const data = req.body
    try {
        // check if the user is registered or not
        const update_user = await User.findByIdAndUpdate(user_id,data,{new: true})
        if(!update_user) {
            return res.status(404).json({ message: 'No users found' })
        }
        res.status(200).json({ message: 'user successfully updated.',updated_user:{update_user} })

    } catch (error) {
        next(error)
    }
}

// delete user
export const deleteUser = async (req,res,next) => {
    try {
        const user_id = req.params.id
        const delete_user = await User.findByIdAndDelete(user_id)
        if(!delete_user) {
            return res.status(404).json({ message: 'No users found' })
        }
        res.status(200).json({ message: `User ( ${delete_user?.email} ) successfully deleted.` })

    } catch (error) {
        next(error)
    }
}

// get current online user 
export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};