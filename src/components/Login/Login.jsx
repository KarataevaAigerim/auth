import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { loginSchema } from '../../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import style from './Login.module.scss';
import lorby from '../../styles/svg/lorby.svg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success('Login successful!');
      navigate('/home');
    } catch (err) {
      toast.error('Login failed!');
      setSubmitting(false);
    }
  };

  return (
    <div className={style.login_page}>
      <div className={style.left}>
        <div>
            <img src={lorby} alt="lorby" />
        </div>
        <div>
            <h1>Lorby</h1>
            <p>Your personal tutor</p>
        </div>
      </div>
      <div className={style.right}> 
        <h2 className={style.text}>Welcome back!</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field 
                type="email"
                name="email" 
                placeholder='Enter your email'
                className={style.input}
                />
              </div>
              <div>
                <Field 
                type="password" 
                name="password" 
                placeholder='Enter your password'
                className={style.input}
                />
              </div>
              <div>
                <button 
                type="submit" 
                disabled={isSubmitting}
                className={style.login_btn}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      <div className={style.register_link}>
        <Link to="/register">I don't have an account</Link>
      </div>
      </div>
    </div>
  );
};

export default Login;