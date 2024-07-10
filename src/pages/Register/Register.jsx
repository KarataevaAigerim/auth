import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../features/auth/authSlice';
import { registrationSchema } from '../../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import lorby from '../../styles/svg/lorby.svg';
import style from './Register.module.scss';
import { ReactComponent as OpenEye } from '../../styles/svg/open-eye.svg';
import { ReactComponent as ShutEye } from '../../styles/svg/shut-eye.svg';
import { ReactComponent as ArrowIcon } from '../../styles/svg/arrow.svg';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (error) {
        dispatch(clearError());
      }
      await dispatch(register(values)).unwrap();
      toast.success('Registration successful! Please check your email to confirm your account.');
      navigate('/confirm'); // Navigate to the confirm page
    } catch (err) {
      toast.error('Registration failed! ' + (err.message || 'Please try again.'));
      setSubmitting(false);
    }
  };

  return (
    <div className={style.register_page}>
      <div className={style.back_button}>
        <Link to="/login">
          <ArrowIcon width="16" height="16" /> Back
        </Link>
      </div>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.register_img}>
            <img src={lorby} alt="lorby" />
          </div>
          <div className={style.heading}>
            <h1>Lorby</h1>
            <p>Your personal tutor</p>
          </div>
        </div>
        <div className={style.right}>
          <h2 className={style.text}>Create an account Lorby</h2>
          <Formik
            initialValues={{ email: '', username: '', password: '', password_confirm: '' }}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, errors, touched, values }) => (
              <Form className={style.register_form}>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`${style.field} ${touched.email && errors.email ? style.error : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className={style.error_message} />
                </div>
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Choose username"
                    className={`${style.field} ${touched.username && errors.username ? style.error : ''}`}
                  />
                  <ErrorMessage name="username" component="div" className={style.error_message} />
                </div>
                <div className={style.passwordField}>
                  <div className={style.passwordInput}>
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      className={`${style.field} ${touched.password && errors.password ? style.error : ''}`}
                    />
                    <span onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? (
                        <ShutEye width="24" height="24" />
                      ) : (
                        <OpenEye width="24" height="24" />
                      )}
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className={style.error_message} />
                </div>
                <div className={style.password_errors}>
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
                <div className={style.passwordField}>
                  <div className={style.passwordInput}>
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      name="password_confirm"
                      placeholder="Confirm your password"
                      className={`${style.field} ${touched.confirmPassword && errors.confirmPassword ? style.error : ''}`}
                    />
                    <span onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? (
                        <ShutEye width="24" height="24" />
                      ) : (
                        <OpenEye width="24" height="24" />
                      )}
                    </span>
                  </div>
                  <ErrorMessage name="password_confirm" component="div" className={style.error_message} />
                </div>
                <div>
                  <button type="submit" disabled={!isValid || isSubmitting} className={style.sbm_btn}>
                    Register
                  </button>
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