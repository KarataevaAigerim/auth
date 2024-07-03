import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const registrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(15, 'Password is too long - should be 15 chars maximum.')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter.')
    .matches(/[a-z]/, 'Password must contain a lowercase letter.')
    .matches(/[0-9]/, 'Password must contain a number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});