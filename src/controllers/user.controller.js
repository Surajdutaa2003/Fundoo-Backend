import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import * as userService from '../services/user.service';
import { generateToken } from '../utils/user.util';

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        return res.status(200).json({
            code: httpStatus.OK,
            message: 'Users fetched successfully',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req);

        return res.status(201).json({
            code: httpStatus.CREATED,
            data: user,
            message: 'User created successfully'
        });
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { userWithoutPassword, token } = await userService.loginService(req);

        return res.status(200).json({
            code: httpStatus.OK,
            token,
            user: userWithoutPassword,
            message: 'Login successful'
        });
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = await userService.forgotPassword(email);

        return res.status(200).json({
            code: httpStatus.OK,
            otp, // OTP is returned in response
            message: 'OTP generated successfully'
        });
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const success = await userService.resetPassword(email, otp, newPassword);

        if (success) {
            return res.status(200).json({
                code: httpStatus.OK,
                message: 'Password reset successful'
            });
        } else {
            return res.status(400).json({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid OTP'
            });
        }
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};
