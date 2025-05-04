import { Request, Response } from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { Session } from 'express-session';

interface CustomSession extends Session {
    userId?: string;
    email?: string;
}

interface CustomRequest extends Request {
    session: CustomSession;
}

export const register = async (req: CustomRequest, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        // Set session
        req.session.userId = user._id.toString();
        req.session.email = user.email;

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error registering user',
                error: error.message
            });
        } else {
            res.status(500).json({ message: 'Error registering user' });
        }
    }
};

export const login = async (req: CustomRequest, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Set session
        req.session.userId = user._id.toString();
        req.session.email = user.email;

        // Save session before sending response
        req.session.save((err) => {
            if (err) {
                res.status(500).json({
                    message: 'Error logging in',
                    error: err.message
                });
                return;
            }

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error logging in',
                error: error.message
            });
        } else {
            res.status(500).json({ message: 'Error logging in' });
        }
    }
};

export const logout = async (req: CustomRequest, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({
                    message: 'Error logging out',
                    error: err.message
                });
                return;
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error logging out',
                error: error.message
            });
        } else {
            res.status(500).json({ message: 'Error logging out' });
        }
    }
};

export const checkAuth = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await User.findById(req.session.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error checking authentication',
                error: error.message
            });
        } else {
            res.status(500).json({ message: 'Error checking authentication' });
        }
    }
};