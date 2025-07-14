import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Enter a valid e-mail')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be ≥ 6 chars')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords do not match')
    .required('Please confirm your password'),
});