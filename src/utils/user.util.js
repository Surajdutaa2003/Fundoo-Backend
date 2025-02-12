import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // 👈 Ensure `.env` is loaded

export const generateToken = (user) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);  // 👈 Debugging ke liye

    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,  // 👈 Check yaha NULL to nahi
        { expiresIn: '1h' }
    );
};
