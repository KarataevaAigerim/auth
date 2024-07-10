import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail, resendConfirmationCode } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <p>
        We have sent a confirmation letter to your email. Please check and confirm. If you haven't received it, please check your spam folder.
      </p>
      <form onSubmit={handleConfirmEmail}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter confirmation code"
          required
        />
        <button type="submit">Confirm Email</button>
      </form>
      <button onClick={handleResendEmail}>Resend Confirmation Email</button>
      {confirmationStatus === 'loading' && <p>Loading...</p>}
      {confirmationStatus === 'failed' && <p>Error: {confirmationError}</p>}
      {confirmationStatus === 'succeeded' && <p>Email confirmed successfully!</p>}
    </div>
  );
};

export default Confirm;