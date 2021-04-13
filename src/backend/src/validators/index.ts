import { check } from 'express-validator';

export const signupValidation = [
    check('email')
        .exists()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('invalid email'),
    check('password')
        .exists()
        .withMessage('Empty Password')
        .isLength({ min: 6 })
        .withMessage('Password length must be more than 5'),
];

export const signinValidation = [
    check('email')
        .exists()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('invalid email'),
    check('password')
        .exists()
        .withMessage('Empty Password')
        .isLength({ min: 6 })
        .withMessage('Password length must be more than 5'),
];

export const staticMetricsValidation = [
    check('osStaticMetrics')
        .exists()
        .withMessage('osStaticMetrics is empty!'),
    check('nginxStaticMetrics')
        .exists()
        .withMessage('nginxStaticMetrics is empty!')
];
