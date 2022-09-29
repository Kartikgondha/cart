import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Alert from "../../Component/Alert";

import { LogoutAction } from "../../redux/action/Action";

function Header(props) {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LogoutAction());
  };
  return (
    <header>
      <Alert />
      {/* Header desktop */}
      <div className="container-menu-desktop">
        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">
            {/* Logo desktop */}
            <a href="#" className="logo">
              <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
            </a>
            {/* Menu desktop */}
            <div className="menu-desktop">
              <ul className="main-menu">
                <li className="active-menu">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/shop"}>Shop</NavLink>
                </li>
                <li className="label1" data-label1="hot">
                  <NavLink to={"/features"}>Features</NavLink>
                </li>
                <li>
                  <NavLink to={"/blog"}>Blog</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>
              </ul>
            </div>

            {/* Icon header */}
            <div className="wrap-icon-header flex-w flex-r-m">
              <NavLink
                to={"/login"}
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search"
              >
                {/* <i className="zmdi zmdi-search" /> */}
                <i class="fa-solid fa-user kartik_size" />
              </NavLink>
              <NavLink
                to={"/features"}
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                data-notify={2}
              >
                <i className="zmdi zmdi-shopping-cart" />
              </NavLink>
              {/* <a
                href="#"
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                data-notify={0}
              >
                <i className="zmdi zmdi-favorite-outline" />
              </a> */}
                {user.user === null ? (
        <NavLink to={"/login"} className="appointment-btn scrollto">
          {" "}
          <span className="d-none d-md-inline">Login/ Signup</span>
        </NavLink>
      ) : (
        <NavLink
          to={"/login"}
          className="appointment-btn scrollto "
          onClick={() => handleLogout()}
        >
          {" "}
          <span className="d-none d-md-inline">Logout</span>
        </NavLink>
      )}
            </div>
          </nav>
        </div>
      </div>

  
    </header>
  );
}

export default Header;
