import { UserModel } from '../model/user.model.js'
import bcrypt from 'bcryptjs'

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

export const UpdateUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const { userName, password } = req.body;

        // Prepare the update object
        let updateData = { userName };

        // Only hash the password if it is provided
        if (password) {
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);
            updateData.password = hashPassword;
        }

        // Update the user
        const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userResponse = {
            _id: user._id,
            email: user.email,
            userName: user.userName
        };

        return res.status(200).json({ message: "User updated successfully", user: userResponse });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error during updating the user" });
    }
};
