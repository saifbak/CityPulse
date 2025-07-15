import * as Yup from 'yup';

export const BiometricSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});