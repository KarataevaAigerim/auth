// import React from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.scss';
import lorby from '../../styles/svg/lorby.svg';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    console.log('User:', user); // Debugging line to check user object
  }, [user]);

  return (
    <div className={style.home_page}>
      <h1>Welcome Back, {user?.username}!</h1>
      <p>Lorby - your best friend </p>
      <img src={lorby} alt="lorby"  className={style.lorby}/>
      <button onClick={handleLogout} className={style.logout_btn}>Logout</button>
    </div>
  );
};

export default Home;