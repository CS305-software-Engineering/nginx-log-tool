import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { signupValidation, signinValidation } from './utils';
import {
    verifyToken,
    genAccessToken,
    genRefreshToken,
    sendRefreshToken,
} from './tokens';
import User from '../models/user.model';

const app = express.Router();

export interface jwtpayload {
    email: String;
}

/**
 * @route           POST /auth/signup
 * @description     register a user
 * @access          Public
 */
app.post('/signup', signupValidation, async (req: Request, res: Response) => {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty) {
            res.status(400).json({
                code: 400,
                errors: validationError.mapped(),
            });
        }
        if (req.body.email === undefined) {
            throw new Error('Not Unique Email ID!');
        }
        const instance = await User.findOne({ email: req.body.email });
        if (instance) {
            throw new Error('User already exists!');
        }
        const salt = await bcrypt.genSalt(6);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        res.send({
            error: false,
            message: `email:${req.body.email}'s info successfully added into db!!`,
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST /auth/signin
 * @description     signin a user
 * @access          Public
 */
app.post('/signin', signinValidation, async (req: Request, res: Response) => {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty) {
            res.status(400).json({
                code: 400,
                errors: validationError.mapped(),
            });
        }
        const instance = await User.findOne({
            email: req.body.email,
        });
        if (!instance) {
            throw new Error(`User doesn't exist`);
        }
        const checkPass = await bcrypt.compare(
            req.body.password,
            instance.password as string
        );
        if (!checkPass) {
            throw new Error('email or password is invalid');
        }
        const payload: jwtpayload = {
            email: instance.email,
        };
        // login successful
        // send access and refresh tokens
        sendRefreshToken(res, genRefreshToken(payload));
        res.send({
            email: instance.email,
            token: genAccessToken(payload),
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST /auth/signout
 * @description     Logout request: removes cookie
 * @access          Public
 */
app.post('/signout', verifyToken(), async (req: Request, res: Response) => {
    try {
        res.clearCookie('rid');
        res.send({ error: false, message: 'logged out!' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
