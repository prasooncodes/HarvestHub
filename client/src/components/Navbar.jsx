import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { MdExitToApp } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import '../util/config';
import url from '../url';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const { t } = useTranslation();

  const Logout = () => {
    removeCookie("token");
    removeCookie("language");
    window.config.resetId();
    window.config.resetName();
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('language');
    Cookies.remove('username');
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#c9d4f8" }}>
      <nav className="navbar navbar-expand-lg" style={{
        marginTop: 10, marginLeft: 10, marginRight: 10,
        zIndex: 1,
        backgroundColor: '#d5eeff',
        boxShadow: "0 5px 4px rgba(0, 0, 0, 0.1)"
      }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/Landing">
            {t('Title')}
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                {t('NHome')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/update">
                {t('NUpdate')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forum">
                {t('NForum')}
                </a>
              </li>
            </ul>
            {}
            <button onClick={Logout} className="btn btn-outline-transparent">
              <MdExitToApp /> {t('NLogout')}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
