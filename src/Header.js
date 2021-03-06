import React from 'react'
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Avatar, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });

  };


  return (
    <div className='header'>
      <div className='header-left'>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img src='https://i.pinimg.com/originals/ae/47/fa/ae47fa9a8fd263aa364018517020552d.png' alt='' />
      </div>
      <div className='header-middle'>
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDownIcon className='header-inputCaret' />
      </div>
      <div className='header-right'>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <Avatar onClick={signOut} src={user?.photoURL} />
      </div>
    </div>
  )
}

export default Header
