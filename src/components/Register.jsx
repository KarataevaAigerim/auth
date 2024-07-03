import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { registrationSchema } from '../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success('Registration successful!');
      navigate('/home');
    } catch (err) {
      toast.error('Registration failed!');
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label>Password</label>
              <Field type={passwordVisible ? "text" : "password"} name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <label>Confirm Password</label>
              <Field type={passwordVisible ? "text" : "password"} name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <div>
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? 'Hide' : 'Show'} Password
              </button>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </div>
            <div>
              <Link to="/login">Go back to login</Link>
            </div>
            <div>
              {values.password && (
                <ul>
                  <li style={{ color: /[A-Z]/.test(values.password) ? 'green' : 'red' }}>
                    At least one uppercase letter
                  </li>
                  <li style={{ color: /[a-z]/.test(values.password) ? 'green' : 'red' }}>
                    At least one lowercase letter
                  </li>
                  <li style={{ color: /[0-9]/.test(values.password) ? 'green' : 'red' }}>
                    At least one number
                  </li>
                  <li style={{ color: /[!@#$%^&*(),.?":{}|<>]/.test(values.password) ? 'green' : 'red' }}>
                    At least one special character
                  </li>
                  <li style={{ color: values.password.length >= 8 && values.password.length <= 15 ? 'green' : 'red' }}>
                    8-15 characters long
                  </li>
                </ul>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;