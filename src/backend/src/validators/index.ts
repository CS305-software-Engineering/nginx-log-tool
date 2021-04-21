import { body } from 'express-validator';

export const signupValidation = [
    body('email')
        .exists()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('invalid email'),
    body('password')
        .exists()
        .withMessage('Empty Password')
        .isLength({ min: 6 })
        .withMessage('Password length must be more than 5'),
];

export const signinValidation = [
    body('email')
        .exists()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('invalid email'),
    body('password')
        .exists()
        .withMessage('Empty Password')
        .isLength({ min: 6 })
        .withMessage('Password length must be more than 5'),
];

export const staticMetricsValidation = [
    body('osStaticMetrics').exists().withMessage('osStaticMetrics is empty!'),
    body('nginxStaticMetrics')
        .exists()
        .withMessage('nginxStaticMetrics is empty!'),
];

export const updatePasswordValidation = [
    body('password').exists().withMessage('Password is empty'),
];
