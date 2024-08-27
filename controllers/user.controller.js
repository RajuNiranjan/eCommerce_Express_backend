import { UserModel } from '../model/user.model.js'

export const getUser = async (req, res) => {
    try {
        const userId = req.user.user
        const user = await UserModel.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" })

        const userResponse = {
            _id: user._id,
            email: user.email,
            userName: user.userName
        }

        return res.status(200).json({ message: "User response", user: userResponse })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error during the user retrieval" })
    }
}