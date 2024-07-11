import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail, resendConfirmationCode } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import style from './Confirm.module.scss';
import lorby from '../../styles/svg/lorby.svg';
import { ReactComponent as ArrowIcon } from '../../styles/svg/arrow.svg';

const Confirm = () => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmationStatus, confirmationError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (confirmationStatus === 'succeeded') {
      navigate('/login'); // Navigate to login page after successful confirmation
    }
  }, [confirmationStatus, navigate]);

  const handleConfirmEmail = (e) => {
    e.preventDefault();
    dispatch(confirmEmail(code));
  };

  const handleResendEmail = () => {
    dispatch(resendConfirmationCode());
  };

  return (
    <div className={style.confirm_page}>
        <div className={style.back_button}>
            <Link to="/register">
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
                <div className={style.section}>
                    <p className={style.confirmEmail}>
                        We have sent a confirmation letter with a code to your email. Please check and enter the code down bellow.
                    </p>
                    <p className={style.confirmError}> If you haven't received it, do not panic - please check your <strong>spam folder</strong>.</p>
                    <p className={style.emoji}>(´｡• ω •｡`)</p>
                    <form onSubmit={handleConfirmEmail}>
                        <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter confirmation code"
                        required />
                        <button type="submit">Confirm Email</button>
                    </form>
                    <div>
                        <button onClick={handleResendEmail}>I didn't get the email</button>
                    </div>
                    
                    {confirmationStatus === 'loading' && <p>Loading...</p>}
                    {confirmationStatus === 'failed' && <p>Error: {confirmationError}</p>}
                    {confirmationStatus === 'succeeded' && <p>Email confirmed successfully!</p>}
                </div>
            </div>
                
      </div>
    </div>
  );
};

export default Confirm;