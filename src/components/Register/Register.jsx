import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { registrationSchema } from '../../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import lorby from '../../styles/svg/lorby.svg';
import style from './Register.module.scss';
import { ReactComponent as OpenEye } from '../../styles/svg/open-eye.svg';
import { ReactComponent as ShutEye } from '../../styles/svg/shut-eye.svg';

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
    <div className={style.register_page}>
      <div className={style.back_button}>
        <Link to="/login">Back</Link>
      </div>
      <div className={style.content}>
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
          <h2 className={style.text}>Create an account Lorby</h2>
          <Formik
              initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
              validationSchema={registrationSchema}
              onSubmit={handleSubmit}
          >
              {({ isSubmitting, values }) => (
              <Form>
                  <div>
                  <Field type="email" name="email" placeholder='Enter your email'  className={style.field}/>
                  <ErrorMessage name="email" component="div" className={style.error} />
                  </div>
                  <div>
                  <Field type="text" name="username" placeholder='Choose username' className={style.field}/>
                  <ErrorMessage name="username" component="div" className={style.error} />
                  </div>
                  <div>
                  <Field type={passwordVisible ? "text" : "password"} name="password" placeholder='Create a password' className={style.field}/>
                  <span onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? (
                        <ShutEye width="24" height="24" />
                      ) : (
                        <OpenEye width="24" height="24" />
                      )}
                    </span>
                  <ErrorMessage name="password" component="div" className={style.error}/>
                  </div>
                  <div>
                  
                  <Field type={passwordVisible ? "text" : "password"} name="confirmPassword" placeholder='Confirm your password' className={style.field}/>
                  <ErrorMessage name="confirmPassword" component="div" className={style.error}/>
                  </div>
                  <div>
                  <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? 'Hide' : 'Show'} Password
                  </button>
                  </div>
                  <div>
                  <button type="submit" disabled={isSubmitting} className={style.sbm_btn}>
                      Register
                  </button>
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
      </div>
    </div>
  );
};

export default Register;