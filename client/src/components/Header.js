import React, { useState }from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import user from './images/user.png';
import { logoutUser } from "../actions/authActions";
import Alerter from './Alerter';

function Header() {
  const currentState = useSelector(state => state);
  const dispatch = useDispatch();
  const [loggedOut, logUserOut] = useState(false);
  console.log(currentState)

  const handleSignOut = () => {
    console.log('logout')
    logUserOut(true)
    dispatch(logoutUser())
    setTimeout(() => { logUserOut(false) }, 3000)
  }

  const setView = () => {
    if (currentState.auth.isAuthenticated) {
      return(
        <div onClick={handleSignOut}>
          <span>Howdy {currentState.auth.user.name}</span>
          <img src={ user } className="user-icon" alt="user icon" />
        </div>
      )
    } else {
      return <Link to="/login">login</Link>
    }
  }



  return (
    <div className="text-right pr-5 header">
      { setView() }

      <Alerter message="Logged out" danger="true" show={ loggedOut } />
    </div>
  )
}

export default Header;
