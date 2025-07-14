import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email('Enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be greater than 6 digits.')
        .required('Password is required'),
});