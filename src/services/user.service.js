import User from '../models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { generateToken } from '../utils/user.util';

dotenv.config();

exports.getUsers = async () => {
    try {
        return await User.find();
    } catch (err) {
        throw err;
    }
};

exports.registerUser = async (req) => {
    try {
        const { name, email, phone, password } = req.validatedBody;

        if (!name || !email || !password) {
            throw new Error('Invalid input');
        }

        if (await checkUserExist(email)) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        return user;
    } catch (err) {
        throw err;
    }
};

exports.loginService = async (req) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Invalid input');
        }

        const user = await checkUserExist(email);
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        const token = generateToken(user);

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { userWithoutPassword, token };
    } catch (err) {
        throw err;
    }
};

const checkUserExist = async (email) => {
    try {
        return await User.findOne({ email }).select('+password');
    } catch (err) {
        throw err;
    }
};

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw err;
    }
};

// Forgot Password Service
exports.forgotPassword = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Save OTP to user document
        user.otp = otp;
        await user.save();

        // Return OTP in response
        return otp;
    } catch (err) {
        throw err;
    }
};

// Reset Password Service
exports.resetPassword = async (email, otp, newPassword) => {
    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear OTP
        user.password = hashedPassword;
        user.otp = null;
        await user.save();

        return true;
    } catch (err) {
        throw err;
    }
};
